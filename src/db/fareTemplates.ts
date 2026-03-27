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
  }
};
