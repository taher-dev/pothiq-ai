/** 
 * Pothiq AI — Master Bus Fare Template
 * Driven by bus_fares_template.json
 */

export interface FareSegment {
  from_to: string;
  fare: number;
  km: number;
}

export interface BusTemplate {
  operator: string;
  stops: { name_en: string; name_bn?: string; area?: string }[];
  fares: FareSegment[];
}

export const FARE_TEMPLATES: Record<string, BusTemplate> = {
  "Raida": {
    "operator": "Raida Paribahan",
    "stops": [
      { "name_en": "Dia Bari Chourasta", "name_bn": "দিয়াবাড়ি চৌরাস্তা", "area": "Uttara" },
      { "name_en": "Mascot Plaza", "name_bn": "মাসকট প্লাজা", "area": "Uttara" },
      { "name_en": "Airport", "name_bn": "বিমানবন্দর", "area": "Uttara" },
      { "name_en": "Kuril Flyover", "name_bn": "কুড়িল ফ্লাইওভার", "area": "Kuril" },
      { "name_en": "Notun Bazar", "name_bn": "নতুন বাজার", "area": "Badda" },
      { "name_en": "Badda", "name_bn": "বাড্ডা", "area": "Badda" },
      { "name_en": "Rampura", "name_bn": "রামপুরা", "area": "Rampura" },
      { "name_en": "Khilgaon Flyover", "name_bn": "খিলগাঁও ফ্লাইওভার", "area": "Khilgaon" },
      { "name_en": "Bashabo", "name_bn": "বাসাবো", "area": "Bashabo" },
      { "name_en": "TT Para", "name_bn": "টিটি পাড়া", "area": "Kamalapur" },
      { "name_en": "Sayedabad", "name_bn": "সায়েদাবাদ", "area": "Sayedabad" },
      { "name_en": "Jatrabari", "name_bn": "যাত্রাবাড়ি", "area": "Jatrabari" },
      { "name_en": "Postagola", "name_bn": "পোস্তগোলা", "area": "Postagola" }
    ],
    "fares": [
      { "from_to": "Dia Bari Chourasta - Mascot Plaza", "fare": 10, "km": 2.5 },
      { "from_to": "Dia Bari Chourasta - Airport", "fare": 12, "km": 4.5 },
      { "from_to": "Dia Bari Chourasta - Kuril Flyover", "fare": 21, "km": 8.5 },
      { "from_to": "Dia Bari Chourasta - Notun Bazar", "fare": 30, "km": 12.1 },
      { "from_to": "Dia Bari Chourasta - Badda", "fare": 36, "km": 14.6 },
      { "from_to": "Dia Bari Chourasta - Rampura", "fare": 41, "km": 16.7 },
      { "from_to": "Dia Bari Chourasta - Khilgaon Flyover", "fare": 51, "km": 20.7 },
      { "from_to": "Dia Bari Chourasta - Bashabo", "fare": 53, "km": 21.5 },
      { "from_to": "Dia Bari Chourasta - TT Para", "fare": 55, "km": 22.4 },
      { "from_to": "Dia Bari Chourasta - Sayedabad", "fare": 58, "km": 23.4 },
      { "from_to": "Dia Bari Chourasta - Jatrabari", "fare": 61, "km": 24.8 },
      { "from_to": "Dia Bari Chourasta - Postagola", "fare": 67, "km": 27.3 }
    ]
  },
  "Ayat": {
    "operator": "Ayat Paribahan",
    "stops": [
      { "name_en": "Chiriyakhana", "name_bn": "চিড়িয়াখানা", "area": "Mirpur" },
      { "name_en": "Mirpur-2", "name_bn": "মিরপুর-২", "area": "Mirpur" },
      { "name_en": "Mirpur-10", "name_bn": "মিরপুর-১০", "area": "Mirpur" },
      { "name_en": "Kazipara", "name_bn": "কাজীপাড়া", "area": "Mirpur" },
      { "name_en": "Shewrapara", "name_bn": "শেওড়াপাড়া", "area": "Mirpur" },
      { "name_en": "Agargaon", "name_bn": "আগারগাঁও", "area": "Agargaon" },
      { "name_en": "Farmgate", "name_bn": "ফার্মগেট", "area": "Farmgate" },
      { "name_en": "Bangla Motor", "name_bn": "বাংলামটর", "area": "Shahbagh" },
      { "name_en": "Mogbazar", "name_bn": "মগবাজার", "area": "Mogbazar" },
      { "name_en": "Mouchak", "name_bn": "মৌচাক", "area": "Malibagh" },
      { "name_en": "Kamalapur", "name_bn": "কমলাপুর", "area": "Kamalapur" }
    ],
    "fares": [
      { "from_to": "Chiriyakhana - Mirpur-2", "fare": 10, "km": 2.8 },
      { "from_to": "Chiriyakhana - Mirpur-10", "fare": 10, "km": 3.4 },
      { "from_to": "Chiriyakhana - Kazipara", "fare": 12, "km": 4.8 },
      { "from_to": "Chiriyakhana - Shewrapara", "fare": 13, "km": 5.5 },
      { "from_to": "Chiriyakhana - Agargaon", "fare": 18, "km": 7.2 },
      { "from_to": "Chiriyakhana - Farmgate", "fare": 25, "km": 10.1 },
      { "from_to": "Chiriyakhana - Bangla Motor", "fare": 29, "km": 11.7 },
      { "from_to": "Chiriyakhana - Mogbazar", "fare": 31, "km": 12.7 },
      { "from_to": "Chiriyakhana - Mouchak", "fare": 34, "km": 13.8 },
      { "from_to": "Chiriyakhana - Kamalapur", "fare": 40, "km": 16.5 }
    ]
  },
  "Transilva": {
    "operator": "Transilva Paribahan",
    "stops": [
      { "name_en": "Mirpur-1", "name_bn": "মিরপুর-১", "area": "Mirpur" },
      { "name_en": "Ansar Camp", "name_bn": "আনসার ক্যাম্প", "area": "Mirpur" },
      { "name_en": "Darussalam", "name_bn": "দারুসসালাম", "area": "Mirpur" },
      { "name_en": "Kallyanpur", "name_bn": "কল্যাণপুর", "area": "Kallyanpur" },
      { "name_en": "Shyamoli", "name_bn": "শ্যামলী", "area": "Shyamoli" },
      { "name_en": "College Gate", "name_bn": "কলেজ গেট", "area": "Mohammadpur" },
      { "name_en": "Asad Gate", "name_bn": "আসাদ গেট", "area": "Mohammadpur" },
      { "name_en": "Farmgate", "name_bn": "ফার্মগেট", "area": "Farmgate" },
      { "name_en": "Kawran Bazar", "name_bn": "কাওরান বাজার", "area": "Tejgaon" },
      { "name_en": "Shahbag", "name_bn": "শাহবাগ", "area": "Shahbagh" },
      { "name_en": "Press Club", "name_bn": "প্রেস ক্লাব", "area": "Ramna" },
      { "name_en": "Stadium", "name_bn": "স্টেডিয়াম", "area": "Motijheel" },
      { "name_en": "Ittefaq", "name_bn": "ইত্তেফাক", "area": "Motijheel" },
      { "name_en": "Sayedabad", "name_bn": "সায়েদাবাদ", "area": "Sayedabad" }
    ],
    "fares": [
      { "from_to": "Mirpur-1 - Ansar Camp", "fare": 10, "km": 0.9 },
      { "from_to": "Mirpur-1 - Darussalam", "fare": 10, "km": 2.0 },
      { "from_to": "Mirpur-1 - Kallyanpur", "fare": 10, "km": 3.2 },
      { "from_to": "Mirpur-1 - Shyamoli", "fare": 10, "km": 3.6 },
      { "from_to": "Mirpur-1 - College Gate", "fare": 11, "km": 4.5 },
      { "from_to": "Mirpur-1 - Asad Gate", "fare": 13, "km": 5.4 },
      { "from_to": "Mirpur-1 - Farmgate", "fare": 18, "km": 7.2 },
      { "from_to": "Mirpur-1 - Kawran Bazar", "fare": 20, "km": 8.2 },
      { "from_to": "Mirpur-1 - Shahbag", "fare": 24, "km": 9.6 },
      { "from_to": "Mirpur-1 - Press Club", "fare": 28, "km": 11.3 },
      { "from_to": "Mirpur-1 - Stadium", "fare": 30, "km": 12.3 },
      { "from_to": "Mirpur-1 - Ittefaq", "fare": 38, "km": 15.4 },
      { "from_to": "Mirpur-1 - Sayedabad", "fare": 40, "km": 18.3 }
    ]
  },
  "Balaka": {
    "operator": "Balaka Paribahan",
    "stops": [
      { "name_en": "Sayedabad", "name_bn": "সায়েদাবাদ", "area": "Sayedabad" },
      { "name_en": "Malibagh", "name_bn": "মালিবাগ", "area": "Malibagh" },
      { "name_en": "Shat Rasta", "name_bn": "সাতরাস্তা", "area": "Tejgaon" },
      { "name_en": "Mohakhali", "name_bn": "মহাখালী", "area": "Mohakhali" },
      { "name_en": "Airport", "name_bn": "বিমানবন্দর", "area": "Uttara" },
      { "name_en": "Tongi Bazar", "name_bn": "টঙ্গী বাজার", "area": "Tongi" },
      { "name_en": "Cherag Ali", "name_bn": "চেরাগ আলী", "area": "Tongi" },
      { "name_en": "Board Bazar", "name_bn": "বোর্ড বাজার", "area": "Gazipur" },
      { "name_en": "Chourasta", "name_bn": "চৌরাস্তা", "area": "Gazipur" },
      { "name_en": "Gazipur", "name_bn": "গাজীপুর", "area": "Gazipur" }
    ],
    "fares": [
      { "from_to": "Sayedabad - Malibagh", "fare": 10, "km": 4.0 },
      { "from_to": "Sayedabad - Shat Rasta", "fare": 20, "km": 8.0 },
      { "from_to": "Sayedabad - Mohakhali", "fare": 29, "km": 12.0 },
      { "from_to": "Sayedabad - Airport", "fare": 49, "km": 20.0 },
      { "from_to": "Sayedabad - Tongi Bazar", "fare": 59, "km": 24.0 },
      { "from_to": "Sayedabad - Cherag Ali", "fare": 66, "km": 27.0 },
      { "from_to": "Sayedabad - Board Bazar", "fare": 76, "km": 31.0 },
      { "from_to": "Sayedabad - Chourasta", "fare": 91, "km": 37.0 },
      { "from_to": "Sayedabad - Gazipur", "fare": 103, "km": 42.0 }
    ]
  },
  "Victor": {
    "operator": "Victor Classinc Paribahan",
    "stops": [
      { "name_en": "Sadarghat", "name_bn": "সদরঘাট", "area": "Sadarghat" },
      { "name_en": "Naya Bazar", "name_bn": "নয়াবাজার", "area": "Old Dhaka" },
      { "name_en": "Golap Shah Mazar", "name_bn": "গোলাপ শাহ মাজার", "area": "Gulistan" },
      { "name_en": "Paltan", "name_bn": "পল্টন", "area": "Paltan" },
      { "name_en": "Malibaag Moor", "name_bn": "মালিবাগ মোড়", "area": "Malibagh" },
      { "name_en": "Rampura Bridge", "name_bn": "রামপুরা ব্রিজ", "area": "Rampura" },
      { "name_en": "Shahjadpur", "name_bn": "শাহজাদপুর", "area": "Badda" },
      { "name_en": "Notun Bazar", "name_bn": "নতুন বাজার", "area": "Badda" },
      { "name_en": "Bashundhara", "name_bn": "বসুন্ধরা", "area": "Bhatara" },
      { "name_en": "Kuril Bishwa Road", "name_bn": "কুড়িল বিশ্বরোড", "area": "Kuril" }
    ],
    "fares": [
      { "from_to": "Sadarghat - Kuril Bishwa Road", "fare": 77, "km": 31.1 }
    ]
  },
  "Bikash": {
    "operator": "Bikash Paribahan",
    "stops": [
      { "name_en": "Sign Board", "name_bn": "সাইন বোর্ড", "area": "Jatrabari" },
      { "name_en": "Matuail", "name_bn": "মাতুয়াইল", "area": "Jatrabari" },
      { "name_en": "Rayerbag", "name_bn": "রায়েরবাগ", "area": "Jatrabari" },
      { "name_en": "Jatrabari", "name_bn": "যাত্রাবাড়ি", "area": "Jatrabari" },
      { "name_en": "Sayedabad", "name_bn": "সায়েদাবাদ", "area": "Sayedabad" },
      { "name_en": "Gulistan", "name_bn": "গুলিস্তান", "area": "Gulistan" },
      { "name_en": "Azimpur", "name_bn": "আজিমপুর", "area": "Azimpur" },
      { "name_en": "New Market", "name_bn": "নিউ মার্কেট", "area": "Dhanmondi" },
      { "name_en": "Kalabagan", "name_bn": "কলাবাগান", "area": "Dhanmondi" },
      { "name_en": "Dhanmondi 32", "name_bn": "ধানমন্ডি ৩২", "area": "Dhanmondi" },
      { "name_en": "Bijoy Sarani", "name_bn": "বিজয় সরণি", "area": "Tejgaon" },
      { "name_en": "Mohakhali", "name_bn": "মহাখালী", "area": "Mohakhali" },
      { "name_en": "Banani", "name_bn": "বনানী", "area": "Banani" },
      { "name_en": "Kuril Bishwa Road", "name_bn": "কুড়িল বিশ্বরোড", "area": "Kuril" },
      { "name_en": "Airport", "name_bn": "বিমানবন্দর", "area": "Uttara" },
      { "name_en": "Rajlakshmi", "name_bn": "রাজলক্ষ্মী", "area": "Uttara" },
      { "name_en": "Abdullahpur", "name_bn": "আব্দুল্লাহপুর", "area": "Uttara" },
      { "name_en": "Kamarpara", "name_bn": "কামারপাড়া", "area": "Uttara" }
    ],
    "fares": [
      { "from_to": "Sign Board - Kamarpara", "fare": 86, "km": 35.0 }
    ]
  },
  "Ashirbad": {
    "operator": "Ashirbad Pahibahan",
    "stops": [
      { "name_en": "Duairipara", "name_bn": "দুয়ারিপাড়া", "area": "Mirpur" },
      { "name_en": "Mirpur 2", "name_bn": "মিরপুর ২", "area": "Mirpur" },
      { "name_en": "Mirpur 1", "name_bn": "মিরপুর ১", "area": "Mirpur" },
      { "name_en": "Technical", "name_bn": "টেকনিক্যাল", "area": "Mirpur" },
      { "name_en": "Kallyanpur", "name_bn": "কল্যাণপুর", "area": "Kallyanpur" },
      { "name_en": "Shyamoli", "name_bn": "শ্যামলী", "area": "Shyamoli" },
      { "name_en": "Asad Gate", "name_bn": "আসাদ গেট", "area": "Mohammadpur" },
      { "name_en": "Dhanmondi 32", "name_bn": "ধানমন্ডি ৩২", "area": "Dhanmondi" },
      { "name_en": "New Market", "name_bn": "নিউ মার্কেট", "area": "Dhanmondi" },
      { "name_en": "Azimpur", "name_bn": "আজিমপুর", "area": "Azimpur" }
    ],
    "fares": [
      { "from_to": "Duairipara - Azimpur", "fare": 37, "km": 15.0 }
    ]
  },
  "Turag": {
    "operator": "Great Turag Transport",
    "stops": [
      { "name_en": "Jatrabari", "name_bn": "যাত্রাবাড়ি", "area": "Jatrabari" },
      { "name_en": "Bashabo", "name_bn": "বাসাবো", "area": "Bashabo" },
      { "name_en": "Malibaag Moor", "name_bn": "মালিবাগ মোড়", "area": "Malibagh" },
      { "name_en": "Rampura Bridge", "name_bn": "রামপুরা ব্রিজ", "area": "Rampura" },
      { "name_en": "Badda", "name_bn": "বাড্ডা", "area": "Badda" },
      { "name_en": "Notun Bazar", "name_bn": "নতুন বাজার", "area": "Badda" },
      { "name_en": "Kuril Bishwa Road", "name_bn": "কুড়িল বিশ্বরোড", "area": "Kuril" },
      { "name_en": "Airport", "name_bn": "বিমানবন্দর", "area": "Uttara" },
      { "name_en": "Rajlakshmi", "name_bn": "রাজলক্ষ্মী", "area": "Uttara" },
      { "name_en": "Azampur", "name_bn": "আজমপুর", "area": "Uttara" }
    ],
    "fares": [
      { "from_to": "Jatrabari - Azampur", "fare": 54, "km": 22.0 }
    ]
  },
  "Projapati": {
    "operator": "Projapati Paribahan",
    "stops": [
      { "name_en": "Bosila", "name_bn": "বসিলা", "area": "Mohammadpur" },
      { "name_en": "Mohammadpur", "name_bn": "মোহাম্মদপুর", "area": "Mohammadpur" },
      { "name_en": "Asad Gate", "name_bn": "আসাদ গেট", "area": "Mohammadpur" },
      { "name_en": "Shyamoli", "name_bn": "শ্যামলী", "area": "Shyamoli" },
      { "name_en": "Technical", "name_bn": "টেকনিক্যাল", "area": "Mirpur" },
      { "name_en": "Mirpur 1", "name_bn": "মিরপুর ১", "area": "Mirpur" },
      { "name_en": "Mirpur 10", "name_bn": "মিরপুর ১০", "area": "Mirpur" },
      { "name_en": "Kalshi", "name_bn": "কালশী", "area": "Mirpur" },
      { "name_en": "Kuril Bishwa Road", "name_bn": "কুড়িল বিশ্বরোড", "area": "Kuril" },
      { "name_en": "Airport", "name_bn": "বিমানবন্দর", "area": "Uttara" },
      { "name_en": "Abdullahpur", "name_bn": "আব্দুল্লাহপুর", "area": "Uttara" },
      { "name_en": "Kamarpara", "name_bn": "কামারপাড়া", "area": "Uttara" }
    ],
    "fares": [
      { "from_to": "Bosila - Kamarpara", "fare": 69, "km": 28.0 }
    ]
  }
};
