// ============================================
// Pothiq AI — SOS Emergency Screen
// ============================================

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
  Linking,
  Platform,
} from 'react-native';
import { Text, Card, IconButton, Button, Avatar, Surface, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import { COLORS } from '../constants';
import { useThemeColors } from '../components';

const CONTACTS_KEY = '@pothiq_emergency_contacts';

export default function SOSScreen() {
  const colors = useThemeColors();
  const [contacts, setContacts] = useState<string[]>([]);
  const [newContact, setNewContact] = useState('');
  const [isCountdown, setIsCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [loading, setLoading] = useState(false);

  // 1. Load contacts on mount
  useEffect(() => {
    loadContacts();
  }, []);

  // 2. Countdown logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountdown && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isCountdown && countdown === 0) {
      setIsCountdown(false);
      triggerSOS();
    }
    return () => clearInterval(timer);
  }, [isCountdown, countdown]);

  const loadContacts = async () => {
    try {
      const saved = await AsyncStorage.getItem(CONTACTS_KEY);
      if (saved) setContacts(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to load contacts', e);
    }
  };

  const saveContacts = async (newContacts: string[]) => {
    try {
      await AsyncStorage.setItem(CONTACTS_KEY, JSON.stringify(newContacts));
    } catch (e) {
      console.error('Failed to save contacts', e);
    }
  };

  const addContact = () => {
    const trimmed = newContact.trim();
    if (!trimmed) return;
    if (contacts.includes(trimmed)) {
      Alert.alert('Duplicate', 'This contact is already added.');
      return;
    }
    const updated = [...contacts, trimmed];
    setContacts(updated);
    saveContacts(updated);
    setNewContact('');
  };

  const removeContact = (phone: string) => {
    const updated = contacts.filter((c) => c !== phone);
    setContacts(updated);
    saveContacts(updated);
  };

  // 3. Main SOS Execution
  const triggerSOS = async () => {
    if (contacts.length === 0) {
      Alert.alert('No Contacts', 'Please add at least one emergency contact first.');
      return;
    }

    setLoading(true);
    try {
      // 3.1 Get Location Permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to send SOS with your location.');
        setLoading(false);
        return;
      }

      // 3.2 Get Current Location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
      const message = `🚨 SOS! I need help. My location: ${mapsUrl}`;

      // 3.3 Check SMS Availablity
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync(contacts, message);
        
        // 3.4 Optional: Call the first contact
        if (contacts.length > 0) {
           setTimeout(() => {
             Linking.openURL(`tel:${contacts[0]}`);
           }, 2000);
        }
      } else {
        Alert.alert('SMS Error', 'SMS is not available on this device.');
      }
    } catch (error) {
       console.error(error);
       Alert.alert('SOS Error', 'Failed to trigger SOS. Please try again.');
    } finally {
      setLoading(false);
      setCountdown(5); // Reset countdown for next time
    }
  };

  const handleSOSPress = () => {
    if (contacts.length === 0) {
      Alert.alert('No Contacts', 'Add emergency contacts before using SOS.');
      return;
    }
    setIsCountdown(true);
    setCountdown(5);
  };

  const cancelSOS = () => {
    setIsCountdown(false);
    setCountdown(5);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <Surface style={[styles.hero, { backgroundColor: COLORS.primary }]} elevation={4}>
         <Text style={styles.heroTitle}>Emergency Assistance</Text>
         <Text style={styles.heroSub}>Notify contacts with your GPS location</Text>
      </Surface>

      {/* SOS Button Area */}
      <View style={styles.sosContainer}>
        {isCountdown ? (
          <View style={styles.countdownBox}>
            <Text style={styles.countdownTitle}>TRIGGERING IN</Text>
            <Text style={styles.countdownNumber}>{countdown}</Text>
            <Button 
                mode="contained" 
                onPress={cancelSOS} 
                style={styles.cancelBtn}
                buttonColor="#555"
            >
              CANCEL
            </Button>
          </View>
        ) : (
          <TouchableOpacity 
            style={[styles.sosButton, { shadowColor: COLORS.error }]} 
            onPress={handleSOSPress}
            activeOpacity={0.7}
            disabled={loading}
          >
            <Surface style={[styles.sosCircle, { backgroundColor: COLORS.error }]} elevation={5}>
              <Text style={styles.sosText}>{loading ? '...' : 'SOS'}</Text>
            </Surface>
          </TouchableOpacity>
        )}
      </View>

      {/* Contacts Management */}
      <Card style={[styles.card, { backgroundColor: colors.card }]} mode="elevated">
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Emergency Contacts</Text>
          <Text style={[styles.hint, { color: colors.textSecondary }]}>Add phone numbers to notify via SMS</Text>
          
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.divider }]}
              placeholder="Enter phone number"
              placeholderTextColor="#888"
              value={newContact}
              onChangeText={setNewContact}
              keyboardType="phone-pad"
            />
            <IconButton 
                icon="plus" 
                mode="contained" 
                containerColor={COLORS.primary} 
                iconColor="#fff"
                onPress={addContact} 
            />
          </View>

          <Divider style={{ marginVertical: 15, backgroundColor: colors.divider }} />

          {contacts.length === 0 ? (
            <Text style={styles.emptyText}>No emergency contacts added yet.</Text>
          ) : (
            contacts.map((contact, index) => (
              <View key={index} style={styles.contactRow}>
                <View style={styles.contactInfo}>
                  <Avatar.Icon size={34} icon="phone" style={{ backgroundColor: COLORS.success }} />
                  <Text style={[styles.contactNumber, { color: colors.text }]}>{contact}</Text>
                </View>
                <IconButton 
                    icon="delete-outline" 
                    iconColor={COLORS.error} 
                    onPress={() => removeContact(contact)} 
                />
              </View>
            ))
          )}
        </Card.Content>
      </Card>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: {
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
  },
  heroSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  sosContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  sosButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    elevation: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  sosCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  sosText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 2,
  },
  countdownBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
  },
  countdownTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.error,
    letterSpacing: 2,
  },
  countdownNumber: {
    fontSize: 72,
    fontWeight: '900',
    color: COLORS.error,
    marginVertical: 5,
  },
  cancelBtn: {
    marginTop: 10,
    borderRadius: 10,
  },
  card: {
    margin: 16,
    borderRadius: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  hint: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#888',
    fontStyle: 'italic',
  },
});
