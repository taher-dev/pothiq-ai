// ============================================
// Pothiq AI — Highly Accurate Fares & Deduplicated Data
// ============================================

import type { Stop, Bus, Route } from '../types';

export const SEED_STOPS: Omit<Stop, 'id' | 'created_at'>[] = [
  {
    "name_en": "300 Feet",
    "name_bn": "300 Feet",
    "area": "Dhaka",
    "lat": 23.821335683692308,
    "lng": 90.42189916077608
  },
  {
    "name_en": "Abdulla",
    "name_bn": "Abdulla",
    "area": "Dhaka",
    "lat": 23.80514867111888,
    "lng": 90.38822836778175
  },
  {
    "name_en": "Abdullahpur",
    "name_bn": "Abdullahpur",
    "area": "Dhaka",
    "lat": 23.792040506100367,
    "lng": 90.40138796805725
  },
  {
    "name_en": "Adabor",
    "name_bn": "Adabor",
    "area": "Dhaka",
    "lat": 23.793627074703593,
    "lng": 90.41236050173032
  },
  {
    "name_en": "Adabor Shyamoli",
    "name_bn": "Adabor Shyamoli",
    "area": "Dhaka",
    "lat": 23.814070648097747,
    "lng": 90.40378672330155
  },
  {
    "name_en": "Adamjee College",
    "name_bn": "Adamjee College",
    "area": "Dhaka",
    "lat": 23.798946218319188,
    "lng": 90.41988116920616
  },
  {
    "name_en": "Adamjee School",
    "name_bn": "Adamjee School",
    "area": "Dhaka",
    "lat": 23.81141027000783,
    "lng": 90.40592335756429
  },
  {
    "name_en": "Agargaon",
    "name_bn": "Agargaon",
    "area": "Dhaka",
    "lat": 23.824005725171958,
    "lng": 90.41106200741751
  },
  {
    "name_en": "Airport",
    "name_bn": "Airport",
    "area": "Dhaka",
    "lat": 23.83234603735437,
    "lng": 90.40079188226507
  },
  {
    "name_en": "Airport Jashimuddin (Uttara)",
    "name_bn": "Airport Jashimuddin (Uttara)",
    "area": "Dhaka",
    "lat": 23.83502979003654,
    "lng": 90.39465062986238
  },
  {
    "name_en": "Amin Bazar",
    "name_bn": "Amin Bazar",
    "area": "Dhaka",
    "lat": 23.80540209404234,
    "lng": 90.4003275633758
  },
  {
    "name_en": "Ansar Camp",
    "name_bn": "Ansar Camp",
    "area": "Dhaka",
    "lat": 23.80004467767979,
    "lng": 90.42410315092957
  },
  {
    "name_en": "Arambagh",
    "name_bn": "Arambagh",
    "area": "Dhaka",
    "lat": 23.796604156714206,
    "lng": 90.39785300324522
  },
  {
    "name_en": "Arambagh Kingdom",
    "name_bn": "Arambagh Kingdom",
    "area": "Dhaka",
    "lat": 23.795882025228305,
    "lng": 90.40847586636178
  },
  {
    "name_en": "Arambagh Notre Dame College",
    "name_bn": "Arambagh Notre Dame College",
    "area": "Dhaka",
    "lat": 23.810558850215326,
    "lng": 90.39913938533589
  },
  {
    "name_en": "Asad Gate",
    "name_bn": "Asad Gate",
    "area": "Dhaka",
    "lat": 23.80064152599712,
    "lng": 90.38822092094154
  },
  {
    "name_en": "Ashulia",
    "name_bn": "Ashulia",
    "area": "Dhaka",
    "lat": 23.807830592940892,
    "lng": 90.39779865304746
  },
  {
    "name_en": "Ashulia Bazar",
    "name_bn": "Ashulia Bazar",
    "area": "Dhaka",
    "lat": 23.801806833289362,
    "lng": 90.38805843225879
  },
  {
    "name_en": "Azampur",
    "name_bn": "Azampur",
    "area": "Dhaka",
    "lat": 23.82542789491502,
    "lng": 90.41816988183784
  },
  {
    "name_en": "Azimpur",
    "name_bn": "Azimpur",
    "area": "Dhaka",
    "lat": 23.788121572823606,
    "lng": 90.39580494598347
  },
  {
    "name_en": "Babubazar",
    "name_bn": "Babubazar",
    "area": "Dhaka",
    "lat": 23.81170235209485,
    "lng": 90.42126057747387
  },
  {
    "name_en": "Badda",
    "name_bn": "Badda",
    "area": "Dhaka",
    "lat": 23.80296776110761,
    "lng": 90.42016744804407
  },
  {
    "name_en": "Badda Link Road",
    "name_bn": "Badda Link Road",
    "area": "Dhaka",
    "lat": 23.803137319672196,
    "lng": 90.43521783967176
  },
  {
    "name_en": "Baipayl",
    "name_bn": "Baipayl",
    "area": "Dhaka",
    "lat": 23.800751049061873,
    "lng": 90.4272774007377
  },
  {
    "name_en": "Baitul Mukarram",
    "name_bn": "Baitul Mukarram",
    "area": "Dhaka",
    "lat": 23.795603686197182,
    "lng": 90.40104788379296
  },
  {
    "name_en": "Bakshi Bazar",
    "name_bn": "Bakshi Bazar",
    "area": "Dhaka",
    "lat": 23.806563194765417,
    "lng": 90.39743101064484
  },
  {
    "name_en": "Balughat",
    "name_bn": "Balughat",
    "area": "Dhaka",
    "lat": 23.806182405082744,
    "lng": 90.40300722772587
  },
  {
    "name_en": "Banani",
    "name_bn": "Banani",
    "area": "Dhaka",
    "lat": 23.81728367669965,
    "lng": 90.43626503397329
  },
  {
    "name_en": "Banasree",
    "name_bn": "Banasree",
    "area": "Dhaka",
    "lat": 23.78721493825125,
    "lng": 90.41562814340912
  },
  {
    "name_en": "Bangla College",
    "name_bn": "Bangla College",
    "area": "Dhaka",
    "lat": 23.82087120672979,
    "lng": 90.39318095583128
  },
  {
    "name_en": "Bangla Motor",
    "name_bn": "Bangla Motor",
    "area": "Dhaka",
    "lat": 23.83031968206693,
    "lng": 90.42857685186374
  },
  {
    "name_en": "Bangla Motor Shahbag",
    "name_bn": "Bangla Motor Shahbag",
    "area": "Dhaka",
    "lat": 23.823290027440734,
    "lng": 90.42306517154847
  },
  {
    "name_en": "Bangladesh Bank",
    "name_bn": "Bangladesh Bank",
    "area": "Dhaka",
    "lat": 23.79230467598005,
    "lng": 90.40658732479126
  },
  {
    "name_en": "Baromi",
    "name_bn": "Baromi",
    "area": "Dhaka",
    "lat": 23.787701550444204,
    "lng": 90.42530809446198
  },
  {
    "name_en": "Bashabo",
    "name_bn": "Bashabo",
    "area": "Dhaka",
    "lat": 23.82095265227397,
    "lng": 90.3903496174504
  },
  {
    "name_en": "Bashtola",
    "name_bn": "Bashtola",
    "area": "Dhaka",
    "lat": 23.83032870064625,
    "lng": 90.43716855697193
  },
  {
    "name_en": "Bashundhara",
    "name_bn": "Bashundhara",
    "area": "Dhaka",
    "lat": 23.833494711981377,
    "lng": 90.40398214079751
  },
  {
    "name_en": "Bashundhara (300 Feet Gate)",
    "name_bn": "Bashundhara (300 Feet Gate)",
    "area": "Dhaka",
    "lat": 23.791549235508956,
    "lng": 90.42597219681846
  },
  {
    "name_en": "Bata Signal",
    "name_bn": "Bata Signal",
    "area": "Dhaka",
    "lat": 23.81084673761554,
    "lng": 90.38993788534549
  },
  {
    "name_en": "Beribadh",
    "name_bn": "Beribadh",
    "area": "Dhaka",
    "lat": 23.801387996142722,
    "lng": 90.4344852428583
  },
  {
    "name_en": "Beribadh Tin Rastar Moor",
    "name_bn": "Beribadh Tin Rastar Moor",
    "area": "Dhaka",
    "lat": 23.818920918144645,
    "lng": 90.39483638688073
  },
  {
    "name_en": "Bijoy Sarani",
    "name_bn": "Bijoy Sarani",
    "area": "Dhaka",
    "lat": 23.81447904324801,
    "lng": 90.41524670270682
  },
  {
    "name_en": "Birulia",
    "name_bn": "Birulia",
    "area": "Dhaka",
    "lat": 23.817220389647268,
    "lng": 90.41742031994069
  },
  {
    "name_en": "Board Bazar",
    "name_bn": "Board Bazar",
    "area": "Dhaka",
    "lat": 23.794542320550914,
    "lng": 90.43456367418585
  },
  {
    "name_en": "Bosila",
    "name_bn": "Bosila",
    "area": "Dhaka",
    "lat": 23.8053490815801,
    "lng": 90.43327788999743
  },
  {
    "name_en": "Bot tola",
    "name_bn": "Bot tola",
    "area": "Dhaka",
    "lat": 23.82981468845776,
    "lng": 90.39832841304548
  },
  {
    "name_en": "CMH",
    "name_bn": "CMH",
    "area": "Dhaka",
    "lat": 23.800028740601498,
    "lng": 90.4316672004347
  },
  {
    "name_en": "Cantonment",
    "name_bn": "Cantonment",
    "area": "Dhaka",
    "lat": 23.820577337530487,
    "lng": 90.43555019872073
  },
  {
    "name_en": "Chairman Bari",
    "name_bn": "Chairman Bari",
    "area": "Dhaka",
    "lat": 23.809585794766654,
    "lng": 90.408129691421
  },
  {
    "name_en": "Chandra",
    "name_bn": "Chandra",
    "area": "Dhaka",
    "lat": 23.79144861870884,
    "lng": 90.40779770056324
  },
  {
    "name_en": "Chankhar Pul",
    "name_bn": "Chankhar Pul",
    "area": "Dhaka",
    "lat": 23.818115914242,
    "lng": 90.41041497426882
  },
  {
    "name_en": "Chashara",
    "name_bn": "Chashara",
    "area": "Dhaka",
    "lat": 23.79102731941992,
    "lng": 90.4228813997738
  },
  {
    "name_en": "Chiriyakhana",
    "name_bn": "Chiriyakhana",
    "area": "Dhaka",
    "lat": 23.831330207067914,
    "lng": 90.4242893689042
  },
  {
    "name_en": "Chittagong Road",
    "name_bn": "Chittagong Road",
    "area": "Dhaka",
    "lat": 23.827471654107658,
    "lng": 90.39746115414233
  },
  {
    "name_en": "City College",
    "name_bn": "City College",
    "area": "Dhaka",
    "lat": 23.81326276462617,
    "lng": 90.4085478832924
  },
  {
    "name_en": "College Gate",
    "name_bn": "College Gate",
    "area": "Dhaka",
    "lat": 23.828587105702038,
    "lng": 90.41795406447619
  },
  {
    "name_en": "Dainik Bangla Moor",
    "name_bn": "Dainik Bangla Moor",
    "area": "Dhaka",
    "lat": 23.788809535447452,
    "lng": 90.43588629657536
  },
  {
    "name_en": "Darussalam",
    "name_bn": "Darussalam",
    "area": "Dhaka",
    "lat": 23.80328694567581,
    "lng": 90.39643738582754
  },
  {
    "name_en": "Dayaganj",
    "name_bn": "Dayaganj",
    "area": "Dhaka",
    "lat": 23.793631038696827,
    "lng": 90.4104927566569
  },
  {
    "name_en": "Demra Staff Quarter",
    "name_bn": "Demra Staff Quarter",
    "area": "Dhaka",
    "lat": 23.834226327508357,
    "lng": 90.40343668383152
  },
  {
    "name_en": "Dhakeshwari",
    "name_bn": "Dhakeshwari",
    "area": "Dhaka",
    "lat": 23.797693120406667,
    "lng": 90.38996178140968
  },
  {
    "name_en": "Dhamra",
    "name_bn": "Dhamra",
    "area": "Dhaka",
    "lat": 23.820174501857117,
    "lng": 90.41626638279675
  },
  {
    "name_en": "Dhamrai",
    "name_bn": "Dhamrai",
    "area": "Dhaka",
    "lat": 23.788048848121424,
    "lng": 90.41315454314498
  },
  {
    "name_en": "Dhanmondi 15",
    "name_bn": "Dhanmondi 15",
    "area": "Dhaka",
    "lat": 23.800150477903703,
    "lng": 90.41444202825951
  },
  {
    "name_en": "Dhanmondi 27",
    "name_bn": "Dhanmondi 27",
    "area": "Dhaka",
    "lat": 23.83508726338144,
    "lng": 90.39847498139392
  },
  {
    "name_en": "Dhanmondi 32",
    "name_bn": "Dhanmondi 32",
    "area": "Dhaka",
    "lat": 23.830804082323485,
    "lng": 90.38911726978964
  },
  {
    "name_en": "Dhanmondi 32 Kalabagan",
    "name_bn": "Dhanmondi 32 Kalabagan",
    "area": "Dhaka",
    "lat": 23.807401483158305,
    "lng": 90.39684188567877
  },
  {
    "name_en": "Dholairpar",
    "name_bn": "Dholairpar",
    "area": "Dhaka",
    "lat": 23.82771621810576,
    "lng": 90.42561586624579
  },
  {
    "name_en": "Dhour",
    "name_bn": "Dhour",
    "area": "Dhaka",
    "lat": 23.80923853889337,
    "lng": 90.43508321219338
  },
  {
    "name_en": "Dhupkhola",
    "name_bn": "Dhupkhola",
    "area": "Dhaka",
    "lat": 23.82141397859276,
    "lng": 90.41263196347097
  },
  {
    "name_en": "Dia Bari",
    "name_bn": "Dia Bari",
    "area": "Dhaka",
    "lat": 23.82121286874326,
    "lng": 90.40581484089407
  },
  {
    "name_en": "Duaripara",
    "name_bn": "Duaripara",
    "area": "Dhaka",
    "lat": 23.790821267428296,
    "lng": 90.40462435535558
  },
  {
    "name_en": "ECB Square",
    "name_bn": "ECB Square",
    "area": "Dhaka",
    "lat": 23.826610111256482,
    "lng": 90.40871175473349
  },
  {
    "name_en": "Eden College",
    "name_bn": "Eden College",
    "area": "Dhaka",
    "lat": 23.817618378109206,
    "lng": 90.42301095417228
  },
  {
    "name_en": "Fakirapul",
    "name_bn": "Fakirapul",
    "area": "Dhaka",
    "lat": 23.789900447582685,
    "lng": 90.39990212687142
  },
  {
    "name_en": "Fantasy Kingdom",
    "name_bn": "Fantasy Kingdom",
    "area": "Dhaka",
    "lat": 23.8122720711493,
    "lng": 90.39827376311426
  },
  {
    "name_en": "Farmgate",
    "name_bn": "Farmgate",
    "area": "Dhaka",
    "lat": 23.81639129150672,
    "lng": 90.41305456857228
  },
  {
    "name_en": "Farmgate Bijoy Sarani",
    "name_bn": "Farmgate Bijoy Sarani",
    "area": "Dhaka",
    "lat": 23.796791216141152,
    "lng": 90.42217214725733
  },
  {
    "name_en": "Fulbaria",
    "name_bn": "Fulbaria",
    "area": "Dhaka",
    "lat": 23.819263919587204,
    "lng": 90.40397355724639
  },
  {
    "name_en": "GPO",
    "name_bn": "GPO",
    "area": "Dhaka",
    "lat": 23.787982310064002,
    "lng": 90.40172120968816
  },
  {
    "name_en": "Gabtoli",
    "name_bn": "Gabtoli",
    "area": "Dhaka",
    "lat": 23.788234910599765,
    "lng": 90.41429948692388
  },
  {
    "name_en": "Gandaria",
    "name_bn": "Gandaria",
    "area": "Dhaka",
    "lat": 23.813764139056133,
    "lng": 90.42104764402116
  },
  {
    "name_en": "Garrison (Cantonment)",
    "name_bn": "Garrison (Cantonment)",
    "area": "Dhaka",
    "lat": 23.824558324808876,
    "lng": 90.42653717783084
  },
  {
    "name_en": "Gazipur Bypass",
    "name_bn": "Gazipur Bypass",
    "area": "Dhaka",
    "lat": 23.826491010834474,
    "lng": 90.39492743134582
  },
  {
    "name_en": "Gazipur Chourasta",
    "name_bn": "Gazipur Chourasta",
    "area": "Dhaka",
    "lat": 23.799112629560806,
    "lng": 90.43496521459261
  },
  {
    "name_en": "Ghatar Char",
    "name_bn": "Ghatar Char",
    "area": "Dhaka",
    "lat": 23.796271710401776,
    "lng": 90.40474428877671
  },
  {
    "name_en": "Golap Shah Mazar",
    "name_bn": "Golap Shah Mazar",
    "area": "Dhaka",
    "lat": 23.78948982182356,
    "lng": 90.4171887626224
  },
  {
    "name_en": "Golapbag Chourasta",
    "name_bn": "Golapbag Chourasta",
    "area": "Dhaka",
    "lat": 23.83238817890834,
    "lng": 90.40789015296497
  },
  {
    "name_en": "Gulistan",
    "name_bn": "Gulistan",
    "area": "Dhaka",
    "lat": 23.809880448229336,
    "lng": 90.41608132440395
  },
  {
    "name_en": "Gulshan 1",
    "name_bn": "Gulshan 1",
    "area": "Dhaka",
    "lat": 23.829464097625138,
    "lng": 90.39535716381964
  },
  {
    "name_en": "Gulshan 2",
    "name_bn": "Gulshan 2",
    "area": "Dhaka",
    "lat": 23.81037955604928,
    "lng": 90.39943608393207
  },
  {
    "name_en": "Gulshan Link Road",
    "name_bn": "Gulshan Link Road",
    "area": "Dhaka",
    "lat": 23.816168495337127,
    "lng": 90.42068825389687
  },
  {
    "name_en": "Hasnabad",
    "name_bn": "Hasnabad",
    "area": "Dhaka",
    "lat": 23.799251363799538,
    "lng": 90.39380035881773
  },
  {
    "name_en": "Hazaribag",
    "name_bn": "Hazaribag",
    "area": "Dhaka",
    "lat": 23.832303576707076,
    "lng": 90.40612793302961
  },
  {
    "name_en": "Hazipara",
    "name_bn": "Hazipara",
    "area": "Dhaka",
    "lat": 23.79756572732014,
    "lng": 90.4365994787498
  },
  {
    "name_en": "Hemayetpur",
    "name_bn": "Hemayetpur",
    "area": "Dhaka",
    "lat": 23.799806456626513,
    "lng": 90.43575455709852
  },
  {
    "name_en": "High Court",
    "name_bn": "High Court",
    "area": "Dhaka",
    "lat": 23.81933082827284,
    "lng": 90.4372130070525
  },
  {
    "name_en": "House Building",
    "name_bn": "House Building",
    "area": "Dhaka",
    "lat": 23.805937984412452,
    "lng": 90.40524317505673
  },
  {
    "name_en": "IDB",
    "name_bn": "IDB",
    "area": "Dhaka",
    "lat": 23.79182130884276,
    "lng": 90.40329038601804
  },
  {
    "name_en": "Ittefaq Moor",
    "name_bn": "Ittefaq Moor",
    "area": "Dhaka",
    "lat": 23.787320385765653,
    "lng": 90.4068134499803
  },
  {
    "name_en": "Ittefaq Moor Sayedabad",
    "name_bn": "Ittefaq Moor Sayedabad",
    "area": "Dhaka",
    "lat": 23.829048251890722,
    "lng": 90.43266475410502
  },
  {
    "name_en": "Jahangir Gate",
    "name_bn": "Jahangir Gate",
    "area": "Dhaka",
    "lat": 23.807671103109044,
    "lng": 90.39503929436157
  },
  {
    "name_en": "Jakir Hossen Road",
    "name_bn": "Jakir Hossen Road",
    "area": "Dhaka",
    "lat": 23.823782311765623,
    "lng": 90.40064177887608
  },
  {
    "name_en": "Jalkuri",
    "name_bn": "Jalkuri",
    "area": "Dhaka",
    "lat": 23.818307342710483,
    "lng": 90.43706361703681
  },
  {
    "name_en": "Jamgora",
    "name_bn": "Jamgora",
    "area": "Dhaka",
    "lat": 23.825993101412223,
    "lng": 90.43374796363854
  },
  {
    "name_en": "Jamuna Future Park",
    "name_bn": "Jamuna Future Park",
    "area": "Dhaka",
    "lat": 23.82413817778647,
    "lng": 90.41077334501851
  },
  {
    "name_en": "Janapath Moor",
    "name_bn": "Janapath Moor",
    "area": "Dhaka",
    "lat": 23.785486042138622,
    "lng": 90.43113114630677
  },
  {
    "name_en": "Japan Garden City",
    "name_bn": "Japan Garden City",
    "area": "Dhaka",
    "lat": 23.808732234871016,
    "lng": 90.42292601535999
  },
  {
    "name_en": "Jarun",
    "name_bn": "Jarun",
    "area": "Dhaka",
    "lat": 23.816159883795372,
    "lng": 90.43060575108562
  },
  {
    "name_en": "Jashimuddin (Uttara)",
    "name_bn": "Jashimuddin (Uttara)",
    "area": "Dhaka",
    "lat": 23.80452805981608,
    "lng": 90.43479102432903
  },
  {
    "name_en": "Jatrabari",
    "name_bn": "Jatrabari",
    "area": "Dhaka",
    "lat": 23.829952452804193,
    "lng": 90.4220034399557
  },
  {
    "name_en": "Jigatola",
    "name_bn": "Jigatola",
    "area": "Dhaka",
    "lat": 23.80708573747494,
    "lng": 90.4115204372879
  },
  {
    "name_en": "Joydebpur",
    "name_bn": "Joydebpur",
    "area": "Dhaka",
    "lat": 23.834589297525998,
    "lng": 90.38862675734316
  },
  {
    "name_en": "Jurain",
    "name_bn": "Jurain",
    "area": "Dhaka",
    "lat": 23.79942839707469,
    "lng": 90.43200221467517
  },
  {
    "name_en": "Kachukhet",
    "name_bn": "Kachukhet",
    "area": "Dhaka",
    "lat": 23.788825476006608,
    "lng": 90.4176876391134
  },
  {
    "name_en": "Kadamtali",
    "name_bn": "Kadamtali",
    "area": "Dhaka",
    "lat": 23.82414267393414,
    "lng": 90.40157586979348
  },
  {
    "name_en": "Kajipara",
    "name_bn": "Kajipara",
    "area": "Dhaka",
    "lat": 23.821323027979357,
    "lng": 90.4348888636276
  },
  {
    "name_en": "Kakali",
    "name_bn": "Kakali",
    "area": "Dhaka",
    "lat": 23.797071872420297,
    "lng": 90.41223785095609
  },
  {
    "name_en": "Kakrail",
    "name_bn": "Kakrail",
    "area": "Dhaka",
    "lat": 23.805956527094164,
    "lng": 90.41325291145334
  },
  {
    "name_en": "Kalabagan",
    "name_bn": "Kalabagan",
    "area": "Dhaka",
    "lat": 23.81289846689493,
    "lng": 90.43438463207818
  },
  {
    "name_en": "Kalabagan City College",
    "name_bn": "Kalabagan City College",
    "area": "Dhaka",
    "lat": 23.799077364692508,
    "lng": 90.42517402447724
  },
  {
    "name_en": "Kalampur",
    "name_bn": "Kalampur",
    "area": "Dhaka",
    "lat": 23.822062507128088,
    "lng": 90.40667475534008
  },
  {
    "name_en": "Kallyanpur",
    "name_bn": "Kallyanpur",
    "area": "Dhaka",
    "lat": 23.802171872741447,
    "lng": 90.42528734778081
  },
  {
    "name_en": "Kalshi",
    "name_bn": "Kalshi",
    "area": "Dhaka",
    "lat": 23.81119849279057,
    "lng": 90.40470169852375
  },
  {
    "name_en": "Kalshi Pallabi",
    "name_bn": "Kalshi Pallabi",
    "area": "Dhaka",
    "lat": 23.832580998123415,
    "lng": 90.43056866802544
  },
  {
    "name_en": "Kamalapur",
    "name_bn": "Kamalapur",
    "area": "Dhaka",
    "lat": 23.83449742246737,
    "lng": 90.405829837796
  },
  {
    "name_en": "Kamarpara",
    "name_bn": "Kamarpara",
    "area": "Dhaka",
    "lat": 23.829449227538433,
    "lng": 90.43256750911065
  },
  {
    "name_en": "Kamlapur",
    "name_bn": "Kamlapur",
    "area": "Dhaka",
    "lat": 23.827953685036086,
    "lng": 90.41626309565268
  },
  {
    "name_en": "Kamrangirchar",
    "name_bn": "Kamrangirchar",
    "area": "Dhaka",
    "lat": 23.8161433213091,
    "lng": 90.42627283083353
  },
  {
    "name_en": "Kanchan Bridge",
    "name_bn": "Kanchan Bridge",
    "area": "Dhaka",
    "lat": 23.798054810465,
    "lng": 90.41675246399937
  },
  {
    "name_en": "Kanchpur",
    "name_bn": "Kanchpur",
    "area": "Dhaka",
    "lat": 23.83029600052163,
    "lng": 90.38967115564093
  },
  {
    "name_en": "Karwan Bazar",
    "name_bn": "Karwan Bazar",
    "area": "Dhaka",
    "lat": 23.79560846745081,
    "lng": 90.41074105671476
  },
  {
    "name_en": "Kashimpur",
    "name_bn": "Kashimpur",
    "area": "Dhaka",
    "lat": 23.825330846344247,
    "lng": 90.43476803470482
  },
  {
    "name_en": "Katabon",
    "name_bn": "Katabon",
    "area": "Dhaka",
    "lat": 23.790246173160444,
    "lng": 90.43240844641679
  },
  {
    "name_en": "Kazipara",
    "name_bn": "Kazipara",
    "area": "Dhaka",
    "lat": 23.825140610122244,
    "lng": 90.40279330239505
  },
  {
    "name_en": "Kazipara Shewrapara",
    "name_bn": "Kazipara Shewrapara",
    "area": "Dhaka",
    "lat": 23.800713271155278,
    "lng": 90.4276148009525
  },
  {
    "name_en": "Kazla",
    "name_bn": "Kazla",
    "area": "Dhaka",
    "lat": 23.823464176068672,
    "lng": 90.39459105828533
  },
  {
    "name_en": "Keraniganj",
    "name_bn": "Keraniganj",
    "area": "Dhaka",
    "lat": 23.811716673520753,
    "lng": 90.40312563150785
  },
  {
    "name_en": "Khamar Bari",
    "name_bn": "Khamar Bari",
    "area": "Dhaka",
    "lat": 23.80123219951781,
    "lng": 90.39121214194637
  },
  {
    "name_en": "Khamar Bari Farmgate",
    "name_bn": "Khamar Bari Farmgate",
    "area": "Dhaka",
    "lat": 23.800347532683098,
    "lng": 90.43082781145021
  },
  {
    "name_en": "Khilgaon",
    "name_bn": "Khilgaon",
    "area": "Dhaka",
    "lat": 23.793115740836104,
    "lng": 90.43338244630084
  },
  {
    "name_en": "Khilgaon Flyover",
    "name_bn": "Khilgaon Flyover",
    "area": "Dhaka",
    "lat": 23.808675390219896,
    "lng": 90.4128857321277
  },
  {
    "name_en": "Khilgaon Khidma Hospital",
    "name_bn": "Khilgaon Khidma Hospital",
    "area": "Dhaka",
    "lat": 23.82977677186544,
    "lng": 90.43437235685393
  },
  {
    "name_en": "Khilkhet",
    "name_bn": "Khilkhet",
    "area": "Dhaka",
    "lat": 23.788911255395785,
    "lng": 90.4073326265449
  },
  {
    "name_en": "Kolabagan",
    "name_bn": "Kolabagan",
    "area": "Dhaka",
    "lat": 23.808365829322035,
    "lng": 90.38978129085716
  },
  {
    "name_en": "Konabari",
    "name_bn": "Konabari",
    "area": "Dhaka",
    "lat": 23.807822884954376,
    "lng": 90.42198036183737
  },
  {
    "name_en": "Kuchimura",
    "name_bn": "Kuchimura",
    "area": "Dhaka",
    "lat": 23.809566318974433,
    "lng": 90.39990015597513
  },
  {
    "name_en": "Kuril  Bishwa Road",
    "name_bn": "Kuril  Bishwa Road",
    "area": "Dhaka",
    "lat": 23.797058151637422,
    "lng": 90.40959846643767
  },
  {
    "name_en": "Kuril Bissho Road",
    "name_bn": "Kuril Bissho Road",
    "area": "Dhaka",
    "lat": 23.78899016155488,
    "lng": 90.39774391259297
  },
  {
    "name_en": "Kuril Chourasta",
    "name_bn": "Kuril Chourasta",
    "area": "Dhaka",
    "lat": 23.817834733415186,
    "lng": 90.40461095435265
  },
  {
    "name_en": "Kuril Flyover",
    "name_bn": "Kuril Flyover",
    "area": "Dhaka",
    "lat": 23.820038709051865,
    "lng": 90.38993385383377
  },
  {
    "name_en": "MES",
    "name_bn": "MES",
    "area": "Dhaka",
    "lat": 23.794898455125352,
    "lng": 90.4166986683425
  },
  {
    "name_en": "Madanpur",
    "name_bn": "Madanpur",
    "area": "Dhaka",
    "lat": 23.790875518142727,
    "lng": 90.40635633416238
  },
  {
    "name_en": "Madhya Badda",
    "name_bn": "Madhya Badda",
    "area": "Dhaka",
    "lat": 23.817526943061775,
    "lng": 90.43611673259599
  },
  {
    "name_en": "Malibagh",
    "name_bn": "Malibagh",
    "area": "Dhaka",
    "lat": 23.813564336599033,
    "lng": 90.43718635193586
  },
  {
    "name_en": "Malibagh Moor",
    "name_bn": "Malibagh Moor",
    "area": "Dhaka",
    "lat": 23.83190212696255,
    "lng": 90.40094114141966
  },
  {
    "name_en": "Malibagh Railgate",
    "name_bn": "Malibagh Railgate",
    "area": "Dhaka",
    "lat": 23.802645839424898,
    "lng": 90.411159517738
  },
  {
    "name_en": "Manik Mia Avenue",
    "name_bn": "Manik Mia Avenue",
    "area": "Dhaka",
    "lat": 23.801633594599235,
    "lng": 90.436625002721
  },
  {
    "name_en": "Manik Nagar",
    "name_bn": "Manik Nagar",
    "area": "Dhaka",
    "lat": 23.800173235766135,
    "lng": 90.39309195082193
  },
  {
    "name_en": "Manikganj",
    "name_bn": "Manikganj",
    "area": "Dhaka",
    "lat": 23.834644537689755,
    "lng": 90.42548251232343
  },
  {
    "name_en": "Maowa",
    "name_bn": "Maowa",
    "area": "Dhaka",
    "lat": 23.814439628605438,
    "lng": 90.43445788947665
  },
  {
    "name_en": "Matsya Bhaban",
    "name_bn": "Matsya Bhaban",
    "area": "Dhaka",
    "lat": 23.80603460853319,
    "lng": 90.42619574881054
  },
  {
    "name_en": "Matuail",
    "name_bn": "Matuail",
    "area": "Dhaka",
    "lat": 23.796410505946692,
    "lng": 90.39085172377133
  },
  {
    "name_en": "Mazar Road",
    "name_bn": "Mazar Road",
    "area": "Dhaka",
    "lat": 23.792506994601954,
    "lng": 90.43589444612233
  },
  {
    "name_en": "Meghna Ghat",
    "name_bn": "Meghna Ghat",
    "area": "Dhaka",
    "lat": 23.83195317679727,
    "lng": 90.43437156656015
  },
  {
    "name_en": "Merul",
    "name_bn": "Merul",
    "area": "Dhaka",
    "lat": 23.825509482912306,
    "lng": 90.43030285222946
  },
  {
    "name_en": "Metro Hall",
    "name_bn": "Metro Hall",
    "area": "Dhaka",
    "lat": 23.804703734561734,
    "lng": 90.41516046649495
  },
  {
    "name_en": "Mill Gate",
    "name_bn": "Mill Gate",
    "area": "Dhaka",
    "lat": 23.79853792741175,
    "lng": 90.43664189702278
  },
  {
    "name_en": "Mirpur 1",
    "name_bn": "Mirpur 1",
    "area": "Dhaka",
    "lat": 23.79755778773939,
    "lng": 90.42683972148689
  },
  {
    "name_en": "Mirpur 10",
    "name_bn": "Mirpur 10",
    "area": "Dhaka",
    "lat": 23.8254341511596,
    "lng": 90.38940945299848
  },
  {
    "name_en": "Mirpur 11",
    "name_bn": "Mirpur 11",
    "area": "Dhaka",
    "lat": 23.821039263572594,
    "lng": 90.38796021783213
  },
  {
    "name_en": "Mirpur 12",
    "name_bn": "Mirpur 12",
    "area": "Dhaka",
    "lat": 23.83423167796845,
    "lng": 90.4350264253918
  },
  {
    "name_en": "Mirpur 13",
    "name_bn": "Mirpur 13",
    "area": "Dhaka",
    "lat": 23.830929023767535,
    "lng": 90.42199606099945
  },
  {
    "name_en": "Mirpur 14",
    "name_bn": "Mirpur 14",
    "area": "Dhaka",
    "lat": 23.82093374242381,
    "lng": 90.40075747531515
  },
  {
    "name_en": "Mirpur 2",
    "name_bn": "Mirpur 2",
    "area": "Dhaka",
    "lat": 23.81397176773415,
    "lng": 90.43308563959526
  },
  {
    "name_en": "Mirpur 2 Mirpur 10",
    "name_bn": "Mirpur 2 Mirpur 10",
    "area": "Dhaka",
    "lat": 23.79502635919226,
    "lng": 90.38866869130445
  },
  {
    "name_en": "Mirpur DOHS",
    "name_bn": "Mirpur DOHS",
    "area": "Dhaka",
    "lat": 23.804593107626495,
    "lng": 90.41716006959034
  },
  {
    "name_en": "Mirpur Sony Cinema Hall",
    "name_bn": "Mirpur Sony Cinema Hall",
    "area": "Dhaka",
    "lat": 23.80047162157016,
    "lng": 90.40765220367723
  },
  {
    "name_en": "Mitford Ghat",
    "name_bn": "Mitford Ghat",
    "area": "Dhaka",
    "lat": 23.82150112286533,
    "lng": 90.41741569804427
  },
  {
    "name_en": "Mogbazar",
    "name_bn": "Mogbazar",
    "area": "Dhaka",
    "lat": 23.799846831930815,
    "lng": 90.40009788022888
  },
  {
    "name_en": "Mogbazar Mohakhali",
    "name_bn": "Mogbazar Mohakhali",
    "area": "Dhaka",
    "lat": 23.835081638106956,
    "lng": 90.38753255452716
  },
  {
    "name_en": "Mohakhali",
    "name_bn": "Mohakhali",
    "area": "Dhaka",
    "lat": 23.80723419669116,
    "lng": 90.42809741943464
  },
  {
    "name_en": "Mohammadpur",
    "name_bn": "Mohammadpur",
    "area": "Dhaka",
    "lat": 23.80304548229999,
    "lng": 90.43412875225167
  },
  {
    "name_en": "Motijheel",
    "name_bn": "Motijheel",
    "area": "Dhaka",
    "lat": 23.78715692752492,
    "lng": 90.39478702401861
  },
  {
    "name_en": "Motsho Bhaban",
    "name_bn": "Motsho Bhaban",
    "area": "Dhaka",
    "lat": 23.801328639647977,
    "lng": 90.40600189068107
  },
  {
    "name_en": "Mouchak",
    "name_bn": "Mouchak",
    "area": "Dhaka",
    "lat": 23.79898021542741,
    "lng": 90.39406432046488
  },
  {
    "name_en": "Mugdapara",
    "name_bn": "Mugdapara",
    "area": "Dhaka",
    "lat": 23.812874681740915,
    "lng": 90.40728090875656
  },
  {
    "name_en": "Nabisco",
    "name_bn": "Nabisco",
    "area": "Dhaka",
    "lat": 23.803333735180217,
    "lng": 90.42729780047246
  },
  {
    "name_en": "Nadda",
    "name_bn": "Nadda",
    "area": "Dhaka",
    "lat": 23.822249361365344,
    "lng": 90.39982614689374
  },
  {
    "name_en": "Nandan Park",
    "name_bn": "Nandan Park",
    "area": "Dhaka",
    "lat": 23.82399202295685,
    "lng": 90.41594277863975
  },
  {
    "name_en": "Narshinghapur",
    "name_bn": "Narshinghapur",
    "area": "Dhaka",
    "lat": 23.802559604108794,
    "lng": 90.4336716124228
  },
  {
    "name_en": "Nawabganj",
    "name_bn": "Nawabganj",
    "area": "Dhaka",
    "lat": 23.832508507488356,
    "lng": 90.42800758971617
  },
  {
    "name_en": "Naya Bazar",
    "name_bn": "Naya Bazar",
    "area": "Dhaka",
    "lat": 23.82153524660028,
    "lng": 90.41897195944765
  },
  {
    "name_en": "New Market",
    "name_bn": "New Market",
    "area": "Dhaka",
    "lat": 23.825492769966765,
    "lng": 90.39308599495433
  },
  {
    "name_en": "New Market Nilkhet",
    "name_bn": "New Market Nilkhet",
    "area": "Dhaka",
    "lat": 23.82217680618892,
    "lng": 90.40752383933463
  },
  {
    "name_en": "Nila Market",
    "name_bn": "Nila Market",
    "area": "Dhaka",
    "lat": 23.821365980114155,
    "lng": 90.39200671783752
  },
  {
    "name_en": "Nilkhet",
    "name_bn": "Nilkhet",
    "area": "Dhaka",
    "lat": 23.787621896803223,
    "lng": 90.4331900474876
  },
  {
    "name_en": "Nimtola",
    "name_bn": "Nimtola",
    "area": "Dhaka",
    "lat": 23.789356101822936,
    "lng": 90.40234334894537
  },
  {
    "name_en": "Nobinagar",
    "name_bn": "Nobinagar",
    "area": "Dhaka",
    "lat": 23.80437519843817,
    "lng": 90.42849801172831
  },
  {
    "name_en": "Nobinagar Baipayl",
    "name_bn": "Nobinagar Baipayl",
    "area": "Dhaka",
    "lat": 23.803990919502116,
    "lng": 90.41184582679968
  },
  {
    "name_en": "Nobinagar Chandra",
    "name_bn": "Nobinagar Chandra",
    "area": "Dhaka",
    "lat": 23.820919941849642,
    "lng": 90.41946299917468
  },
  {
    "name_en": "Notun Bazar",
    "name_bn": "Notun Bazar",
    "area": "Dhaka",
    "lat": 23.79900138721249,
    "lng": 90.42077704854024
  },
  {
    "name_en": "Old Airport",
    "name_bn": "Old Airport",
    "area": "Dhaka",
    "lat": 23.80288705802036,
    "lng": 90.43516430864999
  },
  {
    "name_en": "Palashi",
    "name_bn": "Palashi",
    "area": "Dhaka",
    "lat": 23.834707788062556,
    "lng": 90.39100159465022
  },
  {
    "name_en": "Pallabi",
    "name_bn": "Pallabi",
    "area": "Dhaka",
    "lat": 23.829844702978924,
    "lng": 90.3961553862708
  },
  {
    "name_en": "Palli Bidyut",
    "name_bn": "Palli Bidyut",
    "area": "Dhaka",
    "lat": 23.8044131333263,
    "lng": 90.40359085872564
  },
  {
    "name_en": "Paltan",
    "name_bn": "Paltan",
    "area": "Dhaka",
    "lat": 23.802305124051642,
    "lng": 90.39318075236874
  },
  {
    "name_en": "Panthapath",
    "name_bn": "Panthapath",
    "area": "Dhaka",
    "lat": 23.797128610080815,
    "lng": 90.41299911521094
  },
  {
    "name_en": "Panthopoth",
    "name_bn": "Panthopoth",
    "area": "Dhaka",
    "lat": 23.81057772335867,
    "lng": 90.42824661628086
  },
  {
    "name_en": "Paturia",
    "name_bn": "Paturia",
    "area": "Dhaka",
    "lat": 23.8244268885148,
    "lng": 90.4302599356078
  },
  {
    "name_en": "Police Plaza",
    "name_bn": "Police Plaza",
    "area": "Dhaka",
    "lat": 23.785517777948215,
    "lng": 90.42958849101682
  },
  {
    "name_en": "Postagola",
    "name_bn": "Postagola",
    "area": "Dhaka",
    "lat": 23.808294855880913,
    "lng": 90.4175821853977
  },
  {
    "name_en": "Press Club",
    "name_bn": "Press Club",
    "area": "Dhaka",
    "lat": 23.797942643950314,
    "lng": 90.41088306114611
  },
  {
    "name_en": "Press Club  Paltan",
    "name_bn": "Press Club  Paltan",
    "area": "Dhaka",
    "lat": 23.829541969788583,
    "lng": 90.41707364326203
  },
  {
    "name_en": "Proshika Moor",
    "name_bn": "Proshika Moor",
    "area": "Dhaka",
    "lat": 23.789697436311222,
    "lng": 90.43400088809402
  },
  {
    "name_en": "Purobi",
    "name_bn": "Purobi",
    "area": "Dhaka",
    "lat": 23.791484350867982,
    "lng": 90.41322872904193
  },
  {
    "name_en": "Purobi Pallabi",
    "name_bn": "Purobi Pallabi",
    "area": "Dhaka",
    "lat": 23.819060316315674,
    "lng": 90.40675974073795
  },
  {
    "name_en": "Rajarbag",
    "name_bn": "Rajarbag",
    "area": "Dhaka",
    "lat": 23.806410472882355,
    "lng": 90.4088051878757
  },
  {
    "name_en": "Rajendrapur",
    "name_bn": "Rajendrapur",
    "area": "Dhaka",
    "lat": 23.82741691521666,
    "lng": 90.43312642171927
  },
  {
    "name_en": "Rajlakshmi",
    "name_bn": "Rajlakshmi",
    "area": "Dhaka",
    "lat": 23.83045912442138,
    "lng": 90.42496171410606
  },
  {
    "name_en": "Rajlakshmi House Building",
    "name_bn": "Rajlakshmi House Building",
    "area": "Dhaka",
    "lat": 23.790301743169934,
    "lng": 90.42790246253227
  },
  {
    "name_en": "Rampura Bazar",
    "name_bn": "Rampura Bazar",
    "area": "Dhaka",
    "lat": 23.798640554084642,
    "lng": 90.42732973251222
  },
  {
    "name_en": "Rampura Bridge",
    "name_bn": "Rampura Bridge",
    "area": "Dhaka",
    "lat": 23.786754416122765,
    "lng": 90.40778763692951
  },
  {
    "name_en": "Ray Saheb Bazar",
    "name_bn": "Ray Saheb Bazar",
    "area": "Dhaka",
    "lat": 23.789452348403263,
    "lng": 90.43412211304906
  },
  {
    "name_en": "Ray Shaheb Bazar",
    "name_bn": "Ray Shaheb Bazar",
    "area": "Dhaka",
    "lat": 23.828661157855716,
    "lng": 90.4065317475787
  },
  {
    "name_en": "Rayer Bazar",
    "name_bn": "Rayer Bazar",
    "area": "Dhaka",
    "lat": 23.817208029973898,
    "lng": 90.41174090947482
  },
  {
    "name_en": "Rayerbag",
    "name_bn": "Rayerbag",
    "area": "Dhaka",
    "lat": 23.8195070784508,
    "lng": 90.4363462934541
  },
  {
    "name_en": "Ring Road",
    "name_bn": "Ring Road",
    "area": "Dhaka",
    "lat": 23.818122072441252,
    "lng": 90.4160694226708
  },
  {
    "name_en": "Rupnagar",
    "name_bn": "Rupnagar",
    "area": "Dhaka",
    "lat": 23.81742184082337,
    "lng": 90.39974310418178
  },
  {
    "name_en": "Rupnagar Abashik",
    "name_bn": "Rupnagar Abashik",
    "area": "Dhaka",
    "lat": 23.7898290205142,
    "lng": 90.4268361620832
  },
  {
    "name_en": "Sadarghat",
    "name_bn": "Sadarghat",
    "area": "Dhaka",
    "lat": 23.83201757932294,
    "lng": 90.40765631351134
  },
  {
    "name_en": "Sainik Club",
    "name_bn": "Sainik Club",
    "area": "Dhaka",
    "lat": 23.817996921737276,
    "lng": 90.42504265309364
  },
  {
    "name_en": "Salimullah Road",
    "name_bn": "Salimullah Road",
    "area": "Dhaka",
    "lat": 23.787935153619003,
    "lng": 90.40633809373766
  },
  {
    "name_en": "Sanarpar",
    "name_bn": "Sanarpar",
    "area": "Dhaka",
    "lat": 23.816721833064776,
    "lng": 90.42660875340648
  },
  {
    "name_en": "Sat rasta",
    "name_bn": "Sat rasta",
    "area": "Dhaka",
    "lat": 23.80173507622579,
    "lng": 90.41461517863911
  },
  {
    "name_en": "Saudi Colony",
    "name_bn": "Saudi Colony",
    "area": "Dhaka",
    "lat": 23.830159631251863,
    "lng": 90.40609942786982
  },
  {
    "name_en": "Savar",
    "name_bn": "Savar",
    "area": "Dhaka",
    "lat": 23.80048984416773,
    "lng": 90.42081576419119
  },
  {
    "name_en": "Savar Cantonment",
    "name_bn": "Savar Cantonment",
    "area": "Dhaka",
    "lat": 23.79639075470874,
    "lng": 90.41552530594984
  },
  {
    "name_en": "Sayedabad",
    "name_bn": "Sayedabad",
    "area": "Dhaka",
    "lat": 23.834031930884628,
    "lng": 90.41092041137354
  },
  {
    "name_en": "Science Lab",
    "name_bn": "Science Lab",
    "area": "Dhaka",
    "lat": 23.811060495978193,
    "lng": 90.43237714212813
  },
  {
    "name_en": "Shahbag",
    "name_bn": "Shahbag",
    "area": "Dhaka",
    "lat": 23.832503276109932,
    "lng": 90.40487560808229
  },
  {
    "name_en": "Shahjadpur",
    "name_bn": "Shahjadpur",
    "area": "Dhaka",
    "lat": 23.815996262150257,
    "lng": 90.43677035704309
  },
  {
    "name_en": "Shanir Akhra",
    "name_bn": "Shanir Akhra",
    "area": "Dhaka",
    "lat": 23.834235619646115,
    "lng": 90.39131746341634
  },
  {
    "name_en": "Shankar",
    "name_bn": "Shankar",
    "area": "Dhaka",
    "lat": 23.818461367494766,
    "lng": 90.4225329818463
  },
  {
    "name_en": "Shantinagar",
    "name_bn": "Shantinagar",
    "area": "Dhaka",
    "lat": 23.82459707304672,
    "lng": 90.42456884849014
  },
  {
    "name_en": "Shewra",
    "name_bn": "Shewra",
    "area": "Dhaka",
    "lat": 23.814045823535803,
    "lng": 90.41518949650074
  },
  {
    "name_en": "Shewrapara",
    "name_bn": "Shewrapara",
    "area": "Dhaka",
    "lat": 23.78785106733886,
    "lng": 90.43148413528617
  },
  {
    "name_en": "Shia Mosque",
    "name_bn": "Shia Mosque",
    "area": "Dhaka",
    "lat": 23.8296424705232,
    "lng": 90.41242319637978
  },
  {
    "name_en": "Shib Bari",
    "name_bn": "Shib Bari",
    "area": "Dhaka",
    "lat": 23.786108010080127,
    "lng": 90.43151236537228
  },
  {
    "name_en": "Shibu Market",
    "name_bn": "Shibu Market",
    "area": "Dhaka",
    "lat": 23.788518364460817,
    "lng": 90.42068736759889
  },
  {
    "name_en": "Shimultola",
    "name_bn": "Shimultola",
    "area": "Dhaka",
    "lat": 23.78820021727051,
    "lng": 90.42939545776929
  },
  {
    "name_en": "Shishu Mela",
    "name_bn": "Shishu Mela",
    "area": "Dhaka",
    "lat": 23.825599320734373,
    "lng": 90.38801468672376
  },
  {
    "name_en": "Shiyal Bari",
    "name_bn": "Shiyal Bari",
    "area": "Dhaka",
    "lat": 23.823796166698898,
    "lng": 90.39071609880303
  },
  {
    "name_en": "Shonbari Sreenagar",
    "name_bn": "Shonbari Sreenagar",
    "area": "Dhaka",
    "lat": 23.823358907345312,
    "lng": 90.41565070307207
  },
  {
    "name_en": "Shonir Akhra",
    "name_bn": "Shonir Akhra",
    "area": "Dhaka",
    "lat": 23.790983519316203,
    "lng": 90.4108976422565
  },
  {
    "name_en": "Showari Ghat",
    "name_bn": "Showari Ghat",
    "area": "Dhaka",
    "lat": 23.818813234585193,
    "lng": 90.41348533242332
  },
  {
    "name_en": "Shukrabad",
    "name_bn": "Shukrabad",
    "area": "Dhaka",
    "lat": 23.812856999916548,
    "lng": 90.43111084186792
  },
  {
    "name_en": "Shyamoli",
    "name_bn": "Shyamoli",
    "area": "Dhaka",
    "lat": 23.816498697115446,
    "lng": 90.4285941813741
  },
  {
    "name_en": "Sign Board",
    "name_bn": "Sign Board",
    "area": "Dhaka",
    "lat": 23.82048995032557,
    "lng": 90.41112511825622
  },
  {
    "name_en": "Signal",
    "name_bn": "Signal",
    "area": "Dhaka",
    "lat": 23.786276787736902,
    "lng": 90.39377568582606
  },
  {
    "name_en": "Sikder Medical College",
    "name_bn": "Sikder Medical College",
    "area": "Dhaka",
    "lat": 23.818744938392225,
    "lng": 90.40629956674219
  },
  {
    "name_en": "Sony CInema Hall",
    "name_bn": "Sony CInema Hall",
    "area": "Dhaka",
    "lat": 23.793247205840622,
    "lng": 90.40589814239088
  },
  {
    "name_en": "Sony Cenema Hall",
    "name_bn": "Sony Cenema Hall",
    "area": "Dhaka",
    "lat": 23.825241559592477,
    "lng": 90.38781527027454
  },
  {
    "name_en": "Sony Cinema Hall Mirpur 1",
    "name_bn": "Sony Cinema Hall Mirpur 1",
    "area": "Dhaka",
    "lat": 23.83194189898932,
    "lng": 90.42180099638173
  },
  {
    "name_en": "South Banasree",
    "name_bn": "South Banasree",
    "area": "Dhaka",
    "lat": 23.8200566958667,
    "lng": 90.40438152719341
  },
  {
    "name_en": "Sreepur",
    "name_bn": "Sreepur",
    "area": "Dhaka",
    "lat": 23.80625726460319,
    "lng": 90.43448883774023
  },
  {
    "name_en": "Staff Road",
    "name_bn": "Staff Road",
    "area": "Dhaka",
    "lat": 23.817554989421666,
    "lng": 90.43065401635272
  },
  {
    "name_en": "Star Kabab",
    "name_bn": "Star Kabab",
    "area": "Dhaka",
    "lat": 23.789767740259897,
    "lng": 90.42118080496724
  },
  {
    "name_en": "Station Road",
    "name_bn": "Station Road",
    "area": "Dhaka",
    "lat": 23.83293921073792,
    "lng": 90.39809114582908
  },
  {
    "name_en": "Sura Bari",
    "name_bn": "Sura Bari",
    "area": "Dhaka",
    "lat": 23.788178879276856,
    "lng": 90.40415487544983
  },
  {
    "name_en": "TT Para",
    "name_bn": "TT Para",
    "area": "Dhaka",
    "lat": 23.83400303651884,
    "lng": 90.40494817470426
  },
  {
    "name_en": "Tajmahal Road",
    "name_bn": "Tajmahal Road",
    "area": "Dhaka",
    "lat": 23.797105239982706,
    "lng": 90.41609556654693
  },
  {
    "name_en": "Taltola",
    "name_bn": "Taltola",
    "area": "Dhaka",
    "lat": 23.835160968098805,
    "lng": 90.42621822159539
  },
  {
    "name_en": "Tarabo",
    "name_bn": "Tarabo",
    "area": "Dhaka",
    "lat": 23.80791423046562,
    "lng": 90.43582009232068
  },
  {
    "name_en": "Technical",
    "name_bn": "Technical",
    "area": "Dhaka",
    "lat": 23.788282285896205,
    "lng": 90.4004987521722
  },
  {
    "name_en": "Tikatuli",
    "name_bn": "Tikatuli",
    "area": "Dhaka",
    "lat": 23.81304932244456,
    "lng": 90.42513393192073
  },
  {
    "name_en": "Tolarbag",
    "name_bn": "Tolarbag",
    "area": "Dhaka",
    "lat": 23.785341236321905,
    "lng": 90.3956328625145
  },
  {
    "name_en": "Tongi",
    "name_bn": "Tongi",
    "area": "Dhaka",
    "lat": 23.827127273361757,
    "lng": 90.41549333596696
  },
  {
    "name_en": "Uttar Badda",
    "name_bn": "Uttar Badda",
    "area": "Dhaka",
    "lat": 23.79069899027936,
    "lng": 90.42095720320309
  },
  {
    "name_en": "Vashantek",
    "name_bn": "Vashantek",
    "area": "Dhaka",
    "lat": 23.818722613794982,
    "lng": 90.39934548281495
  },
  {
    "name_en": "Victoria Park",
    "name_bn": "Victoria Park",
    "area": "Dhaka",
    "lat": 23.80830136020619,
    "lng": 90.41932905864856
  },
  {
    "name_en": "Vulta",
    "name_bn": "Vulta",
    "area": "Dhaka",
    "lat": 23.820735547734674,
    "lng": 90.41987733064137
  },
  {
    "name_en": "Wireless",
    "name_bn": "Wireless",
    "area": "Dhaka",
    "lat": 23.824113733078356,
    "lng": 90.39594953228358
  },
  {
    "name_en": "Workshop",
    "name_bn": "Workshop",
    "area": "Dhaka",
    "lat": 23.795775998193623,
    "lng": 90.42958744041654
  },
  {
    "name_en": "Zia Uddyan",
    "name_bn": "Zia Uddyan",
    "area": "Dhaka",
    "lat": 23.793985861869075,
    "lng": 90.43603922136838
  },
  {
    "name_en": "Zirabo",
    "name_bn": "Zirabo",
    "area": "Dhaka",
    "lat": 23.81624432527604,
    "lng": 90.41181369485768
  },
  {
    "name_en": "Zirani Bazar",
    "name_bn": "Zirani Bazar",
    "area": "Dhaka",
    "lat": 23.813499889940285,
    "lng": 90.39156067950718
  }
];
export const SEED_BUSES: Omit<Bus, 'id'>[] = [
  {
    "name": "Achim Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service(Check System)"
  },
  {
    "name": "Agradut",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Airport Bangabandhu Avenue",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Azmeri Glory",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Akash Enterprise",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Akik",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Al Makka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Al Madina Plus One",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Alif",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Alif",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Alif",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Alif",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Anabil Super",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Sitting Service(Check System)"
  },
  {
    "name": "Arnob",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Ashirbad Pahibahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Ashulia Classic",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Asmani",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "ATCL",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Ayat",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "Bahon",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service (Check System)"
  },
  {
    "name": "Baishakhi",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Balaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "Basumati",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Basumati Transport",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Best Satabdi AC",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Best Transport",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Bhuiyan Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Bihanga",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Bikalpa Bus Auto Service",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "Bikalpa Bus City Super Service",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "Bikash",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "Bikash Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "Bondhu Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Borak",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "Bashumoti",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "BRTC",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "BRTC",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "BRTC",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "BRTC",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "BRTC",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "BRTC",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "BRTC",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "BRTC",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "BRTC",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "BRTC Articulated",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "Cantonment",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Cantonment Mini Service",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Champion",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "City Link",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "D Link",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "D One Transport",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Deepan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Desh Bangla",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Dewan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Dhakar Chaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Sitting Service(Ticket System)"
  },
  {
    "name": "Dhakar Chaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Sitting Service(Ticket System)"
  },
  {
    "name": "Dipon",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Dip Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Dishari",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "ETC",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "ETC Transport",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Sitting Service"
  },
  {
    "name": "Everest Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "First Ten",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "FTCL",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "FTCL",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Gazipur Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Half-Sitting Service"
  },
  {
    "name": "Grameen",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Green Anabil",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Half-Sitting Service"
  },
  {
    "name": "Green Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Sitting Service(Ticket System)"
  },
  {
    "name": "Gulshan Chaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Sitting Service(Ticket System)"
  },
  {
    "name": "Hazi Transport",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Himachal",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Himachal Suveccha",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Himalay",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Half-Sitting Service"
  },
  {
    "name": "Itihash",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Jabale Noor Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Half-Sitting Service"
  },
  {
    "name": "Jabale Noor Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Half-Sitting Service"
  },
  {
    "name": "Kamal Plus Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "kanak",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Khajababa",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Kironmala Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service"
  },
  {
    "name": "Labbayek",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Sitting Service(Check System)"
  },
  {
    "name": "Lal Sabuj",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Sitting Service"
  },
  {
    "name": "Lams Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Malancha",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Manjil Express",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Meghla Transport",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Meshkat",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Midline",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service(Check System)"
  },
  {
    "name": "Mirpur Metro Services",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Mirpur Link",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Mirpur Mission",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Mirpur United Service",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "MM Lovely",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Sitting Service(Check System)"
  },
  {
    "name": "Modhumita",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Mohona",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Moitri",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Moumita",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "MTCL-2",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Nur E Makka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Sitting Service(Check System)"
  },
  {
    "name": "New Vision Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Nilachol Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Omama International",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Pallabi Super",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Paristhan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Prattay",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Prochesta",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Projapati",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Provati Banasree",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Purbachol Logistics and Transport",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Raida Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Sitting Service(Check System)"
  },
  {
    "name": "Raja City Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Rajanigandha Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Rajdhani Super Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Ramjan Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Robrob Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Rupa Paribahan Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Safety Druti",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Sakalpa Transport",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Salsabil",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Savar Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Shadhin",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Shadhin Express",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Shahria Enterprise",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Shatabdi",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Shikhor Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Shikhor Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Suveccha",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Suvojatra Bus",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Siam Transport",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Skyline",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Super",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Supravat",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Swajan Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Talukdar",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Tanjil Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Taranga Plus",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Tetulia",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Thikana",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Thikana Express",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Titas",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Transilva",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Trust Transport Services",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Trust Transport Services",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Trust Transport Services",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Trust Transport Services",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Victor Classic",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service(Check System)"
  },
  {
    "name": "Victor Paribahan",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "Semi-Sitting Service(Check System)"
  },
  {
    "name": "VIP 27",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Welcome",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "Winner",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "4 No. Alike Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "6 No. Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "6 No. Motijheel Banani Transport Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "7 No. Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  },
  {
    "name": "8 No. Dhaka",
    "operator": "Local Operator",
    "type": "Non-AC",
    "notes": "City Service"
  }
];
export const SEED_ROUTES: Omit<Route, 'id'>[] = [
  {
    "bus_id": 1,
    "start_stop_id": 81,
    "end_stop_id": 60,
    "fixed_fare": 100,
    "distance_km": 39.8,
    "stops_order": "[81,275,12,169,262,175,170,171,216,124,73,152,246,148,106,37,189,202,36,242,279,22,154,166,223,29,60]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 2,
    "start_stop_id": 237,
    "end_stop_id": 202,
    "fixed_fare": 75,
    "distance_km": 30,
    "stops_order": "[237,96,11,81,275,123,258,252,8,285,42,102,182,283,90,23,36,242,279,202]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 3,
    "start_stop_id": 79,
    "end_stop_id": 3,
    "fixed_fare": 105,
    "distance_km": 42.6,
    "stops_order": "[79,87,80,207,213,97,162,241,31,132,77,42,102,182,49,232,28,118,267,152,246,148,144,9,110,220,19,98,3]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 4,
    "start_stop_id": 231,
    "end_stop_id": 50,
    "fixed_fare": 120,
    "distance_km": 48.2,
    "stops_order": "[231,224,193,87,80,207,119,245,156,186,188,182,232,28,118,267,152,246,148,144,9,110,220,19,98,3,278,269,168,44,84,146,50]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 5,
    "start_stop_id": 116,
    "end_stop_id": 278,
    "fixed_fare": 115,
    "distance_km": 46.8,
    "stops_order": "[116,138,21,193,87,80,207,119,245,156,186,157,95,222,223,166,22,242,36,202,189,37,106,148,144,9,110,220,19,98,3,278]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 6,
    "start_stop_id": 12,
    "end_stop_id": 279,
    "fixed_fare": 75,
    "distance_km": 28.6,
    "stops_order": "[12,169,262,175,170,171,216,124,73,152,246,148,106,37,189,202,36,242,279]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 7,
    "start_stop_id": 184,
    "end_stop_id": 169,
    "fixed_fare": 75,
    "distance_km": 30,
    "stops_order": "[184,89,80,207,119,245,156,186,180,188,182,49,118,28,73,124,216,170,175,169]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 8,
    "start_stop_id": 190,
    "end_stop_id": 126,
    "fixed_fare": 95,
    "distance_km": 38.4,
    "stops_order": "[190,287,24,199,237,96,11,81,275,123,258,252,56,16,139,77,132,31,241,97,213,207,80,89,184,126]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 9,
    "start_stop_id": 174,
    "end_stop_id": 190,
    "fixed_fare": 55,
    "distance_km": 21.6,
    "stops_order": "[174,170,175,263,169,164,146,229,40,43,17,286,76,190]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 10,
    "start_stop_id": 248,
    "end_stop_id": 29,
    "fixed_fare": 65,
    "distance_km": 25.8,
    "stops_order": "[248,108,4,258,252,8,285,42,102,182,283,90,23,154,166,223,29]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 11,
    "start_stop_id": 169,
    "end_stop_id": 29,
    "fixed_fare": 60,
    "distance_km": 24.4,
    "stops_order": "[169,175,170,135,247,8,42,102,182,283,90,23,154,166,223,29]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 12,
    "start_stop_id": 108,
    "end_stop_id": 3,
    "fixed_fare": 95,
    "distance_km": 38.4,
    "stops_order": "[108,228,4,258,252,8,285,42,203,102,182,49,232,118,28,267,152,246,148,144,9,110,220,19,98,3]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 13,
    "start_stop_id": 259,
    "end_stop_id": 85,
    "fixed_fare": 125,
    "distance_km": 49.6,
    "stops_order": "[259,255,111,239,187,35,141,157,95,222,223,166,22,279,242,36,202,189,37,106,148,144,9,110,220,19,98,3,278,269,168,44,84,85]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 14,
    "start_stop_id": 96,
    "end_stop_id": 60,
    "fixed_fare": 75,
    "distance_km": 30,
    "stops_order": "[96,11,81,275,123,258,252,8,285,42,102,182,283,90,23,154,166,223,29,60]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 15,
    "start_stop_id": 72,
    "end_stop_id": 20,
    "fixed_fare": 80,
    "distance_km": 31.4,
    "stops_order": "[72,230,253,215,175,169,12,275,123,258,252,56,16,65,257,66,120,55,194,197,20]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 16,
    "start_stop_id": 199,
    "end_stop_id": 235,
    "fixed_fare": 85,
    "distance_km": 34.2,
    "stops_order": "[199,24,105,76,286,18,127,3,98,19,220,110,9,144,148,246,152,118,28,49,182,188,235]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 17,
    "start_stop_id": 69,
    "end_stop_id": 153,
    "fixed_fare": 90,
    "distance_km": 35.6,
    "stops_order": "[69,3,98,19,220,110,9,144,148,106,37,189,202,36,242,279,22,154,166,223,29,60,274,153]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 18,
    "start_stop_id": 183,
    "end_stop_id": 15,
    "fixed_fare": 60,
    "distance_km": 23,
    "stops_order": "[183,16,257,121,240,134,39,241,162,97,213,207,80,89,15]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 19,
    "start_stop_id": 53,
    "end_stop_id": 126,
    "fixed_fare": 65,
    "distance_km": 25.8,
    "stops_order": "[53,262,175,170,135,247,273,8,139,77,132,31,180,186,156,218,126]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 20,
    "start_stop_id": 174,
    "end_stop_id": 141,
    "fixed_fare": 95,
    "distance_km": 38.4,
    "stops_order": "[174,170,175,169,12,30,275,58,123,258,16,65,67,240,134,241,97,213,207,57,184,13,128,187,35,141]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 21,
    "start_stop_id": 237,
    "end_stop_id": 202,
    "fixed_fare": 65,
    "distance_km": 25.8,
    "stops_order": "[237,96,11,81,275,123,258,252,8,42,102,182,90,23,36,279,202]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 22,
    "start_stop_id": 239,
    "end_stop_id": 85,
    "fixed_fare": 110,
    "distance_km": 44,
    "stops_order": "[239,159,271,126,156,186,180,235,188,182,49,28,118,267,152,246,148,144,9,110,220,19,98,3,278,269,168,44,84,85]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 23,
    "start_stop_id": 81,
    "end_stop_id": 161,
    "fixed_fare": 85,
    "distance_km": 32.8,
    "stops_order": "[81,275,123,258,252,56,16,158,139,77,132,32,162,97,213,207,80,87,193,21,138,161]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 24,
    "start_stop_id": 81,
    "end_stop_id": 85,
    "fixed_fare": 90,
    "distance_km": 35.6,
    "stops_order": "[81,169,262,175,170,171,216,124,73,152,246,148,144,9,110,220,19,98,3,278,269,168,44,85]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 25,
    "start_stop_id": 20,
    "end_stop_id": 71,
    "fixed_fare": 95,
    "distance_km": 38.4,
    "stops_order": "[20,197,194,55,120,66,65,139,77,102,182,49,232,28,118,267,152,246,148,144,9,110,220,19,98,71]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 26,
    "start_stop_id": 170,
    "end_stop_id": 111,
    "fixed_fare": 75,
    "distance_km": 30,
    "stops_order": "[170,135,247,273,8,139,77,132,31,241,162,97,213,207,80,89,184,100,239,111]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 27,
    "start_stop_id": 108,
    "end_stop_id": 3,
    "fixed_fare": 95,
    "distance_km": 38.4,
    "stops_order": "[108,228,4,258,252,8,285,42,203,102,182,49,232,118,28,267,152,246,148,144,9,110,220,19,98,3]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 28,
    "start_stop_id": 72,
    "end_stop_id": 231,
    "fixed_fare": 85,
    "distance_km": 34.2,
    "stops_order": "[72,205,216,171,170,117,247,273,8,139,77,132,31,241,185,97,213,207,80,87,193,225,231]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 29,
    "start_stop_id": 172,
    "end_stop_id": 184,
    "fixed_fare": 80,
    "distance_km": 31.4,
    "stops_order": "[172,205,216,171,169,135,247,273,8,42,77,132,31,241,162,97,213,207,80,89,184]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 30,
    "start_stop_id": 172,
    "end_stop_id": 61,
    "fixed_fare": 80,
    "distance_km": 31.4,
    "stops_order": "[172,205,216,171,170,135,247,273,8,258,252,56,16,65,66,120,55,194,197,20,61]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 31,
    "start_stop_id": 20,
    "end_stop_id": 127,
    "fixed_fare": 75,
    "distance_km": 28.6,
    "stops_order": "[20,197,194,55,120,65,66,139,77,102,182,232,28,118,148,144,9,3,127]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 32,
    "start_stop_id": 259,
    "end_stop_id": 69,
    "fixed_fare": 135,
    "distance_km": 53.8,
    "stops_order": "[259,163,227,255,111,239,89,51,26,20,197,194,55,120,66,65,139,77,102,182,49,232,28,118,267,152,246,148,144,9,110,220,19,98,3,127,69]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 33,
    "start_stop_id": 89,
    "end_stop_id": 202,
    "fixed_fare": 60,
    "distance_km": 24.4,
    "stops_order": "[89,80,207,119,245,156,186,157,95,222,223,166,22,242,36,202]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 34,
    "start_stop_id": 204,
    "end_stop_id": 165,
    "fixed_fare": 15,
    "distance_km": 4.8,
    "stops_order": "[204,165]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 35,
    "start_stop_id": 85,
    "end_stop_id": 81,
    "fixed_fare": 40,
    "distance_km": 14.6,
    "stops_order": "[85,278,9,144,125,171,170,169,81]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 36,
    "start_stop_id": 153,
    "end_stop_id": 237,
    "fixed_fare": 110,
    "distance_km": 44,
    "stops_order": "[153,131,54,259,163,227,255,111,239,89,80,207,213,97,162,241,31,132,77,139,16,56,252,258,123,275,81,11,96,237]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 37,
    "start_stop_id": 184,
    "end_stop_id": 278,
    "fixed_fare": 105,
    "distance_km": 41.2,
    "stops_order": "[184,89,80,207,213,97,162,241,31,132,77,102,182,49,118,28,267,152,246,148,144,9,110,220,19,98,3,278]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 38,
    "start_stop_id": 184,
    "end_stop_id": 50,
    "fixed_fare": 90,
    "distance_km": 35.6,
    "stops_order": "[184,89,80,207,213,97,162,241,31,132,77,139,16,56,252,258,123,275,81,11,96,24,287,50]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 39,
    "start_stop_id": 183,
    "end_stop_id": 148,
    "fixed_fare": 65,
    "distance_km": 25.8,
    "stops_order": "[183,16,139,77,102,182,283,90,23,279,242,36,202,189,37,106,148]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 40,
    "start_stop_id": 126,
    "end_stop_id": 148,
    "fixed_fare": 95,
    "distance_km": 37,
    "stops_order": "[126,184,89,80,207,213,97,162,241,31,132,77,102,182,283,90,23,279,242,36,202,189,37,106,148]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 41,
    "start_stop_id": 282,
    "end_stop_id": 148,
    "fixed_fare": 30,
    "distance_km": 10.4,
    "stops_order": "[282,130,196,1,38,148]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 42,
    "start_stop_id": 184,
    "end_stop_id": 3,
    "fixed_fare": 105,
    "distance_km": 41.2,
    "stops_order": "[184,89,80,207,119,245,156,186,157,95,222,223,166,22,242,36,202,189,37,106,148,144,9,110,220,19,98,3]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 43,
    "start_stop_id": 183,
    "end_stop_id": 184,
    "fixed_fare": 60,
    "distance_km": 24.4,
    "stops_order": "[183,244,268,64,112,55,240,39,241,162,97,213,207,80,89,184]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 44,
    "start_stop_id": 81,
    "end_stop_id": 85,
    "fixed_fare": 90,
    "distance_km": 35.6,
    "stops_order": "[81,169,262,175,170,171,216,124,73,152,246,148,144,9,110,220,19,98,3,278,168,44,84,85]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 45,
    "start_stop_id": 27,
    "end_stop_id": 184,
    "fixed_fare": 40,
    "distance_km": 14.6,
    "stops_order": "[27,48,42,77,31,241,207,89,184]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 46,
    "start_stop_id": 174,
    "end_stop_id": 237,
    "fixed_fare": 45,
    "distance_km": 17.4,
    "stops_order": "[174,170,175,262,169,12,275,81,11,96,237]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 47,
    "start_stop_id": 174,
    "end_stop_id": 182,
    "fixed_fare": 30,
    "distance_km": 10.4,
    "stops_order": "[174,115,232,118,28,182]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 48,
    "start_stop_id": 280,
    "end_stop_id": 81,
    "fixed_fare": 40,
    "distance_km": 14.6,
    "stops_order": "[280,174,170,175,263,169,12,275,81]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 49,
    "start_stop_id": 54,
    "end_stop_id": 86,
    "fixed_fare": 90,
    "distance_km": 35.6,
    "stops_order": "[54,259,163,227,255,111,239,89,80,207,213,97,162,241,39,240,55,112,64,268,244,183,45,86]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 50,
    "start_stop_id": 79,
    "end_stop_id": 62,
    "fixed_fare": 85,
    "distance_km": 32.8,
    "stops_order": "[79,51,26,20,197,194,55,120,66,65,16,56,252,258,123,58,275,81,11,96,237,62]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 51,
    "start_stop_id": 184,
    "end_stop_id": 122,
    "fixed_fare": 80,
    "distance_km": 31.4,
    "stops_order": "[184,57,207,213,162,97,241,31,132,77,16,56,252,258,123,275,81,11,199,63,122]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 52,
    "start_stop_id": 272,
    "end_stop_id": 13,
    "fixed_fare": 50,
    "distance_km": 18.8,
    "stops_order": "[272,244,64,112,55,240,241,162,207,89,184,13]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 53,
    "start_stop_id": 212,
    "end_stop_id": 127,
    "fixed_fare": 105,
    "distance_km": 41.2,
    "stops_order": "[212,68,111,239,187,35,141,155,222,223,166,22,279,36,202,189,37,106,150,148,144,9,110,220,19,98,3,127]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 54,
    "start_stop_id": 20,
    "end_stop_id": 148,
    "fixed_fare": 95,
    "distance_km": 37,
    "stops_order": "[20,74,197,194,240,55,134,241,31,132,77,102,182,283,90,22,23,279,242,36,202,189,37,106,148]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 55,
    "start_stop_id": 211,
    "end_stop_id": 91,
    "fixed_fare": 20,
    "distance_km": 6.2,
    "stops_order": "[211,90,91]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 56,
    "start_stop_id": 28,
    "end_stop_id": 202,
    "fixed_fare": 20,
    "distance_km": 6.2,
    "stops_order": "[28,91,202]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 57,
    "start_stop_id": 272,
    "end_stop_id": 13,
    "fixed_fare": 75,
    "distance_km": 28.6,
    "stops_order": "[272,233,103,244,268,64,112,55,240,39,241,162,97,213,207,25,89,184,13]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 58,
    "start_stop_id": 20,
    "end_stop_id": 149,
    "fixed_fare": 40,
    "distance_km": 14.6,
    "stops_order": "[20,55,145,209,132,188,92,90,149]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 59,
    "start_stop_id": 53,
    "end_stop_id": 138,
    "fixed_fare": 85,
    "distance_km": 34.2,
    "stops_order": "[53,169,12,275,123,258,252,56,16,139,77,132,31,241,162,97,213,207,80,87,193,21,138]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 60,
    "start_stop_id": 87,
    "end_stop_id": 172,
    "fixed_fare": 40,
    "distance_km": 16,
    "stops_order": "[87,241,31,77,8,247,135,170,205,172]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 61,
    "start_stop_id": 87,
    "end_stop_id": 172,
    "fixed_fare": 75,
    "distance_km": 30,
    "stops_order": "[87,80,207,213,97,162,241,31,132,77,139,8,273,247,135,170,171,216,205,172]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 62,
    "start_stop_id": 230,
    "end_stop_id": 138,
    "fixed_fare": 30,
    "distance_km": 10.4,
    "stops_order": "[230,175,169,140,89,138]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 63,
    "start_stop_id": 280,
    "end_stop_id": 81,
    "fixed_fare": 40,
    "distance_km": 14.6,
    "stops_order": "[280,174,170,175,263,169,12,275,81]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 64,
    "start_stop_id": 183,
    "end_stop_id": 54,
    "fixed_fare": 85,
    "distance_km": 32.8,
    "stops_order": "[183,244,268,112,55,240,39,241,162,97,213,207,80,89,239,107,111,255,227,163,259,54]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 65,
    "start_stop_id": 183,
    "end_stop_id": 13,
    "fixed_fare": 50,
    "distance_km": 18.8,
    "stops_order": "[183,244,64,112,55,240,241,162,207,89,184,13]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 66,
    "start_stop_id": 184,
    "end_stop_id": 249,
    "fixed_fare": 110,
    "distance_km": 44,
    "stops_order": "[184,207,119,245,156,186,180,188,182,49,232,118,28,267,152,246,148,144,9,110,220,19,98,3,278,269,168,44,85,249]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 67,
    "start_stop_id": 174,
    "end_stop_id": 81,
    "fixed_fare": 35,
    "distance_km": 13.2,
    "stops_order": "[174,170,175,262,169,12,275,81]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 68,
    "start_stop_id": 52,
    "end_stop_id": 85,
    "fixed_fare": 140,
    "distance_km": 56.6,
    "stops_order": "[52,250,104,259,163,227,255,111,239,187,35,141,157,95,222,223,166,22,279,242,36,202,189,37,106,148,144,9,110,220,19,98,3,278,269,168,44,84,85]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 69,
    "start_stop_id": 184,
    "end_stop_id": 3,
    "fixed_fare": 105,
    "distance_km": 42.6,
    "stops_order": "[184,89,80,207,119,245,156,186,157,95,222,223,166,22,279,242,36,202,189,37,106,148,144,9,110,220,19,98,3]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 70,
    "start_stop_id": 28,
    "end_stop_id": 202,
    "fixed_fare": 20,
    "distance_km": 6.2,
    "stops_order": "[28,91,202]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 71,
    "start_stop_id": 172,
    "end_stop_id": 184,
    "fixed_fare": 75,
    "distance_km": 28.6,
    "stops_order": "[172,205,216,170,135,247,8,42,77,132,31,241,162,97,213,207,80,89,184]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 72,
    "start_stop_id": 178,
    "end_stop_id": 143,
    "fixed_fare": 40,
    "distance_km": 16,
    "stops_order": "[178,170,135,247,182,90,22,223,222,143]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 73,
    "start_stop_id": 167,
    "end_stop_id": 172,
    "fixed_fare": 105,
    "distance_km": 41.2,
    "stops_order": "[167,52,250,104,259,163,227,255,111,107,89,80,207,213,97,162,241,31,132,78,8,273,247,135,170,171,217,172]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 74,
    "start_stop_id": 153,
    "end_stop_id": 278,
    "fixed_fare": 25,
    "distance_km": 9,
    "stops_order": "[153,111,33,181,278]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 75,
    "start_stop_id": 174,
    "end_stop_id": 50,
    "fixed_fare": 55,
    "distance_km": 21.6,
    "stops_order": "[174,170,175,264,12,275,81,11,96,237,200,287,190,50]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 76,
    "start_stop_id": 8,
    "end_stop_id": 3,
    "fixed_fare": 55,
    "distance_km": 21.6,
    "stops_order": "[8,273,247,135,170,171,216,205,124,148,9,110,221,3]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 77,
    "start_stop_id": 81,
    "end_stop_id": 202,
    "fixed_fare": 30,
    "distance_km": 10.4,
    "stops_order": "[81,169,170,124,151,202]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 78,
    "start_stop_id": 54,
    "end_stop_id": 86,
    "fixed_fare": 80,
    "distance_km": 31.4,
    "stops_order": "[54,259,163,227,255,111,239,89,51,26,20,197,194,240,55,112,64,268,244,183,86]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 79,
    "start_stop_id": 169,
    "end_stop_id": 2,
    "fixed_fare": 65,
    "distance_km": 25.8,
    "stops_order": "[169,262,175,170,171,216,124,73,152,246,148,144,10,220,19,98,2]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 80,
    "start_stop_id": 111,
    "end_stop_id": 172,
    "fixed_fare": 85,
    "distance_km": 32.8,
    "stops_order": "[111,239,89,80,207,213,97,162,241,31,132,77,139,8,273,247,135,170,171,216,205,172]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 81,
    "start_stop_id": 53,
    "end_stop_id": 146,
    "fixed_fare": 50,
    "distance_km": 18.8,
    "stops_order": "[53,169,262,229,43,17,286,191,270,133,109,146]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 82,
    "start_stop_id": 237,
    "end_stop_id": 259,
    "fixed_fare": 115,
    "distance_km": 45.4,
    "stops_order": "[237,96,11,81,275,123,258,252,56,16,139,77,132,31,180,186,156,218,142,35,187,159,88,239,107,111,137,255,227,163,259]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 83,
    "start_stop_id": 190,
    "end_stop_id": 184,
    "fixed_fare": 95,
    "distance_km": 37,
    "stops_order": "[190,287,24,199,237,96,11,81,275,123,258,252,56,16,139,77,132,31,241,97,213,207,80,89,184]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 84,
    "start_stop_id": 172,
    "end_stop_id": 184,
    "fixed_fare": 75,
    "distance_km": 30,
    "stops_order": "[172,205,216,171,169,135,247,273,8,42,77,132,31,241,162,97,213,207,57,184]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 85,
    "start_stop_id": 183,
    "end_stop_id": 70,
    "fixed_fare": 65,
    "distance_km": 25.8,
    "stops_order": "[183,244,268,64,112,55,240,39,241,162,97,213,207,80,89,59,70]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 86,
    "start_stop_id": 54,
    "end_stop_id": 3,
    "fixed_fare": 115,
    "distance_km": 45.4,
    "stops_order": "[54,259,163,227,255,111,239,89,80,207,119,156,186,180,235,188,182,49,28,118,267,152,246,148,144,9,110,220,19,98,3]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 87,
    "start_stop_id": 120,
    "end_stop_id": 282,
    "fixed_fare": 65,
    "distance_km": 25.8,
    "stops_order": "[120,240,134,39,241,162,97,213,207,80,89,239,111,255,259,131,282]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 88,
    "start_stop_id": 183,
    "end_stop_id": 54,
    "fixed_fare": 65,
    "distance_km": 25.8,
    "stops_order": "[183,16,139,77,31,241,162,207,57,184,101,111,243,227,163,259,54]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 89,
    "start_stop_id": 183,
    "end_stop_id": 141,
    "fixed_fare": 75,
    "distance_km": 28.6,
    "stops_order": "[183,244,268,64,112,55,240,39,241,162,97,213,207,89,184,13,126,35,141]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 90,
    "start_stop_id": 20,
    "end_stop_id": 169,
    "fixed_fare": 75,
    "distance_km": 28.6,
    "stops_order": "[20,197,194,240,55,120,66,65,16,56,252,258,123,58,275,30,277,12,169]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 91,
    "start_stop_id": 73,
    "end_stop_id": 20,
    "fixed_fare": 50,
    "distance_km": 18.8,
    "stops_order": "[73,216,171,170,136,8,139,65,66,55,195,20]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 92,
    "start_stop_id": 53,
    "end_stop_id": 184,
    "fixed_fare": 30,
    "distance_km": 10.4,
    "stops_order": "[53,169,139,77,213,184]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 93,
    "start_stop_id": 231,
    "end_stop_id": 172,
    "fixed_fare": 85,
    "distance_km": 34.2,
    "stops_order": "[231,224,193,87,80,207,213,97,162,241,31,132,77,139,8,273,247,135,170,171,216,205,172]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 94,
    "start_stop_id": 237,
    "end_stop_id": 259,
    "fixed_fare": 115,
    "distance_km": 45.4,
    "stops_order": "[237,96,11,81,275,123,258,252,56,16,139,77,132,31,180,186,156,218,142,35,187,159,88,239,107,111,137,255,227,163,259]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 95,
    "start_stop_id": 53,
    "end_stop_id": 60,
    "fixed_fare": 75,
    "distance_km": 30,
    "stops_order": "[53,262,175,169,12,275,123,258,252,8,42,102,182,283,90,23,166,223,29,60]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 96,
    "start_stop_id": 174,
    "end_stop_id": 76,
    "fixed_fare": 50,
    "distance_km": 20.2,
    "stops_order": "[174,170,175,262,169,164,146,229,40,43,17,286,76]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 97,
    "start_stop_id": 183,
    "end_stop_id": 13,
    "fixed_fare": 65,
    "distance_km": 25.8,
    "stops_order": "[183,244,268,64,112,55,240,39,241,162,97,213,207,80,89,184,13]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 98,
    "start_stop_id": 52,
    "end_stop_id": 50,
    "fixed_fare": 125,
    "distance_km": 49.6,
    "stops_order": "[52,250,104,259,163,227,255,111,239,89,51,26,20,197,194,55,120,66,65,16,56,252,258,123,58,275,81,11,96,237,24,287,190,50]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 99,
    "start_stop_id": 183,
    "end_stop_id": 14,
    "fixed_fare": 70,
    "distance_km": 27.2,
    "stops_order": "[183,16,65,66,257,120,55,240,39,241,162,97,213,207,80,89,184,14]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 100,
    "start_stop_id": 53,
    "end_stop_id": 157,
    "fixed_fare": 95,
    "distance_km": 37,
    "stops_order": "[53,262,175,170,171,216,124,73,152,246,148,106,37,189,202,36,242,279,22,154,166,223,222,95,157]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 101,
    "start_stop_id": 53,
    "end_stop_id": 184,
    "fixed_fare": 75,
    "distance_km": 28.6,
    "stops_order": "[53,169,12,275,123,258,252,56,16,139,77,132,31,241,97,213,207,57,184]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 102,
    "start_stop_id": 54,
    "end_stop_id": 210,
    "fixed_fare": 115,
    "distance_km": 45.4,
    "stops_order": "[54,259,163,227,255,111,239,89,51,26,20,197,194,55,120,66,65,16,56,252,258,123,58,275,81,11,96,237,199,160,210]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 103,
    "start_stop_id": 184,
    "end_stop_id": 9,
    "fixed_fare": 85,
    "distance_km": 32.8,
    "stops_order": "[184,57,207,213,162,97,241,31,132,77,102,182,49,232,28,118,267,152,246,148,144,9]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 104,
    "start_stop_id": 81,
    "end_stop_id": 127,
    "fixed_fare": 85,
    "distance_km": 32.8,
    "stops_order": "[81,275,12,169,262,175,170,171,216,124,73,152,246,148,144,9,110,220,19,98,3,127]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 105,
    "start_stop_id": 45,
    "end_stop_id": 3,
    "fixed_fare": 100,
    "distance_km": 39.8,
    "stops_order": "[45,183,16,56,258,123,58,275,30,277,12,169,175,170,171,216,124,73,152,246,148,144,9,110,220,98,3]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 106,
    "start_stop_id": 81,
    "end_stop_id": 21,
    "fixed_fare": 40,
    "distance_km": 16,
    "stops_order": "[81,41,226,261,94,192,129,256,179,21]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 107,
    "start_stop_id": 161,
    "end_stop_id": 3,
    "fixed_fare": 115,
    "distance_km": 46.8,
    "stops_order": "[161,138,21,193,87,80,207,119,245,156,186,157,95,222,223,166,22,279,242,36,202,189,37,106,148,144,9,110,220,19,98,3]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 108,
    "start_stop_id": 45,
    "end_stop_id": 127,
    "fixed_fare": 95,
    "distance_km": 38.4,
    "stops_order": "[45,183,16,56,258,123,58,275,30,12,169,176,171,216,124,73,152,246,148,144,9,110,220,98,3,127]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 109,
    "start_stop_id": 79,
    "end_stop_id": 34,
    "fixed_fare": 120,
    "distance_km": 48.2,
    "stops_order": "[79,87,80,207,119,245,156,180,235,188,182,49,28,118,267,152,246,148,144,9,110,220,19,98,3,278,269,168,44,85,113,266,34]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 110,
    "start_stop_id": 280,
    "end_stop_id": 50,
    "fixed_fare": 60,
    "distance_km": 24.4,
    "stops_order": "[280,174,170,175,262,169,12,275,81,11,96,237,24,287,190,50]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 111,
    "start_stop_id": 212,
    "end_stop_id": 71,
    "fixed_fare": 105,
    "distance_km": 41.2,
    "stops_order": "[212,68,111,107,239,187,35,141,157,222,223,166,22,279,36,202,189,37,106,150,148,144,9,110,220,19,98,71]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 112,
    "start_stop_id": 212,
    "end_stop_id": 86,
    "fixed_fare": 75,
    "distance_km": 28.6,
    "stops_order": "[212,114,59,89,80,207,213,97,241,39,240,55,112,64,268,244,183,45,86]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 113,
    "start_stop_id": 54,
    "end_stop_id": 183,
    "fixed_fare": 75,
    "distance_km": 30,
    "stops_order": "[54,259,163,227,255,111,239,89,80,207,213,97,241,39,240,112,64,268,244,183]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 114,
    "start_stop_id": 96,
    "end_stop_id": 60,
    "fixed_fare": 105,
    "distance_km": 41.2,
    "stops_order": "[96,81,275,12,169,262,175,170,171,216,124,73,152,246,148,106,37,189,202,36,242,279,22,154,166,223,29,60]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 115,
    "start_stop_id": 81,
    "end_stop_id": 60,
    "fixed_fare": 100,
    "distance_km": 39.8,
    "stops_order": "[81,275,123,258,252,56,16,183,244,268,64,112,55,240,39,241,162,119,245,156,186,157,95,222,223,29,60]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 116,
    "start_stop_id": 81,
    "end_stop_id": 29,
    "fixed_fare": 70,
    "distance_km": 27.2,
    "stops_order": "[81,275,12,169,175,170,216,124,73,152,28,118,91,90,23,166,223,29]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 117,
    "start_stop_id": 81,
    "end_stop_id": 280,
    "fixed_fare": 40,
    "distance_km": 14.6,
    "stops_order": "[81,275,12,169,262,175,170,174,280]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 118,
    "start_stop_id": 172,
    "end_stop_id": 20,
    "fixed_fare": 65,
    "distance_km": 25.8,
    "stops_order": "[172,205,216,171,170,135,247,273,8,139,65,66,120,55,194,197,20]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 119,
    "start_stop_id": 53,
    "end_stop_id": 126,
    "fixed_fare": 55,
    "distance_km": 21.6,
    "stops_order": "[53,169,262,175,170,135,247,8,42,77,31,180,156,126]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 120,
    "start_stop_id": 212,
    "end_stop_id": 85,
    "fixed_fare": 120,
    "distance_km": 48.2,
    "stops_order": "[212,68,111,239,187,35,141,157,222,223,166,22,279,36,202,189,37,106,150,148,144,9,110,220,19,98,3,278,269,168,44,84,85]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 121,
    "start_stop_id": 231,
    "end_stop_id": 190,
    "fixed_fare": 95,
    "distance_km": 38.4,
    "stops_order": "[231,87,80,207,213,97,162,241,240,120,66,65,16,56,252,258,123,58,275,81,11,96,237,24,287,190]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 122,
    "start_stop_id": 45,
    "end_stop_id": 60,
    "fixed_fare": 60,
    "distance_km": 23,
    "stops_order": "[45,183,16,139,77,132,31,180,186,157,95,222,223,29,60]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 123,
    "start_stop_id": 172,
    "end_stop_id": 161,
    "fixed_fare": 95,
    "distance_km": 37,
    "stops_order": "[172,205,216,171,170,135,247,273,8,139,77,132,31,241,97,213,207,80,87,193,21,138,116,219,161]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 124,
    "start_stop_id": 81,
    "end_stop_id": 212,
    "fixed_fare": 95,
    "distance_km": 38.4,
    "stops_order": "[81,275,123,258,252,56,16,65,66,257,120,55,240,134,241,162,119,75,13,184,100,276,59,82,114,212]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 125,
    "start_stop_id": 184,
    "end_stop_id": 127,
    "fixed_fare": 85,
    "distance_km": 32.8,
    "stops_order": "[184,207,119,156,186,180,235,188,182,49,28,118,246,148,144,9,110,220,19,98,3,127]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 126,
    "start_stop_id": 172,
    "end_stop_id": 111,
    "fixed_fare": 85,
    "distance_km": 32.8,
    "stops_order": "[172,205,216,171,170,135,247,273,8,42,77,132,31,241,162,97,213,207,80,89,107,111]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 127,
    "start_stop_id": 111,
    "end_stop_id": 172,
    "fixed_fare": 85,
    "distance_km": 34.2,
    "stops_order": "[111,239,89,80,207,213,97,162,241,31,132,77,42,8,99,273,247,135,170,171,205,216,172]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 128,
    "start_stop_id": 54,
    "end_stop_id": 50,
    "fixed_fare": 125,
    "distance_km": 49.6,
    "stops_order": "[54,259,163,227,255,111,239,89,51,26,61,20,197,194,55,120,66,65,16,56,252,258,123,58,275,81,11,96,237,199,24,287,190,50]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 129,
    "start_stop_id": 79,
    "end_stop_id": 160,
    "fixed_fare": 90,
    "distance_km": 35.6,
    "stops_order": "[79,87,80,207,213,97,162,241,39,240,120,66,65,16,56,252,258,123,58,275,81,11,96,160]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 130,
    "start_stop_id": 29,
    "end_stop_id": 199,
    "fixed_fare": 110,
    "distance_km": 44,
    "stops_order": "[29,223,166,22,242,36,202,189,37,106,148,144,9,110,220,19,98,3,127,69,40,17,286,76,105,251,24,206,238,199]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 131,
    "start_stop_id": 231,
    "end_stop_id": 85,
    "fixed_fare": 115,
    "distance_km": 46.8,
    "stops_order": "[231,224,193,87,80,207,119,245,156,186,188,182,49,232,28,118,267,152,246,148,144,9,110,220,19,98,3,278,269,168,44,85]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 132,
    "start_stop_id": 89,
    "end_stop_id": 199,
    "fixed_fare": 30,
    "distance_km": 11.8,
    "stops_order": "[89,241,77,258,81,237,199]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 133,
    "start_stop_id": 281,
    "end_stop_id": 278,
    "fixed_fare": 115,
    "distance_km": 45.4,
    "stops_order": "[281,231,224,87,80,207,119,245,156,186,157,95,222,223,166,22,242,36,202,189,37,106,148,144,9,110,220,19,98,3,278]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 134,
    "start_stop_id": 237,
    "end_stop_id": 231,
    "fixed_fare": 85,
    "distance_km": 34.2,
    "stops_order": "[237,96,11,81,275,123,258,252,56,16,139,77,132,31,241,97,213,207,80,87,193,224,231]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 135,
    "start_stop_id": 53,
    "end_stop_id": 54,
    "fixed_fare": 115,
    "distance_km": 46.8,
    "stops_order": "[53,169,12,275,123,258,252,56,16,139,77,132,31,180,186,156,218,142,35,187,159,88,239,107,111,137,255,227,163,259,234,54]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 136,
    "start_stop_id": 53,
    "end_stop_id": 231,
    "fixed_fare": 85,
    "distance_km": 32.8,
    "stops_order": "[53,169,12,275,123,258,252,56,16,139,77,132,31,241,97,213,207,80,87,193,224,231]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 137,
    "start_stop_id": 183,
    "end_stop_id": 265,
    "fixed_fare": 75,
    "distance_km": 30,
    "stops_order": "[183,244,268,64,112,55,240,39,241,162,119,245,156,186,157,95,222,223,29,265]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 138,
    "start_stop_id": 248,
    "end_stop_id": 3,
    "fixed_fare": 85,
    "distance_km": 34.2,
    "stops_order": "[248,108,228,5,252,8,273,247,135,170,171,216,205,124,73,152,246,148,9,110,220,98,3]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 139,
    "start_stop_id": 259,
    "end_stop_id": 50,
    "fixed_fare": 115,
    "distance_km": 46.8,
    "stops_order": "[259,163,227,255,111,239,89,51,26,61,20,197,194,55,120,66,65,16,56,252,258,123,58,275,81,11,96,237,24,287,190,50]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 140,
    "start_stop_id": 254,
    "end_stop_id": 50,
    "fixed_fare": 125,
    "distance_km": 51,
    "stops_order": "[254,198,147,219,93,212,114,68,111,239,89,51,26,20,197,194,55,120,66,65,16,56,252,258,123,58,275,81,11,96,237,24,287,190,50]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 141,
    "start_stop_id": 53,
    "end_stop_id": 201,
    "fixed_fare": 25,
    "distance_km": 9,
    "stops_order": "[53,169,81,237,201]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 142,
    "start_stop_id": 169,
    "end_stop_id": 111,
    "fixed_fare": 85,
    "distance_km": 34.2,
    "stops_order": "[169,12,275,123,258,252,56,16,65,66,120,240,39,241,162,97,214,80,89,184,239,107,111]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 143,
    "start_stop_id": 170,
    "end_stop_id": 28,
    "fixed_fare": 30,
    "distance_km": 10.4,
    "stops_order": "[170,173,174,115,232,28]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 144,
    "start_stop_id": 170,
    "end_stop_id": 241,
    "fixed_fare": 45,
    "distance_km": 17.4,
    "stops_order": "[170,173,174,115,284,236,102,77,132,31,241]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 145,
    "start_stop_id": 177,
    "end_stop_id": 184,
    "fixed_fare": 65,
    "distance_km": 25.8,
    "stops_order": "[177,124,73,83,7,284,236,102,77,132,31,241,97,213,207,57,184]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 146,
    "start_stop_id": 177,
    "end_stop_id": 132,
    "fixed_fare": 40,
    "distance_km": 16,
    "stops_order": "[177,124,73,83,7,284,236,102,77,132]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 147,
    "start_stop_id": 231,
    "end_stop_id": 71,
    "fixed_fare": 110,
    "distance_km": 44,
    "stops_order": "[231,224,193,87,80,207,119,245,156,186,157,95,222,223,166,22,242,36,202,189,37,106,148,144,9,110,220,19,98,71]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 148,
    "start_stop_id": 231,
    "end_stop_id": 148,
    "fixed_fare": 85,
    "distance_km": 34.2,
    "stops_order": "[231,224,193,87,80,207,119,245,156,186,157,95,222,223,166,22,242,36,202,189,37,106,148]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 149,
    "start_stop_id": 20,
    "end_stop_id": 85,
    "fixed_fare": 85,
    "distance_km": 32.8,
    "stops_order": "[20,197,194,55,120,28,118,152,246,148,144,9,110,220,19,98,3,278,269,168,44,85]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 150,
    "start_stop_id": 190,
    "end_stop_id": 184,
    "fixed_fare": 95,
    "distance_km": 37,
    "stops_order": "[190,287,24,199,237,96,11,81,275,123,258,252,56,16,139,77,132,31,241,97,213,207,80,89,184]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 151,
    "start_stop_id": 20,
    "end_stop_id": 148,
    "fixed_fare": 90,
    "distance_km": 35.6,
    "stops_order": "[20,74,197,194,240,55,120,208,132,46,188,182,283,90,22,23,279,242,36,202,189,37,106,148]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 152,
    "start_stop_id": 27,
    "end_stop_id": 184,
    "fixed_fare": 55,
    "distance_km": 21.6,
    "stops_order": "[27,260,47,83,6,284,102,42,77,31,241,207,89,184]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 153,
    "start_stop_id": 126,
    "end_stop_id": 202,
    "fixed_fare": 70,
    "distance_km": 27.2,
    "stops_order": "[126,184,89,80,207,119,245,156,186,180,132,77,102,42,182,90,91,202]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 154,
    "start_stop_id": 126,
    "end_stop_id": 202,
    "fixed_fare": 70,
    "distance_km": 27.2,
    "stops_order": "[126,184,89,80,207,119,245,156,186,180,132,77,102,42,182,90,91,202]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 155,
    "start_stop_id": 81,
    "end_stop_id": 231,
    "fixed_fare": 85,
    "distance_km": 32.8,
    "stops_order": "[81,275,123,258,252,56,16,65,66,120,240,134,241,97,213,207,80,87,89,193,224,231]",
    "direction": "both",
    "is_active": 1
  },
  {
    "bus_id": 156,
    "start_stop_id": 111,
    "end_stop_id": 81,
    "fixed_fare": 80,
    "distance_km": 31.4,
    "stops_order": "[111,107,239,184,57,207,213,162,97,241,31,132,77,139,16,56,252,258,123,275,81]",
    "direction": "both",
    "is_active": 1
  }
];
