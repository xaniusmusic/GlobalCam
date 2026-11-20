import type { Cam } from './data';

/**
 * Real 24/7 live streams from other public live-camera channels on YouTube.
 * Every ID was verified as live and embeddable.
 */
export const moreCams: Cam[] = [
  // ---------- Space ----------
  {
    id: 'iss-hd', yt: 'ROboUHfPUrU', source: 'NASA',
    title: 'International Space Station — HD Earth Views', location: 'Low Earth Orbit', country: 'Space',
    category: 'Space', tz: 'UTC', lat: 0, lon: -30,
    description: 'Official NASA stream from the ISS, orbiting about 250 miles up at 17,500 mph. Sunrise comes every 90 minutes. A black screen means the station is passing through Earth’s shadow.',
  },

  // ---------- Asia ----------
  {
    id: 'shibuya', yt: '5B4LmH4JbnY', source: 'ANN / TV Asahi',
    title: 'Shibuya Scramble Crossing', location: 'Tokyo', country: 'Japan',
    category: 'Cities', tz: 'Asia/Tokyo', lat: 35.6595, lon: 139.7005,
    description: 'The world’s busiest pedestrian crossing. Thousands of people cross from every direction each time the lights change.',
  },
  {
    id: 'haneda', yt: 'Pmdk2kHf-l8', source: 'ANN / TV Asahi',
    title: 'Haneda Airport Terminal 2', location: 'Tokyo', country: 'Japan',
    category: 'Cities', tz: 'Asia/Tokyo', lat: 35.5494, lon: 139.7798,
    description: '24-hour plane spotting at Tokyo International Airport, one of the busiest airports in Asia.',
  },
  {
    id: 'everest', yt: 'AndDG9BO6wo', source: 'AFAR TV',
    title: 'Mount Everest, Lhotse & Ama Dablam', location: 'Khumbu, Himalayas', country: 'Nepal',
    category: 'Nature', tz: 'Asia/Kathmandu', lat: 27.9881, lon: 86.925,
    description: 'A 4K view of the roof of the world: Everest, Lhotse and Ama Dablam towering over the Khumbu valley.',
  },
  {
    id: 'merapi', yt: 'EyjE15NkVbU', source: 'AFAR TV',
    title: 'Merapi Volcano', location: 'Central Java', country: 'Indonesia',
    category: 'Volcanoes', tz: 'Asia/Jakarta', lat: -7.5407, lon: 110.4457,
    description: 'One of the most active volcanoes on Earth. Watch for glowing lava avalanches after dark.',
  },
  {
    id: 'taal', yt: 'yqz0GC-Sd50', source: 'AFAR TV',
    title: 'Taal Volcano', location: 'Batangas', country: 'Philippines',
    category: 'Volcanoes', tz: 'Asia/Manila', lat: 14.002, lon: 120.993,
    description: 'A volcano sitting on an island inside a lake inside a volcano, in 4K.',
  },

  // ---------- Europe ----------
  {
    id: 'etna', yt: 'l7dshNvAvpw', source: 'AFAR TV',
    title: 'Mount Etna', location: 'Sicily', country: 'Italy',
    category: 'Volcanoes', tz: 'Europe/Rome', lat: 37.751, lon: 14.9934,
    description: 'Europe’s tallest active volcano, live in 4K. Strombolian bursts and lava fountains are common.',
  },
  {
    id: 'porto', yt: 'QetuuDxsgig', source: 'WebcamTaxi',
    title: 'Porto Ribeira & Vila Nova de Gaia', location: 'Porto', country: 'Portugal',
    category: 'Cities', tz: 'Europe/Lisbon', lat: 41.1405, lon: -8.6131,
    description: 'Colorful riverside houses, the Dom Luís I bridge and port-wine boats on the Douro River.',
  },
  {
    id: 'madeira', yt: 'deKoS3UnrcA', source: 'WebcamTaxi',
    title: 'Port of Machico', location: 'Madeira Island', country: 'Portugal',
    category: 'Beaches', tz: 'Atlantic/Madeira', lat: 32.7167, lon: -16.7667,
    description: 'A sheltered bay and golden beach on the sunny east coast of Madeira.',
  },
  {
    id: 'ilulissat', yt: 'VVa_nZtUofE', source: 'AFAR TV',
    title: 'Ilulissat Iceberg Cam', location: 'Ilulissat', country: 'Greenland',
    category: 'Nature', tz: 'America/Nuuk', lat: 69.2198, lon: -51.0986,
    description: 'Giant icebergs from the Ilulissat Icefjord, a UNESCO World Heritage site, drift past in 4K.',
  },

  // ---------- Africa ----------
  {
    id: 'etosha', yt: 'AeMUdOPFcXI', source: 'NamibiaCam',
    title: 'Okaukuejo Waterhole, Etosha', location: 'Etosha National Park', country: 'Namibia',
    category: 'Wildlife', tz: 'Africa/Windhoek', lat: -19.1717, lon: 15.9137,
    description: 'Elephants, rhinos, lions, giraffes and zebras come to drink at this famous floodlit waterhole.',
  },
  {
    id: 'namib', yt: 'ydYDqZQpim8', source: 'NamibiaCam',
    title: 'Namib Desert Waterhole', location: 'Namib Desert', country: 'Namibia',
    category: 'Wildlife', tz: 'Africa/Windhoek', lat: -24.75, lon: 15.3,
    description: 'Oryx, wild horses and jackals visit a remote waterhole in the oldest desert on Earth.',
  },
  {
    id: 'kalahari', yt: 'ME0dPuBtzug', source: 'NamibiaCam',
    title: 'Kalahari Desert', location: 'Kalahari', country: 'Namibia',
    category: 'Wildlife', tz: 'Africa/Windhoek', lat: -23.5, lon: 18.9,
    description: 'Red dunes and desert wildlife in Namibia’s Kalahari.',
  },
  {
    id: 'tembe', yt: '0P_LBKqVbfs', source: 'explore.org / Africam',
    title: 'Tembe Elephant Park', location: 'KwaZulu-Natal', country: 'South Africa',
    category: 'Wildlife', tz: 'Africa/Johannesburg', lat: -27.05, lon: 32.42,
    description: 'Home to some of the largest elephants in Africa. Watch herds gather at the waterhole.',
  },

  // ---------- Americas: wildlife ----------
  {
    id: 'brooks-falls', yt: 'J7ZrIDvqlic', source: 'explore.org',
    title: 'Brooks Falls Brown Bears', location: 'Katmai National Park, AK', country: 'United States',
    category: 'Wildlife', tz: 'America/Anchorage', lat: 58.555, lon: -155.7766,
    description: 'Brown bears fish for leaping sockeye salmon at the famous falls during the summer run.',
  },
  {
    id: 'decorah', yt: 'GGIE1E-kaMQ', source: 'explore.org',
    title: 'Decorah Eagles North Nest', location: 'Decorah, IA', country: 'United States',
    category: 'Wildlife', tz: 'America/Chicago', lat: 43.3033, lon: -91.7857,
    description: 'A close-up 4K look inside the nest of a pair of wild bald eagles.',
  },
  {
    id: 'wolf-center', yt: '5e4lsEe4Vew', source: 'explore.org',
    title: 'International Wolf Center', location: 'Ely, MN', country: 'United States',
    category: 'Wildlife', tz: 'America/Chicago', lat: 47.9032, lon: -91.8671,
    description: 'Watch the resident wolf pack roam its forested enclosure in northern Minnesota.',
  },
  {
    id: 'manatee', yt: 'Fz6sl9YJZE0', source: 'explore.org',
    title: 'Underwater Manatee Cam', location: 'Homosassa Springs, FL', country: 'United States',
    category: 'Underwater', tz: 'America/New_York', lat: 28.8, lon: -82.5878,
    description: 'Gentle West Indian manatees graze in clear spring water.',
  },
  {
    id: 'tropical-reef', yt: 'DHUnz4dyb54', source: 'explore.org',
    title: 'Tropical Reef', location: 'Aquarium of the Pacific', country: 'United States',
    category: 'Underwater', tz: 'America/Los_Angeles', lat: 33.762, lon: -118.1967,
    description: 'Colorful fish, rays and corals in a large tropical reef habitat.',
  },
  {
    id: 'amazon', yt: '36nfxSaVJM0', source: 'ANN / TV Asahi',
    title: 'Amazon Jungle — Rio Negro', location: 'Amazonas', country: 'Brazil',
    category: 'Nature', tz: 'America/Manaus', lat: -3.07, lon: -60.3,
    description: 'Parrots at dawn and frogs and insects at night along the Rio Negro in the Amazon rainforest.',
  },

  // ---------- Monterey Bay Aquarium ----------
  {
    id: 'sea-otters', yt: 'abbR-Ttd-cA', source: 'Monterey Bay Aquarium',
    title: 'Sea Otter Cam', location: 'Monterey, CA', country: 'United States',
    category: 'Wildlife', tz: 'America/Los_Angeles', lat: 36.6182, lon: -121.9019,
    description: 'Playful rescued sea otters dive, groom and nap at the Monterey Bay Aquarium.',
  },
  {
    id: 'penguins', yt: 'QWGYS9IOqYc', source: 'Monterey Bay Aquarium',
    title: 'African Penguin Cam', location: 'Monterey, CA', country: 'United States',
    category: 'Wildlife', tz: 'America/Los_Angeles', lat: 36.6185, lon: -121.9015,
    description: 'Endangered African penguins waddle, swim and socialize in their colony.',
  },
  {
    id: 'kelp-forest', yt: 'w3LjpFhySTg', source: 'Monterey Bay Aquarium',
    title: 'Kelp Forest Cam', location: 'Monterey, CA', country: 'United States',
    category: 'Underwater', tz: 'America/Los_Angeles', lat: 36.6179, lon: -121.9022,
    description: 'Sunlight filters through towering giant kelp, home to schools of sardines and leopard sharks.',
  },
  {
    id: 'shark-cam', yt: 'tEtg5Kg3voQ', source: 'Monterey Bay Aquarium',
    title: 'Shark Cam', location: 'Monterey, CA', country: 'United States',
    category: 'Underwater', tz: 'America/Los_Angeles', lat: 36.6176, lon: -121.9025,
    description: 'Sevengill sharks, rays and other predators of Monterey Bay glide past.',
  },
  {
    id: 'moon-jelly', yt: 'zL68biE6wAs', source: 'Monterey Bay Aquarium',
    title: 'Moon Jelly Cam', location: 'Monterey, CA', country: 'United States',
    category: 'Underwater', tz: 'America/Los_Angeles', lat: 36.6188, lon: -121.9012,
    description: 'Hypnotic, glowing moon jellies pulse through the water. Very relaxing.',
  },
  {
    id: 'monterey-bay', yt: 'fVa6-zCBR7A', source: 'Monterey Bay Aquarium',
    title: 'Monterey Bay Cam', location: 'Monterey, CA', country: 'United States',
    category: 'Nature', tz: 'America/Los_Angeles', lat: 36.619, lon: -121.901,
    description: 'Watch for whales, sea lions and seabirds across the waters of Monterey Bay.',
  },

  // ---------- Hawaii & Pacific ----------
  {
    id: 'napili-bay', yt: 'EyBALr3Z2iw', source: 'AFAR TV',
    title: 'Napili Bay Beach', location: 'West Maui, HI', country: 'United States',
    category: 'Beaches', tz: 'Pacific/Honolulu', lat: 20.9945, lon: -156.6669,
    description: 'A crescent of golden sand and calm turquoise water on Maui’s west shore, in 4K.',
  },
  {
    id: 'north-shore', yt: 'Sgdjj9LCCNk', source: 'AFAR TV',
    title: 'North Shore of Oahu', location: 'Oahu, HI', country: 'United States',
    category: 'Beaches', tz: 'Pacific/Honolulu', lat: 21.6649, lon: -158.0532,
    description: 'Legendary surf breaks on Oahu’s North Shore. Giant winter waves draw the world’s best surfers.',
  },
  {
    id: 'humpback', yt: 'QzQ-7eiMw1w', source: 'AFAR TV',
    title: 'Humpback Whale Sanctuary', location: 'Maui, HI', country: 'United States',
    category: 'Wildlife', tz: 'Pacific/Honolulu', lat: 20.79, lon: -156.47,
    description: 'Watch for breaching humpbacks in the Hawaiian Islands Humpback Whale National Marine Sanctuary.',
  },

  // ---------- Mexico ----------
  {
    id: 'popocatepetl', yt: 'w6WsMTQw9ac', source: 'AFAR TV',
    title: 'Popocatépetl Volcano', location: 'Puebla', country: 'Mexico',
    category: 'Volcanoes', tz: 'America/Mexico_City', lat: 19.0225, lon: -98.6278,
    description: '“El Popo,” one of the most active volcanoes in Mexico, often puffing ash plumes into the sky.',
  },

  // ---------- Jackson Hole / Yellowstone ----------
  {
    id: 'jackson-town-square', yt: 'Zj0pXlq2-jI', source: 'SeeJH',
    title: 'Jackson Hole Town Square', location: 'Jackson, WY', country: 'United States',
    category: 'Cities', tz: 'America/Denver', lat: 43.4799, lon: -110.7624,
    description: 'The famous antler arches and Old West boardwalks of Jackson Town Square.',
  },
  {
    id: 'grand-teton', yt: 'o4fKtgPVpoU', source: 'SeeJH',
    title: "Grand Teton — Dornan's", location: 'Moose, WY', country: 'United States',
    category: 'Nature', tz: 'America/Denver', lat: 43.6555, lon: -110.7178,
    description: 'Jaw-dropping views of the Teton Range rising above the Snake River valley.',
  },
  {
    id: 'yellowstone-river', yt: 'IvZ22jZgvOI', source: 'SeeJH',
    title: 'Yellowstone River', location: 'Gardiner, MT', country: 'United States',
    category: 'Nature', tz: 'America/Denver', lat: 45.0322, lon: -110.7055,
    description: 'Whitewater on the Yellowstone River at the north entrance to Yellowstone National Park.',
  },

  // ---------- Trains ----------
  {
    id: 'train-stlouis', yt: 'XRLwO9QjveA', source: 'Virtual Railfan',
    title: 'St. Louis Train Cam', location: 'St. Louis, MO', country: 'United States',
    category: 'Trains', tz: 'America/Chicago', lat: 38.627, lon: -90.1994,
    description: 'Freight and passenger trains rumble through a busy rail hub on the Mississippi.',
  },
  {
    id: 'train-slc', yt: 'NP-bvAcswIM', source: 'Virtual Railfan',
    title: 'Salt Lake City Train Cam', location: 'Salt Lake City, UT', country: 'United States',
    category: 'Trains', tz: 'America/Denver', lat: 40.7608, lon: -111.891,
    description: 'Union Pacific freights and Amtrak trains with the Wasatch Mountains in the background.',
  },
];
