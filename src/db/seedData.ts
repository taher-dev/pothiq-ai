// ============================================
// Pothiq AI — Seed Data for Dhaka Bus Routes
// ============================================

import type { Stop, Bus, Route } from '../types';

export const SEED_STOPS: Omit<Stop, 'id' | 'created_at'>[] = [
  { name_en: 'Mirpur-1', name_bn: 'মিরপুর-১', area: 'Mirpur', lat: 23.8042, lng: 90.3656 },
  { name_en: 'Mirpur-10', name_bn: 'মিরপুর-১০', area: 'Mirpur', lat: 23.8069, lng: 90.3687 },
  { name_en: 'Mirpur-12', name_bn: 'মিরপুর-১২', area: 'Mirpur', lat: 23.8223, lng: 90.3654 },
  { name_en: 'Kalshi', name_bn: 'কালশী', area: 'Mirpur', lat: 23.8283, lng: 90.3704 },
  { name_en: 'Kafrul', name_bn: 'কাফরুল', area: 'Mirpur', lat: 23.7948, lng: 90.3830 },
  { name_en: 'Farmgate', name_bn: 'ফার্মগেট', area: 'Dhaka Central', lat: 23.7573, lng: 90.3880 },
  { name_en: 'Shahbagh', name_bn: 'শাহবাগ', area: 'Dhaka Central', lat: 23.7381, lng: 90.3957 },
  { name_en: 'Karwan Bazar', name_bn: 'কারওয়ান বাজার', area: 'Dhaka Central', lat: 23.7512, lng: 90.3931 },
  { name_en: 'Motijheel', name_bn: 'মতিঝিল', area: 'Old Dhaka', lat: 23.7289, lng: 90.4194 },
  { name_en: 'Gulistan', name_bn: 'গুলিস্তান', area: 'Old Dhaka', lat: 23.7252, lng: 90.4135 },
  { name_en: 'Sadarghat', name_bn: 'সদরঘাট', area: 'Old Dhaka', lat: 23.7085, lng: 90.4074 },
  { name_en: 'Dhanmondi-27', name_bn: 'ধানমন্ডি-২৭', area: 'Dhanmondi', lat: 23.7479, lng: 90.3732 },
  { name_en: 'Jigatola', name_bn: 'জিগাতলা', area: 'Dhanmondi', lat: 23.7393, lng: 90.3706 },
  { name_en: 'Azimpur', name_bn: 'আজিমপুর', area: 'Dhaka Central', lat: 23.7285, lng: 90.3844 },
  { name_en: 'New Market', name_bn: 'নিউ মার্কেট', area: 'Dhaka Central', lat: 23.7335, lng: 90.3854 },
  { name_en: 'Science Lab', name_bn: 'সায়েন্স ল্যাব', area: 'Dhaka Central', lat: 23.7394, lng: 90.3830 },
  { name_en: 'Elephant Road', name_bn: 'এলিফ্যান্ট রোড', area: 'Dhaka Central', lat: 23.7371, lng: 90.3877 },
  { name_en: 'Bangla Motor', name_bn: 'বাংলা মোটর', area: 'Dhaka Central', lat: 23.7471, lng: 90.3935 },
  { name_en: 'Paltan', name_bn: 'পল্টন', area: 'Old Dhaka', lat: 23.7348, lng: 90.4131 },
  { name_en: 'Arambagh', name_bn: 'আরামবাগ', area: 'Old Dhaka', lat: 23.7308, lng: 90.4093 },
  { name_en: 'Mohakhali', name_bn: 'মহাখালী', area: 'Gulshan', lat: 23.7781, lng: 90.4054 },
  { name_en: 'Banani', name_bn: 'বনানী', area: 'Gulshan', lat: 23.7938, lng: 90.4024 },
  { name_en: 'Uttara', name_bn: 'উত্তরা', area: 'Uttara', lat: 23.8759, lng: 90.3795 },
  { name_en: 'Airport', name_bn: 'বিমানবন্দর', area: 'Uttara', lat: 23.8513, lng: 90.4068 },
  { name_en: 'Tongi', name_bn: 'টঙ্গী', area: 'Gazipur', lat: 23.9322, lng: 90.4014 },
  { name_en: 'Gazipur', name_bn: 'গাজীপুর', area: 'Gazipur', lat: 24.0023, lng: 90.4208 },
  { name_en: 'Gulshan-1', name_bn: 'গুলশান-১', area: 'Gulshan', lat: 23.7813, lng: 90.4171 },
  { name_en: 'Gulshan-2', name_bn: 'গুলশান-২', area: 'Gulshan', lat: 23.7947, lng: 90.4147 },
  { name_en: 'Rampura', name_bn: 'রামপুরা', area: 'Rampura', lat: 23.7640, lng: 90.4256 },
  { name_en: 'Badda', name_bn: 'বাড্ডা', area: 'Badda', lat: 23.7806, lng: 90.4265 },
  { name_en: 'Abdullahpur', name_bn: 'আব্দুল্লাহপুর', area: 'Uttara', lat: 23.8680, lng: 90.3960 },
  { name_en: 'Cantonment', name_bn: 'ক্যান্টনমেন্ট', area: 'Cantonment', lat: 23.8115, lng: 90.4010 },
  { name_en: 'Tejgaon', name_bn: 'তেজগাঁও', area: 'Dhaka Central', lat: 23.7627, lng: 90.3989 },
  { name_en: 'Shantinagar', name_bn: 'শান্তিনগর', area: 'Old Dhaka', lat: 23.7385, lng: 90.4119 },
  { name_en: 'Jatrabari', name_bn: 'যাত্রাবাড়ী', area: 'South Dhaka', lat: 23.7104, lng: 90.4332 },
  { name_en: 'Sayedabad', name_bn: 'সায়েদাবাদ', area: 'South Dhaka', lat: 23.7144, lng: 90.4268 },
  { name_en: 'Dhanmondi-32', name_bn: 'ধানমন্ডি-৩২', area: 'Dhanmondi', lat: 23.7500, lng: 90.3715 },
  { name_en: 'Nilkhet', name_bn: 'নীলক্ষেত', area: 'Dhaka Central', lat: 23.7327, lng: 90.3880 },
  { name_en: 'Mohammadpur', name_bn: 'মোহাম্মদপুর', area: 'Mohammadpur', lat: 23.7664, lng: 90.3589 },
  { name_en: 'Shyamoli', name_bn: 'শ্যামলী', area: 'Mohammadpur', lat: 23.7747, lng: 90.3641 },
  { name_en: 'Technical Mor', name_bn: 'টেকনিক্যাল মোড়', area: 'Mirpur', lat: 23.7842, lng: 90.3729 },
  { name_en: 'Agargaon', name_bn: 'আগারগাঁও', area: 'Dhaka Central', lat: 23.7783, lng: 90.3789 },
  { name_en: 'Bijoy Sarani', name_bn: 'বিজয় সরণি', area: 'Dhaka Central', lat: 23.7663, lng: 90.3893 },
  { name_en: 'Khilgaon', name_bn: 'খিলগাঁও', area: 'East Dhaka', lat: 23.7450, lng: 90.4300 },
  { name_en: 'Malibagh', name_bn: 'মালিবাগ', area: 'East Dhaka', lat: 23.7490, lng: 90.4170 },
  { name_en: 'Postogola', name_bn: 'পোস্তগোলা', area: 'South Dhaka', lat: 23.6875, lng: 90.4347 },
  { name_en: 'Signboard', name_bn: 'সাইনবোর্ড', area: 'Narayanganj', lat: 23.6931, lng: 90.4851 },
  { name_en: 'Shanir Akhra', name_bn: 'শনির আখড়া', area: 'South Dhaka', lat: 23.7012, lng: 90.4503 },
  { name_en: 'Rayerbag', name_bn: 'রায়েরবাগ', area: 'South Dhaka', lat: 23.6975, lng: 90.4612 },
  { name_en: 'Kanchpur', name_bn: 'কাঁচপুর', area: 'Narayanganj', lat: 23.6997, lng: 90.5259 },
  { name_en: 'Bishwa Road', name_bn: 'বিশ্বরোড', area: 'Kuril', lat: 23.8182, lng: 90.4194 },
  { name_en: 'Bashundhara', name_bn: 'বসুন্ধরা', area: 'Bashundhara', lat: 23.8124, lng: 90.4230 },
  { name_en: 'Nadda', name_bn: 'নদ্দা', area: 'Gulshan', lat: 23.8055, lng: 90.4231 },
  { name_en: 'Kuril', name_bn: 'কুড়িল', area: 'Kuril', lat: 23.8188, lng: 90.4144 },
  { name_en: 'Gabtoli', name_bn: 'গাবতলী', area: 'Gabtoli', lat: 23.7844, lng: 90.3344 },
  { name_en: 'Dholairpar', name_bn: 'ধলাইড়পাড়', area: 'South Dhaka', lat: 23.6922, lng: 90.4322 },
  { name_en: 'Janapoth Moor', name_bn: 'জনপথ মোড়', area: 'South Dhaka', lat: 23.7052, lng: 90.4367 },
  { name_en: 'Mugda', name_bn: 'মুগদা', area: 'East Dhaka', lat: 23.7255, lng: 90.4389 },
  { name_en: 'Bashabo', name_bn: 'বাসাবো', area: 'East Dhaka', lat: 23.7371, lng: 90.4355 },
  { name_en: 'Malibagh Railgate', name_bn: 'মালিবাগ রেলগেট', area: 'East Dhaka', lat: 23.7511, lng: 90.4199 },
  { name_en: 'Rampura Bazar', name_bn: 'রামপুরা বাজার', area: 'Rampura', lat: 23.7612, lng: 90.4212 },
  { name_en: 'Rampura Bridge', name_bn: 'রামপুরা ব্রিজ', area: 'Rampura', lat: 23.7688, lng: 90.4255 },
  { name_en: 'Merul Badda', name_bn: 'মেরুল বাড্ডা', area: 'Badda', lat: 23.7755, lng: 90.4266 },
  { name_en: 'Uttar Badda', name_bn: 'উত্তর বাড্ডা', area: 'Badda', lat: 23.7852, lng: 90.4288 },
  { name_en: 'Bashtola', name_bn: 'বাঁশতলা', area: 'Badda', lat: 23.7911, lng: 90.4255 },
  { name_en: 'Jamuna Future Park', name_bn: 'যমুনা ফিউচার পার্ক', area: 'Kuril', lat: 23.8133, lng: 90.4233 },
  { name_en: 'Kuril Chourasta', name_bn: 'কুড়িল চৌরাস্তা', area: 'Kuril', lat: 23.8155, lng: 90.4188 },
  { name_en: 'Khilkhet', name_bn: 'খিলক্ষেত', area: 'Uttara', lat: 23.8299, lng: 90.4177 },
  { name_en: 'Jashimuddin', name_bn: 'জসিমউদ্দিন', area: 'Uttara', lat: 23.8611, lng: 90.4011 },
  { name_en: 'Rajlakshmi', name_bn: 'রাজলক্ষ্মী', area: 'Uttara', lat: 23.8655, lng: 90.3988 },
  { name_en: 'Azampur', name_bn: 'আজম্পুর', area: 'Uttara', lat: 23.8711, lng: 90.3944 },
  { name_en: 'House Building', name_bn: 'হাউজ বিল্ডিং', area: 'Uttara', lat: 23.8755, lng: 90.3888 },
  { name_en: 'Dia Bari', name_bn: 'দিয়া বাড়ি', area: 'Uttara', lat: 23.8822, lng: 90.3655 },
  { name_en: 'Notun Bazar', name_bn: 'নতুন বাজার', area: 'Badda', lat: 23.7977, lng: 90.4233 },
  { name_en: 'Malibaag Moor', name_bn: 'মালিবাগ মোড়', area: 'East Dhaka', lat: 23.7480, lng: 90.4130 },
  { name_en: 'Manik Nagar', name_bn: 'মানিক নগর', area: 'South Dhaka', lat: 23.7177, lng: 90.4322 },
  { name_en: 'TT Para', name_bn: 'টিটি পাড়া', area: 'South Dhaka', lat: 23.7255, lng: 90.4288 },
  { name_en: 'Kamalapur', name_bn: 'কমলাপুর', area: 'South Dhaka', lat: 23.7333, lng: 90.4255 },
  { name_en: 'Mouchak', name_bn: 'মৌচাক', area: 'Dhaka Central', lat: 23.7455, lng: 90.4088 },
  { name_en: 'Mogbazar', name_bn: 'মগবাজার', area: 'Dhaka Central', lat: 23.7488, lng: 90.4033 },
  { name_en: 'Sat rasta', name_bn: 'সাত রাস্তা', area: 'Tejgaon', lat: 23.7588, lng: 90.3988 },
  { name_en: 'Nabisco', name_bn: 'নাবিস্কো', area: 'Tejgaon', lat: 23.7655, lng: 90.4012 },
  { name_en: 'Chairman Bari', name_bn: 'চেয়ারম্যান বাড়ী', area: 'Banani', lat: 23.7888, lng: 90.4022 },
  { name_en: 'Kakali', name_bn: 'কাকলী', area: 'Banani', lat: 23.7911, lng: 90.4033 },
  { name_en: 'Staff Road', name_bn: 'স্টাফ রোড', area: 'Cantonment', lat: 23.8055, lng: 90.4088 },
  { name_en: 'MES', name_bn: 'এমইএস', area: 'Cantonment', lat: 23.8155, lng: 90.4044 },
  { name_en: 'Shewra', name_bn: 'শেওড়া', area: 'Kuril', lat: 23.8211, lng: 90.4111 },
  { name_en: 'Station Road', name_bn: 'স্টেশন রোড', area: 'Tongi', lat: 23.9011, lng: 90.4055 },
  { name_en: 'Mill Gate', name_bn: 'মিল গেট', area: 'Tongi', lat: 23.9122, lng: 90.4088 },
  { name_en: 'Board Bazar', name_bn: 'বোর্ড বাজার', area: 'Gazipur', lat: 23.9555, lng: 90.4188 },
  { name_en: 'Gazipur Bypass', name_bn: 'গাজীপুর বাইপাস', area: 'Gazipur', lat: 23.9855, lng: 90.4155 },
  { name_en: 'Gazipur Chourasta', name_bn: 'গাজীপুর চৌরাস্তা', area: 'Gazipur', lat: 23.9999, lng: 90.4255 },
];

export const SEED_BUSES: Omit<Bus, 'id'>[] = [
  { name: 'Doleshwar Paribahan', operator: 'Doleshwar Transport', type: 'AC', notes: 'Premium AC service' },
  { name: 'Shyamoli Paribahan', operator: 'Shyamoli NR Travels', type: 'Non-AC', notes: 'Popular long-distance service' },
  { name: 'BRTC (Bangladesh Road Transport Corporation)', operator: 'Government', type: 'AC', notes: 'Government-run AC buses' },
  { name: 'Mohakhali Bus Service', operator: 'Private', type: 'Non-AC', notes: 'Serves Mohakhali area' },
  { name: 'Ababil Paribahan', operator: 'Ababil Transport Ltd', type: 'Non-AC', notes: 'Budget-friendly option' },
  { name: 'Tuba Line', operator: 'Tuba Group', type: 'Non-AC', notes: 'Serves Mirpur-Motijheel' },
  { name: 'Projapoti Paribahan', operator: 'Projapoti Group', type: 'Non-AC', notes: 'Mirpur routes' },
  { name: 'Eid Gah Paribahan', operator: 'Private', type: 'Non-AC', notes: 'Budget transport' },
  { name: 'Jamuna Paribahan', operator: 'Jamuna Group', type: 'Non-AC', notes: 'Uttara-Motijheel service' },
  { name: 'Trans Silva', operator: 'Silva Group', type: 'Non-AC', notes: 'Premium service' },
  { name: 'Green Dhaka', operator: 'Green Group', type: 'CNG', notes: 'Eco-friendly CNG buses' },
  { name: 'Bihongo Paribahan', operator: 'Bihongo Enterprise', type: 'Non-AC', notes: 'Popular Mirpur routes' },
  { name: 'Kohinoor Paribahan', operator: 'Kohinoor Group', type: 'Non-AC', notes: 'Multiple routes in Dhaka' },
  { name: 'Desh Transport', operator: 'Desh Group', type: 'Non-AC', notes: 'Wide network coverage' },
  { name: 'Gazipur Paribahan', operator: 'Private', type: 'Non-AC', notes: 'Dhaka-Gazipur service' },
  { name: 'Uttara Paribahan', operator: 'Private', type: 'Non-AC', notes: 'Uttara routes' },
  { name: 'City Service Bus', operator: 'DSCC', type: 'Non-AC', notes: 'City corporation buses' },
  { name: 'Suprabhat Paribahan', operator: 'Suprabhat Ltd', type: 'Non-AC', notes: 'Morning service' },
  { name: 'Bikash Paribahan', operator: 'Bikash Group', type: 'Non-AC', notes: 'Budget service' },
  { name: 'Royal Coach', operator: 'Royal Group', type: 'AC', notes: 'Premium AC coach' },
  { name: 'Raida Paribahan', operator: 'Raida Transport', type: 'Non-AC', notes: 'Serves Postogola-Uttara' },
  { name: 'Turag Paribahan', operator: 'Turag Group', type: 'Non-AC', notes: 'Mirpur-12 to Sayedabad' },
  { name: 'Balaka Paribahan', operator: 'Balaka Enterprise', type: 'Non-AC', notes: 'Gabtoli to Sadarghat' },
  { name: 'Anabil Paribahan', operator: 'Anabil Group', type: 'Non-AC', notes: 'Signboard to Gazipur' },
  { name: 'Achim Paribahan', operator: 'Achim Group', type: 'Non-AC', notes: 'Mirpur-Postogola service' },
];

// Route seed data: bus_id, start_stop_id, end_stop_id reference 1-indexed IDs from above arrays
export const SEED_ROUTES: Omit<Route, 'id'>[] = [
  // Route 1: Mirpur-12 → Motijheel via Farmgate (Doleshwar)
  { bus_id: 1, start_stop_id: 3, end_stop_id: 9, fixed_fare: 40, distance_km: 14.5, stops_order: JSON.stringify([3, 4, 2, 1, 5, 41, 42, 6, 8, 18, 7, 19, 9]), direction: 'both', is_active: 1 },
  // Route 2: Uttara → Motijheel (Shyamoli)
  { bus_id: 2, start_stop_id: 23, end_stop_id: 9, fixed_fare: 50, distance_km: 20.0, stops_order: JSON.stringify([23, 31, 24, 32, 22, 21, 8, 6, 18, 7, 17, 19, 9]), direction: 'both', is_active: 1 },
  // Route 3: Mirpur-10 → Gulistan (BRTC)
  { bus_id: 3, start_stop_id: 2, end_stop_id: 10, fixed_fare: 35, distance_km: 12.0, stops_order: JSON.stringify([2, 1, 5, 41, 42, 6, 43, 8, 18, 7, 17, 19, 20, 10]), direction: 'both', is_active: 1 },
  // Route 4: Mohakhali → Sadarghat (Mohakhali Bus)
  { bus_id: 4, start_stop_id: 21, end_stop_id: 11, fixed_fare: 30, distance_km: 11.2, stops_order: JSON.stringify([21, 8, 33, 6, 43, 18, 7, 34, 19, 20, 10, 9, 11]), direction: 'both', is_active: 1 },
  // Route 5: Mirpur-1 → Gulistan (Ababil)
  { bus_id: 5, start_stop_id: 1, end_stop_id: 10, fixed_fare: 30, distance_km: 11.0, stops_order: JSON.stringify([1, 5, 41, 40, 39, 12, 37, 13, 16, 15, 38, 14, 10]), direction: 'both', is_active: 1 },
  // Route 6: Mirpur-10 → Motijheel (Tuba Line)
  { bus_id: 6, start_stop_id: 2, end_stop_id: 9, fixed_fare: 30, distance_km: 12.5, stops_order: JSON.stringify([2, 1, 41, 42, 6, 8, 33, 18, 7, 17, 19, 20, 9]), direction: 'both', is_active: 1 },
  // Route 7: Mirpur-12 → Gulistan (Projapoti)
  { bus_id: 7, start_stop_id: 3, end_stop_id: 10, fixed_fare: 35, distance_km: 15.0, stops_order: JSON.stringify([3, 4, 2, 1, 5, 42, 6, 43, 8, 7, 17, 34, 19, 20, 10]), direction: 'both', is_active: 1 },
  // Route 8: Gazipur → Gulistan (Gazipur Paribahan)
  { bus_id: 15, start_stop_id: 26, end_stop_id: 10, fixed_fare: 60, distance_km: 35.0, stops_order: JSON.stringify([26, 25, 23, 31, 24, 32, 22, 21, 8, 6, 18, 7, 19, 20, 10]), direction: 'both', is_active: 1 },
  // Route 9: Uttara → Sadarghat (Jamuna)
  { bus_id: 9, start_stop_id: 23, end_stop_id: 11, fixed_fare: 55, distance_km: 24.0, stops_order: JSON.stringify([23, 31, 24, 32, 22, 21, 8, 6, 18, 7, 34, 19, 20, 10, 9, 11]), direction: 'both', is_active: 1 },
  // Route 10: Mirpur-1 → Shahbagh (Bihongo)
  { bus_id: 12, start_stop_id: 1, end_stop_id: 7, fixed_fare: 25, distance_km: 9.0, stops_order: JSON.stringify([1, 5, 41, 42, 6, 43, 8, 18, 7]), direction: 'both', is_active: 1 },
  // Route 11: Dhanmondi-27 → Motijheel (Kohinoor)
  { bus_id: 13, start_stop_id: 12, end_stop_id: 9, fixed_fare: 25, distance_km: 8.5, stops_order: JSON.stringify([12, 37, 13, 16, 15, 38, 7, 17, 34, 19, 20, 9]), direction: 'both', is_active: 1 },
  // Route 12: Mohakhali → Jatrabari (Trans Silva)
  { bus_id: 10, start_stop_id: 21, end_stop_id: 35, fixed_fare: 35, distance_km: 13.5, stops_order: JSON.stringify([21, 8, 33, 43, 18, 7, 34, 45, 29, 44, 36, 35]), direction: 'both', is_active: 1 },
  // Route 13: Uttara → Farmgate (Uttara Paribahan)
  { bus_id: 16, start_stop_id: 23, end_stop_id: 6, fixed_fare: 40, distance_km: 16.0, stops_order: JSON.stringify([23, 31, 24, 32, 22, 21, 8, 33, 6]), direction: 'both', is_active: 1 },
  // Route 14: Mirpur-10 → Sadarghat (Eid Gah)
  { bus_id: 8, start_stop_id: 2, end_stop_id: 11, fixed_fare: 40, distance_km: 16.0, stops_order: JSON.stringify([2, 1, 5, 41, 42, 6, 8, 18, 7, 17, 19, 20, 10, 9, 11]), direction: 'both', is_active: 1 },
  // Route 15: Airport → Motijheel (BRTC AC)
  { bus_id: 3, start_stop_id: 24, end_stop_id: 9, fixed_fare: 50, distance_km: 18.0, stops_order: JSON.stringify([24, 32, 22, 28, 27, 21, 8, 33, 6, 43, 18, 7, 34, 19, 9]), direction: 'both', is_active: 1 },
  // Route 16: Shyamoli → Gulistan (City Service)
  { bus_id: 17, start_stop_id: 40, end_stop_id: 10, fixed_fare: 25, distance_km: 9.0, stops_order: JSON.stringify([40, 42, 6, 43, 8, 18, 7, 17, 34, 19, 20, 10]), direction: 'both', is_active: 1 },
  // Route 17: Tongi → Motijheel (Desh Transport)
  { bus_id: 14, start_stop_id: 25, end_stop_id: 9, fixed_fare: 55, distance_km: 28.0, stops_order: JSON.stringify([25, 23, 31, 24, 32, 22, 21, 8, 6, 18, 7, 19, 9]), direction: 'both', is_active: 1 },
  // Route 18: Mohammadpur → Motijheel (Suprabhat)
  { bus_id: 18, start_stop_id: 39, end_stop_id: 9, fixed_fare: 30, distance_km: 10.5, stops_order: JSON.stringify([39, 12, 37, 13, 16, 15, 38, 14, 7, 17, 34, 19, 9]), direction: 'both', is_active: 1 },
  // Route 19: Mirpur-12 → Shahbagh (Green Dhaka)
  { bus_id: 11, start_stop_id: 3, end_stop_id: 7, fixed_fare: 30, distance_km: 11.0, stops_order: JSON.stringify([3, 4, 2, 1, 5, 41, 42, 6, 8, 18, 7]), direction: 'both', is_active: 1 },
  // Route 20: Banani → Sadarghat (Doleshwar)
  { bus_id: 1, start_stop_id: 22, end_stop_id: 11, fixed_fare: 45, distance_km: 17.0, stops_order: JSON.stringify([22, 21, 8, 33, 6, 43, 18, 7, 34, 19, 20, 10, 9, 11]), direction: 'both', is_active: 1 },
  // Route 21: Agargaon → Gulistan (Bikash)
  { bus_id: 19, start_stop_id: 42, end_stop_id: 10, fixed_fare: 25, distance_km: 10.0, stops_order: JSON.stringify([42, 6, 43, 8, 18, 7, 17, 34, 19, 20, 10]), direction: 'both', is_active: 1 },
  // Route 22: Gazipur → Motijheel (Royal Coach AC)
  { bus_id: 20, start_stop_id: 26, end_stop_id: 9, fixed_fare: 80, distance_km: 40.0, stops_order: JSON.stringify([26, 25, 23, 31, 24, 32, 22, 28, 27, 21, 8, 33, 6, 18, 7, 19, 9]), direction: 'both', is_active: 1 },
  // Route 23: Mirpur-1 → Jatrabari (Ababil)
  { bus_id: 5, start_stop_id: 1, end_stop_id: 35, fixed_fare: 40, distance_km: 16.5, stops_order: JSON.stringify([1, 5, 41, 42, 6, 8, 18, 7, 34, 45, 29, 44, 36, 35]), direction: 'both', is_active: 1 },
  // Route 24: Uttara → Sayedabad (Shyamoli)
  { bus_id: 2, start_stop_id: 23, end_stop_id: 36, fixed_fare: 50, distance_km: 22.0, stops_order: JSON.stringify([23, 31, 24, 32, 22, 21, 8, 33, 6, 18, 7, 34, 45, 29, 44, 36]), direction: 'both', is_active: 1 },
  // Route 25: Mirpur-10 → Sayedabad (Tuba Line)
  { bus_id: 6, start_stop_id: 2, end_stop_id: 36, fixed_fare: 35, distance_km: 15.0, stops_order: JSON.stringify([2, 1, 41, 42, 6, 8, 18, 7, 34, 45, 44, 36]), direction: 'both', is_active: 1 },
  // Route 26: Science Lab → Paltan (Kohinoor)
  { bus_id: 13, start_stop_id: 16, end_stop_id: 19, fixed_fare: 15, distance_km: 5.0, stops_order: JSON.stringify([16, 15, 38, 7, 17, 34, 19]), direction: 'both', is_active: 1 },
  // Route 27: Farmgate → Sadarghat (BRTC)
  { bus_id: 3, start_stop_id: 6, end_stop_id: 11, fixed_fare: 30, distance_km: 10.0, stops_order: JSON.stringify([6, 43, 8, 18, 7, 17, 34, 19, 20, 10, 9, 11]), direction: 'both', is_active: 1 },
  // Route 28: Badda → Gulistan (Projapoti)
  { bus_id: 7, start_stop_id: 30, end_stop_id: 10, fixed_fare: 30, distance_km: 11.0, stops_order: JSON.stringify([30, 29, 45, 34, 19, 20, 10]), direction: 'both', is_active: 1 },
  // Route 29: Gulshan-2 → Motijheel (Doleshwar)
  { bus_id: 1, start_stop_id: 28, end_stop_id: 9, fixed_fare: 30, distance_km: 10.0, stops_order: JSON.stringify([28, 27, 21, 8, 33, 43, 18, 7, 34, 19, 9]), direction: 'both', is_active: 1 },
  // Route 30: Mirpur-10 → New Market (Bihongo)
  { bus_id: 12, start_stop_id: 2, end_stop_id: 15, fixed_fare: 25, distance_km: 8.5, stops_order: JSON.stringify([2, 41, 40, 39, 12, 37, 13, 16, 15]), direction: 'both', is_active: 1 },
  // Route 31: Mohammadpur → Shahbagh (Desh Transport)
  { bus_id: 14, start_stop_id: 39, end_stop_id: 7, fixed_fare: 20, distance_km: 6.0, stops_order: JSON.stringify([39, 12, 37, 13, 16, 15, 38, 7]), direction: 'both', is_active: 1 },
  // Route 32: Rampura → Farmgate (Jamuna)
  { bus_id: 9, start_stop_id: 29, end_stop_id: 6, fixed_fare: 25, distance_km: 9.0, stops_order: JSON.stringify([29, 45, 34, 18, 8, 33, 6]), direction: 'both', is_active: 1 },
  // Route 33: Postogola → Dia Bari (Raida)
  { bus_id: 21, start_stop_id: 54, end_stop_id: 81, fixed_fare: 45, distance_km: 26.5, stops_order: JSON.stringify([54, 64, 35, 65, 36, 66, 67, 51, 68, 69, 70, 71, 30, 72, 73, 82, 61, 60, 74, 75, 62, 76, 24, 77, 78, 79, 80, 81]), direction: 'both', is_active: 1 },
  // Route 34: Jatrabari → Tongi (Turag)
  { bus_id: 22, start_stop_id: 42, end_stop_id: 32, fixed_fare: 40, distance_km: 25.0, stops_order: JSON.stringify([42, 43, 65, 66, 51, 82, 68, 69, 70, 37, 71, 72, 81, 60, 59, 73, 58, 75, 31, 76, 77, 78, 79, 38, 32]), direction: 'both', is_active: 1 },
  // Route 35: Sayedabad → Gazipur Chourasta (Balaka)
  { bus_id: 23, start_stop_id: 36, end_stop_id: 99, fixed_fare: 60, distance_km: 35.0, stops_order: JSON.stringify([36, 83, 84, 85, 82, 86, 87, 88, 89, 21, 90, 22, 91, 92, 93, 94, 58, 75, 24, 76, 77, 78, 79, 31, 25, 95, 96, 97, 98, 99]), direction: 'both', is_active: 1 },
  // Route 36: Signboard → Gazipur (Anabil)
  { bus_id: 24, start_stop_id: 55, end_stop_id: 33, fixed_fare: 60, distance_km: 42.0, stops_order: JSON.stringify([55, 56, 35, 36, 66, 51, 29, 30, 62, 24, 23, 32, 33]), direction: 'both', is_active: 1 },
  // Route 37: Mirpur-12 → Postogola (Achim)
  { bus_id: 25, start_stop_id: 3, end_stop_id: 54, fixed_fare: 45, distance_km: 22.5, stops_order: JSON.stringify([3, 2, 1, 48, 47, 46, 44, 19, 21, 28, 34, 45, 14, 7, 41, 10, 9, 11, 43, 42, 54]), direction: 'both', is_active: 1 },
];
