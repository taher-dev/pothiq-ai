// ============================================
// Pothiq AI — Navigation Setup
// ============================================

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppStore, useAdminStore } from '../store';
import { COLORS, ENGLISH_LABELS, BENGALI_LABELS } from '../constants';
import { useThemeColors } from '../components';

// Screens
import HomeScreen from '../screens/HomeScreen';
import RouteDetailScreen from '../screens/RouteDetailScreen';
import RoutesBrowserScreen, { BusRoutesScreen, StopRoutesScreen } from '../screens/RoutesBrowserScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import { ManageRoutesScreen, ManageBusesScreen, ManageStopsScreen } from '../screens/ManageScreens';
import { RouteFormScreen, BusFormScreen, StopFormScreen } from '../screens/FormScreens';
import { BulkImportScreen, BackupRestoreScreen, ChangePinScreen } from '../screens/AdminUtilScreens';

import type { RootTabParamList, HomeStackParamList, RoutesStackParamList, SettingsStackParamList } from '../types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const RoutesStack = createNativeStackNavigator<RoutesStackParamList>();
const SettingsStackNav = createNativeStackNavigator<SettingsStackParamList>();

// ==================== HOME STACK ====================

function HomeStackNavigator() {
  const colors = useThemeColors();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="RouteDetail"
        component={RouteDetailScreen}
        options={{
          headerShown: true,
          title: 'Route Details',
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
    </HomeStack.Navigator>
  );
}

// ==================== ROUTES STACK ====================

function RoutesStackNavigator() {
  const colors = useThemeColors();
  return (
    <RoutesStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <RoutesStack.Screen name="RoutesBrowser" component={RoutesBrowserScreen} />
      <RoutesStack.Screen
        name="RouteDetail"
        component={RouteDetailScreen}
        options={{
          headerShown: true,
          title: 'Route Details',
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
      <RoutesStack.Screen
        name="BusRoutes"
        component={BusRoutesScreen}
        options={{
          headerShown: true,
          title: 'Bus Routes',
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
      <RoutesStack.Screen
        name="StopRoutes"
        component={StopRoutesScreen}
        options={{
          headerShown: true,
          title: 'Stop Routes',
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
    </RoutesStack.Navigator>
  );
}

// ==================== SETTINGS STACK ====================

function SettingsStackNavigator() {
  const colors = useThemeColors();
  const isAuthenticated = useAdminStore(s => s.isAuthenticated);
  const defaultScreenOpts = {
    headerStyle: { backgroundColor: COLORS.primary },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: '700' as const },
  };

  return (
    <SettingsStackNav.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <SettingsStackNav.Screen name="SettingsMain" component={SettingsScreen} />
      <SettingsStackNav.Screen
        name="AdminLogin"
        component={AdminLoginScreen}
        options={{ headerShown: true, title: 'Admin Login', ...defaultScreenOpts }}
      />
      {isAuthenticated && (
        <>
          <SettingsStackNav.Screen
            name="AdminDashboard"
            component={AdminDashboardScreen}
            options={{ headerShown: false }}
          />
          <SettingsStackNav.Screen
            name="ManageRoutes"
            component={ManageRoutesScreen}
            options={{ headerShown: true, title: 'Manage Routes', ...defaultScreenOpts }}
          />
          <SettingsStackNav.Screen
            name="ManageBuses"
            component={ManageBusesScreen}
            options={{ headerShown: true, title: 'Manage Buses', ...defaultScreenOpts }}
          />
          <SettingsStackNav.Screen
            name="ManageStops"
            component={ManageStopsScreen}
            options={{ headerShown: true, title: 'Manage Stops', ...defaultScreenOpts }}
          />
          <SettingsStackNav.Screen
            name="RouteForm"
            component={RouteFormScreen}
            options={{ headerShown: true, title: 'Route Form', ...defaultScreenOpts }}
          />
          <SettingsStackNav.Screen
            name="BusForm"
            component={BusFormScreen}
            options={{ headerShown: true, title: 'Bus Form', ...defaultScreenOpts }}
          />
          <SettingsStackNav.Screen
            name="StopForm"
            component={StopFormScreen}
            options={{ headerShown: true, title: 'Stop Form', ...defaultScreenOpts }}
          />
          <SettingsStackNav.Screen
            name="BulkImport"
            component={BulkImportScreen}
            options={{ headerShown: true, title: 'Bulk Import', ...defaultScreenOpts }}
          />
          <SettingsStackNav.Screen
            name="BackupRestore"
            component={BackupRestoreScreen}
            options={{ headerShown: true, title: 'Backup & Restore', ...defaultScreenOpts }}
          />
          <SettingsStackNav.Screen
            name="ChangePin"
            component={ChangePinScreen}
            options={{ headerShown: true, title: 'Change PIN', ...defaultScreenOpts }}
          />
        </>
      )}
    </SettingsStackNav.Navigator>
  );
}

// ==================== ROOT TABS ====================

export default function AppNavigator() {
  const lang = useAppStore(s => s.language);
  const colors = useThemeColors();
  const labels = lang === 'bn' ? BENGALI_LABELS : ENGLISH_LABELS;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.divider,
            paddingBottom: 6,
            paddingTop: 6,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{
            tabBarLabel: labels.home,
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="🏠" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="RoutesTab"
          component={RoutesStackNavigator}
          options={{
            tabBarLabel: labels.routes,
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="🗺️" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsTab"
          component={SettingsStackNavigator}
          options={{
            tabBarLabel: labels.settings,
            tabBarIcon: ({ focused }) => (
              <TabIcon emoji="⚙️" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Use React Native Text for TabIcon
import { Text as RNText } from 'react-native';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <RNText style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.6 }}>{emoji}</RNText>
  );
}
