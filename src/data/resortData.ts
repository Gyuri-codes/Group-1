import heroImg from '../assets/images/alon_resort_hero_1788181474178.jpg';
import suiteImg from '../assets/images/alon_room_suite_1788181490218.jpg';
import sunsetDeckImg from '../assets/images/alon_sunset_deck_1788181502814.jpg';
import diningImg from '../assets/images/alon_dining_food_1788181542228.jpg';
import bonfireImg from '../assets/images/alon_bonfire_night_1788181556425.jpg';
import floatingTrayImg from '../assets/images/floating_snack_tray_1789410736354.jpg';
import dayglowImg from '../assets/images/dayglow_paddle_tray_1789410722115.jpg';
import sunsetPaddleKayakImg from '../assets/images/sunset_paddle_kayak_1789415143089.jpg';

import { 
  CurrencyCode, 
  Room, 
  BookingAddon, 
  MenuItem, 
  Activity, 
  CompetitorResort, 
  UserReview, 
  SocialPost, 
  Attraction 
} from '../types';

export const RESORT_IMAGES = {
  hero: heroImg,
  suite: suiteImg,
  sunsetDeck: sunsetDeckImg,
  dining: diningImg,
  bonfire: bonfireImg,
  floatingTray: floatingTrayImg,
  dayglow: dayglowImg,
  sunsetPaddleKayak: sunsetPaddleKayakImg,
  islets: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80'
};

export const RESORT_INFO = {
  name: 'Alon & Aninag Boutique Beach Resort',
  tagline: 'Where Waves Rest and Souls Glow',
  address: 'Poblacion Beach (beside Jazz Inn), Sipalay City, Negros Occidental 6113, Philippines',
  phone: '+63 917 582 2566',
  email: 'stay@alonaninag-sipalay.ph',
  website: 'https://gyuri-codes.github.io/Group-1/',
  dotAccredited: true,
  accreditationNumber: 'DOT-R6-RES-2024-089',
  coordinates: { lat: 9.7538, lng: 122.4042 },
  checkInTime: '2:00 PM',
  checkOutTime: '12:00 PM',
  description: 'An intimate 12-room beachfront retreat on the golden sands of Poblacion Beach, Sipalay City, Negros Occidental.'
};

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; name: string; rateToPHP: number }> = {
  PHP: { symbol: '₱', name: 'Philippine Peso', rateToPHP: 1 },
  USD: { symbol: '$', name: 'US Dollar', rateToPHP: 0.018 },
  EUR: { symbol: '€', name: 'Euro', rateToPHP: 0.016 },
  JPY: { symbol: '¥', name: 'Japanese Yen', rateToPHP: 2.7 },
  KRW: { symbol: '₩', name: 'Korean Won', rateToPHP: 24.5 },
  AUD: { symbol: 'A$', name: 'Australian Dollar', rateToPHP: 0.027 },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', rateToPHP: 0.024 }
};

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: 'addon-dayglow-paddle',
    name: 'Aninag Dayglow & Floating Snack Tray',
    description: '1-hour illuminated clear kayak experience with native floating wicker tray of Negrense snacks and fresh coconuts.',
    pricePHP: 850,
    category: 'Experience'
  },
  {
    id: 'addon-bonfire-dinner',
    name: 'Private Beach Bonfire & Grilled Dinner for Two',
    description: 'Exclusive beach lounge setup, acoustic music, Bacolod chicken inasal, grilled seafood, and Don Papa rum punch.',
    pricePHP: 1250,
    category: 'Dining'
  },
  {
    id: 'addon-island-hopping',
    name: 'Tinagong Dagat Private Motorized Banca Safari',
    description: '4-hour private island hopping tour across limestone islets, secret coves, and coral snorkel gardens.',
    pricePHP: 2400,
    category: 'Adventure'
  },
  {
    id: 'addon-hilot-massage',
    name: 'In-Room Negrense Hilot Warm Coconut Oil Massage',
    description: '60 minutes of deeply restorative traditional Hilot massage with virgin coconut oil and aromatic banana leaf heating.',
    pricePHP: 750,
    category: 'Wellness'
  },
  {
    id: 'addon-airport-transfer',
    name: 'Private Van Transfer (Bacolod or Dumaguete to Sipalay)',
    description: 'Dedicated air-conditioned coaster/van directly to the resort doorstep with scenic countryside stops.',
    pricePHP: 3500,
    category: 'Transport'
  }
];

export const ROOMS_DATA: Room[] = [
  {
    id: 'room-aninag-villa',
    name: 'Aninag Sunset Master Villa',
    category: 'Villa',
    tagline: 'Panoramic Oceanfront Sanctuary with Private Sundeck',
    description: 'Our crown jewel. Expansive glass front doors opening directly onto the golden sands of Poblacion Beach, featuring reclaimed native teak furnishings and sunset vistas.',
    pricePHP: 6800,
    capacity: { adults: 2, children: 2, text: '2 Adults, 2 Children' },
    bedType: '1 King Bed + 1 Daybed',
    sizeSqM: 52,
    view: 'Direct Oceanfront & Sunset View',
    features: ['Private Beachfront Deck', 'Free Mini Bar', 'Ensuite Rain Shower', 'High-Speed Starlink WiFi', 'Artisanal Coffee Bar'],
    images: [suiteImg, sunsetDeckImg, heroImg],
    rating: 4.95,
    reviewCount: 48,
    totalUnits: 2,
    availableUnits: 1
  },
  {
    id: 'room-alon-suite',
    name: 'Alon Sunset Ocean Suite',
    category: 'Suite',
    tagline: 'Warm Wooden Interiors Facing the Turquoise Tide',
    description: 'A serene couple’s haven boasting warm wooden beams, a plush king bed with organic cotton sheets, and floor-to-ceiling windows overlooking Poblacion Bay.',
    pricePHP: 4900,
    capacity: { adults: 2, children: 1, text: '2 Adults, 1 Child' },
    bedType: '1 King Bed',
    sizeSqM: 38,
    view: 'Beachfront Ocean View',
    features: ['Oceanview Balcony', 'Smart TV', 'Rain Shower', 'Starlink WiFi', 'Complimentary Breakfast'],
    images: [suiteImg, heroImg, sunsetDeckImg],
    rating: 4.9,
    reviewCount: 62,
    totalUnits: 3,
    availableUnits: 2
  },
  {
    id: 'room-barkada-loft',
    name: 'Barkada Glow Loft',
    category: 'Loft',
    tagline: 'Spacious Two-Story Haven for Groups & Families',
    description: 'Specially created for barkadas and group getaways with high mezzanine ceilings, dual queen beds, shared lounge area, and direct garden-to-beach path access.',
    pricePHP: 4200,
    capacity: { adults: 4, children: 0, text: '4 Adults' },
    bedType: '2 Queen Beds (Mezzanine)',
    sizeSqM: 45,
    view: 'Garden & Coastal Ocean View',
    features: ['Mezzanine Sleeping Deck', 'Board Game Corner', 'Dual Vanity Sinks', 'Mini Fridge', 'Starlink WiFi'],
    images: [suiteImg, sunsetDeckImg, heroImg],
    rating: 4.85,
    reviewCount: 39,
    totalUnits: 3,
    availableUnits: 2
  },
  {
    id: 'room-amihan-deluxe',
    name: 'Amihan Deluxe Garden Room',
    category: 'Deluxe',
    tagline: 'Cozy Tropical Hideaway Surrounded by Flora',
    description: 'Tucked into our native palm and frangipani gardens just thirty paces from the waves. Warm minimalist design focused on peaceful, quiet rest.',
    pricePHP: 3400,
    capacity: { adults: 2, children: 0, text: '2 Adults' },
    bedType: '1 Queen Bed',
    sizeSqM: 28,
    view: 'Tropical Garden View',
    features: ['Garden Patio', 'Quiet Split A/C', 'Ensuite Hot Shower', 'Starlink WiFi', 'Work Desk'],
    images: [suiteImg, heroImg, diningImg],
    rating: 4.8,
    reviewCount: 51,
    totalUnits: 2,
    availableUnits: 1
  },
  {
    id: 'room-baybayin-cottage',
    name: 'Baybayin Beachfront Cottage',
    category: 'Villa',
    tagline: 'Rustic Native Elegance Right on the Sand',
    description: 'Traditional Negrense architecture reinterpreted with polished bamboo, woven rattan fixtures, and private hammocks slung under beachfront palm trees.',
    pricePHP: 5400,
    capacity: { adults: 2, children: 1, text: '2 Adults, 1 Child' },
    bedType: '1 King Bed',
    sizeSqM: 42,
    view: 'Direct Beachfront Sand View',
    features: ['Private Hammock Deck', 'Direct Sand Access', 'Natural Stone Shower', 'Starlink WiFi', 'Acoustic Bluetooth Speaker'],
    images: [suiteImg, sunsetDeckImg, bonfireImg],
    rating: 4.92,
    reviewCount: 34,
    totalUnits: 2,
    availableUnits: 1
  }
];

export const COMPETITORS_DATA: CompetitorResort[] = [
  {
    id: 'comp-nayah',
    name: 'Nayah Beach Resort',
    category: 'Beachfront Resort',
    location: 'North Sipalay Coast (near Nauhang / Sugar Beach)',
    distanceKm: 8.5,
    travelTime: '15 mins by banca / tricycle',
    mapPin: { leftPercent: 59.2, topPercent: 12.5 },
    highlights: ['Quiet beach cove', 'Family cottages', 'Kayaking'],
    priceRange: '₱2,800 – ₱5,500 / night',
    atmosphere: 'Relaxed, family-oriented, traditional coastal setting',
    description: 'A laid-back beachfront resort in North Sipalay popular among local families for quiet weekend getaways.'
  },
  {
    id: 'comp-bugana',
    name: 'Bugana Beach and Dive Resort',
    category: 'Dive Resort & Villas',
    location: 'Campomanes Bay, Sipalay City',
    distanceKm: 11.2,
    travelTime: '25 mins by vehicle',
    mapPin: { leftPercent: 52.5, topPercent: 69.8 },
    highlights: ['PADI Dive Center', 'Swimming pool', 'Wreck diving access'],
    priceRange: '₱4,500 – ₱8,500 / night',
    atmosphere: 'Upscale dive-focused resort with European-Filipino dining',
    description: 'A renowned dive haven in Campomanes Bay catering to scuba divers exploring Sipalay shipwrecks and coral sanctuaries.'
  },
  {
    id: 'comp-takatuka',
    name: 'Takatuka Beach Resort',
    category: 'Eclectic Themed Resort',
    location: 'Sugar Beach (Langub Beach), Sipalay City',
    distanceKm: 9.8,
    travelTime: '20 mins by motorized banca',
    mapPin: { leftPercent: 53.3, topPercent: 26.0 },
    highlights: ['Whimsical themed rooms', 'Sugar Beach golden sand', 'Eclectic restaurant'],
    priceRange: '₱3,800 – ₱7,000 / night',
    atmosphere: 'Funky, artistic, colorful boutique beachfront vibes',
    description: 'Famous for its imaginative themed rooms and beachfront dining along the famous Sugar Beach.'
  },
  {
    id: 'comp-nataasan',
    name: 'Nataasan Beach Resort and Dive Center',
    category: 'Cliffside Dive Resort',
    location: 'Punta Ballo Beach, Sipalay City',
    distanceKm: 14.5,
    travelTime: '30 mins scenic drive',
    mapPin: { leftPercent: 44.2, topPercent: 82.3 },
    highlights: ['Cliffside infinity pool', 'Punta Ballo white sand', 'Stunning panoramic views'],
    priceRange: '₱3,500 – ₱6,800 / night',
    atmosphere: 'Elevated cliffside serenity with broad views of the Sulu Sea',
    description: 'Perched on the cliffs overlooking Punta Ballo white sand beach, featuring an infinity pool and dive charters.'
  },
  {
    id: 'comp-manami',
    name: 'Manami Resort',
    category: 'Luxury Nature Sanctuary',
    location: 'Barangay Cayhagan, Sipalay City',
    distanceKm: 28.0,
    travelTime: '45 mins private transfer',
    mapPin: { leftPercent: 57.5, topPercent: 92.7 },
    highlights: ['5-star luxury villas', 'Private cove & cave exploration', 'Wellness spa sanctuary'],
    priceRange: '₱14,000 – ₱26,000 / night',
    atmosphere: 'Ultra-exclusive, secluded eco-luxury retreat nestled in nature',
    description: 'A premier Discovery Hospitality luxury sanctuary offering secluded private villas, cave spelunking, and high-end dining.'
  }
];

export const LOYALTY_TIERS = [
  {
    name: 'Sand',
    color: '#D4A373',
    minStays: 0,
    pointsMultiplier: 1,
    perks: [
      'Welcome chilled coconut on arrival',
      'Earn 1 Glow Point per ₱100 spent',
      'Complimentary high-speed WiFi',
      'Access to sunset acoustic bonfires'
    ]
  },
  {
    name: 'Wave',
    color: '#2A9D8F',
    minStays: 3,
    pointsMultiplier: 1.25,
    perks: [
      'All Sand perks included',
      '10% discount on Aninag Dayglow paddle sessions',
      'Priority early check-in (subject to availability)',
      '1 complimentary signature sunset cocktail per stay'
    ]
  },
  {
    name: 'Sunbeam',
    color: '#E76F51',
    minStays: 7,
    pointsMultiplier: 1.5,
    perks: [
      'All Wave perks included',
      'Guaranteed late check-out until 2:00 PM',
      'Free room upgrade upon availability',
      '15% discount at Beachfront Restaurant & Sunset Bar'
    ]
  },
  {
    name: 'Golden Glow',
    color: '#E4A853',
    minStays: 12,
    pointsMultiplier: 2,
    perks: [
      'All Sunbeam perks included',
      'VIP concierge and private beach bonfire setup',
      'Complimentary Tinagong Dagat boat tour per year',
      'Exclusive secret seasonal member rates (25% off)'
    ]
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Breakfast
  { id: 'm-br-1', name: 'Alon Signature Tapa Silog', localName: 'Bacolod Beef Tapa Silog', category: 'Breakfast', description: 'Tender marinated Negros beef strips with garlic sinangag rice, two sunny farm eggs, and spiced native vinegar.', pricePHP: 220, tags: ['Bestseller', 'Silog'] },
  { id: 'm-br-2', name: 'Sipalay Bangus Silog', localName: 'Daing na Bangus', category: 'Breakfast', description: 'Crisp golden boneless milkfish marinated in native garlic and vinegar, served with garlic rice and eggs.', pricePHP: 200, tags: ['Fresh Catch', 'Silog'] },
  { id: 'm-br-3', name: 'Negrense Longganisa Silog', localName: 'Sweet & Garlicky Longganisa', category: 'Breakfast', description: 'Artisanal sweet and garlicky Bacolod pork sausages with sinangag and fresh garden tomatoes.', pricePHP: 190, tags: ['Local Favorite', 'Silog'] },
  { id: 'm-br-4', name: 'Fluffy Beachfront Buttermilk Pancakes', category: 'Breakfast', description: 'Triple stack of fluffy pancakes served with Guimaras mango compote, whipped butter, and wild honey.', pricePHP: 180, tags: ['Sweet', 'Vegetarian'] },
  { id: 'm-br-5', name: 'Avocado & Poached Egg Toast', category: 'Breakfast', description: 'Toasted sourdough topped with smashed local avocado, poached farm eggs, feta, and chili flakes.', pricePHP: 210, tags: ['Healthy', 'Vegetarian'] },
  { id: 'm-br-6', name: 'Poblacion Sunrise Omelette', category: 'Breakfast', description: 'Three-egg folded omelette with fresh local crabmeat, scallions, tomatoes, and melted kesong puti.', pricePHP: 195, tags: ['Seafood'] },
  { id: 'm-br-7', name: 'Tropical Fruit & Granola Acai Bowl', category: 'Breakfast', description: 'Chilled local dragonfruit and mango smoothie base topped with toasted granola, chia, and coconut flakes.', pricePHP: 185, tags: ['Healthy', 'Vegan'] },
  { id: 'm-br-8', name: 'Arroz Caldo with Native Chicken', localName: 'Lugaw Manok', category: 'Breakfast', description: 'Slow-simmered ginger rice porridge with free-range chicken, toasted garlic, scallions, and calamansi.', pricePHP: 160, tags: ['Comfort Food'] },
  { id: 'm-br-9', name: 'Corned Beef Brisket Hash Silog', category: 'Breakfast', description: 'Sautéed shredded beef brisket with caramelized onions and crispy diced potatoes with garlic rice.', pricePHP: 190, tags: ['Silog'] },
  { id: 'm-br-10', name: 'French Toast with Cinnamon & Caramelized Banana', category: 'Breakfast', description: 'Thick brioche slices dipped in vanilla egg custard, served with local saba banana caramel.', pricePHP: 175, tags: ['Sweet'] },

  // Lunch
  { id: 'm-lu-1', name: 'Fresh Catch Sinigang sa Calamansi', localName: 'Sinigang na Isda', category: 'Lunch', description: 'Wild-caught Sipalay reef fish in a vibrant, sour native broth infused with fresh calamansi and swamp cabbage.', pricePHP: 380, tags: ['Local Catch', 'Soup'] },
  { id: 'm-lu-2', name: 'Poblacion Seafood Kare-Kare', localName: 'Kare-Kare Dagat', category: 'Lunch', description: 'Rich toasted peanut and annatto stew with prawns, squid, and local vegetables served with spicy bagoong.', pricePHP: 450, tags: ['Signature', 'Bestseller'] },
  { id: 'm-lu-3', name: 'Negrense Kansi (Sour Bone Marrow Soup)', localName: 'Ilonggo Kansi', category: 'Lunch', description: 'Negros iconic sour beef shank and bone marrow broth soured with native batuan fruit and lemongrass.', pricePHP: 420, tags: ['Must-Try', 'Local Heritage'] },
  { id: 'm-lu-4', name: 'Crispy Calamari with Spiced Calamansi Aioli', category: 'Lunch', description: 'Fresh tender squid rings dredged in seasoned flour, flash fried, and served with tangy garlic dip.', pricePHP: 320, tags: ['Appetizer', 'Seafood'] },
  { id: 'm-lu-5', name: 'Alon Beach Club Sandwich & Fries', category: 'Lunch', description: 'Triple-decker toasted wheat bread with smoked chicken breast, crispy bacon, eggs, cheddar, and hand-cut fries.', pricePHP: 340, tags: ['Comfort Food'] },
  { id: 'm-lu-6', name: 'Grilled Blue Marlin Steak in Garlic Butter', category: 'Lunch', description: 'Thick fillet of fresh marlin caught off Sipalay shores, seared on cast iron with herb garlic butter.', pricePHP: 480, tags: ['Fresh Catch', 'Gluten-Free'] },
  { id: 'm-lu-7', name: 'Pork Belly Lechon Kawali with Atchara', category: 'Lunch', description: 'Golden crispy pork belly served with homemade pickled green papaya and liver dipping sauce.', pricePHP: 360, tags: ['Crispy'] },
  { id: 'm-lu-8', name: 'Stir-Fried Seafood Pancit Canton', category: 'Lunch', description: 'Wok-tossed egg noodles with shrimp, squid, pork strips, and market-fresh vegetables.', pricePHP: 290, tags: ['Sharing'] },
  { id: 'm-lu-9', name: 'Kinilaw na Isda (Negrense Ceviche)', localName: 'Kinilaw sa Sinamak', category: 'Lunch', description: 'Fresh raw yellowfin tuna cubes cured in spiced vinegar, coconut milk, ginger, onions, and bird’s eye chili.', pricePHP: 340, tags: ['Local Catch', 'Appetizer'] },
  { id: 'm-lu-10', name: 'Beachfront Wagyu Burger with Truffle Fries', category: 'Lunch', description: 'Juicy 150g beef patty on a brioche bun with caramelized onions, cheddar, and truffle oil fries.', pricePHP: 460, tags: ['Western Favorite'] },

  // Dinner
  { id: 'm-di-1', name: 'Alon Charcoalbac Chicken Inasal', localName: 'Original Bacolod Inasal', category: 'Dinner', description: 'Leg quarter marinated in native calamansi, sinamak vinegar, and annatto ginger oil, grilled over coconut husk embers.', pricePHP: 320, tags: ['Signature', 'Bestseller'] },
  { id: 'm-di-2', name: 'Grilled Liempo (Pork Belly) Inasal Style', category: 'Dinner', description: 'Smoky grilled pork belly marinated in local seasonings, basted with garlic annatto oil.', pricePHP: 340, tags: ['Grill'] },
  { id: 'm-di-3', name: 'Whole Grilled Yellowfin Tuna Panga', category: 'Dinner', description: 'Meaty tuna jaw charred over coals, glazed with calamansi soy marinade. Perfect for sharing.', pricePHP: 560, tags: ['Sharing', 'Fresh Catch'] },
  { id: 'm-di-4', name: 'Grand Sipalay Seafood Platter for 2', category: 'Dinner', description: 'Grilled tiger prawns, whole blue marlin steak, buttered squid, and garlic-steamed clams with trio dips.', pricePHP: 1250, tags: ['Sharing', 'Seafood Feast'] },
  { id: 'm-di-5', name: 'Charcoal-Grilled Sizzling Sisig', category: 'Dinner', description: 'Crispy minced pork jowl served on a sizzling iron skillet with egg, onions, and calamansi.', pricePHP: 310, tags: ['Pulutan', 'Bestseller'] },
  { id: 'm-di-6', name: 'Slow-Cooked Beef Ribs Caldereta', category: 'Dinner', description: 'Tender beef short ribs stewed in spiced tomato liver sauce, bell peppers, carrots, and melted cheese.', pricePHP: 460, tags: ['Hearty'] },
  { id: 'm-di-7', name: 'Garlic Butter Tiger Prawns', category: 'Dinner', description: 'Sautéed giant local tiger prawns simmered in white wine, butter, and minced roasted garlic.', pricePHP: 580, tags: ['Premium Seafood'] },
  { id: 'm-di-8', name: 'Grilled Stuffed Squid (Inihaw na Pusit)', category: 'Dinner', description: 'Whole fresh squid stuffed with sweet onions, ripe tomatoes, and fresh herbs, basted with sweet soy glaze.', pricePHP: 390, tags: ['Fresh Catch'] },
  { id: 'm-di-9', name: 'Australian Ribeye Steak (250g)', category: 'Dinner', description: 'Char-grilled grass-fed ribeye steak served with peppercorn gravy, baby potatoes, and grilled asparagus.', pricePHP: 850, tags: ['Steak'] },
  { id: 'm-di-10', name: 'Ultimate Alon Resort Grand Sharing Boodle Feast', category: 'Dinner', description: 'Banana-leaf spread with Chicken Inasal, Liempo, Grilled Fish, Prawns, Ensaladang Talong, and Garlic Rice.', pricePHP: 2150, tags: ['Grand Feast', 'Sharing (4-6)'] },

  // Bar & Cocktails
  { id: 'm-ba-1', name: 'Don Papa Sunset Rum Punch', category: 'Bar & Cocktails', description: 'Don Papa 7-Year Negros Rum, freshly squeezed pineapple juice, passionfruit nectar, and splash of grenadine.', pricePHP: 280, tags: ['Signature Cocktail'] },
  { id: 'm-ba-2', name: 'Aninag Golden Hour Margarita', category: 'Bar & Cocktails', description: 'Tequila blanco, native calamansi juice, orange liqueur, and sea salt rim infused with dried chili.', pricePHP: 260, tags: ['Cocktail'] },
  { id: 'm-ba-3', name: 'Poblacion Island Mojito', category: 'Bar & Cocktails', description: 'White rum muddled with fresh mint leaves, lime, raw cane sugar, and bubbly soda water.', pricePHP: 240, tags: ['Refreshing'] },
  { id: 'm-ba-4', name: 'Frozen Mango Daiquiri', category: 'Bar & Cocktails', description: 'Sweet Guimaras mango pureed with white rum, triple sec, and crushed ice.', pricePHP: 250, tags: ['Frozen Cocktail'] },
  { id: 'm-ba-5', name: 'Smoky Bonfire Old Fashioned', category: 'Bar & Cocktails', description: 'Bourbon whiskey stirred with aromatic bitters, muscovado syrup, and flamed orange peel over a clear ice block.', pricePHP: 320, tags: ['Craft Cocktail'] },
  { id: 'm-ba-6', name: 'Fresh Young Sipalay Coconut (Buko)', category: 'Bar & Cocktails', description: 'Chilled freshly opened young coconut directly from local coastal trees.', pricePHP: 95, tags: ['Non-Alcoholic', 'Fresh'] },
  { id: 'm-ba-7', name: 'San Miguel Pale Pilsen / Light', category: 'Bar & Cocktails', description: 'Ice-cold classic Philippine beer served with chilled frosted mug.', pricePHP: 110, tags: ['Beer'] },
  { id: 'm-ba-8', name: 'Engkanto Craft Beer (IPA / Lager)', category: 'Bar & Cocktails', description: 'Artisanal local craft beer brewed with Philippine passionfruit and malts.', pricePHP: 180, tags: ['Craft Beer'] },
  { id: 'm-ba-9', name: 'Sipalay Calamansi Mint Cooler (Mocktail)', category: 'Bar & Cocktails', description: 'Native calamansi juice, cucumber slices, fresh mint, and sparkling tonic water.', pricePHP: 140, tags: ['Mocktail', 'Non-Alcoholic'] },
  { id: 'm-ba-10', name: 'Chilled Coconut Cold Brew Coffee', category: 'Bar & Cocktails', description: 'Slow-steeped Negros highland coffee poured over fresh coconut milk and palm sugar.', pricePHP: 160, tags: ['Coffee', 'Signature'] }
];

export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 'act-dayglow-paddle',
    title: 'Aninag Dayglow & Clear Kayak Experience',
    category: 'Water Sports & Lifestyle',
    description: 'Glide over turquoise waters in transparent kayaks with LED perimeter glow and enjoy a floating native wicker tray of fresh fruits and iced teas.',
    pricePHP: 850,
    priceNote: '₱850 / pair (overnight guests) • ₱1,200 (day visitors)',
    duration: '2 Hours',
    schedule: 'Morning 7:30 AM & Afternoon 3:30 PM',
    includes: ['1-Hour Clear Kayak', 'Floating Snack Tray', '2 Fresh Young Coconuts', 'Sunset Photo Assist', 'Life Vests'],
    popular: true,
    image: dayglowImg
  },
  {
    id: 'act-bonfire',
    title: 'Nightly Sunset Soul Bonfire & Acoustic Session',
    category: 'Evening Lifestyle',
    description: 'Gather on the soft sands of Poblacion Beach under festoon lights as our acoustic musician plays soulful island songs beside a crackling driftwood fire.',
    pricePHP: 0,
    priceNote: 'Free for staying guests • ₱600 for visitors',
    duration: '3 Hours',
    schedule: '5:30 PM – 8:30 PM Nightly',
    includes: ['Beachfront Bonfire Seating', 'Marshmallow Roasting Skewers', 'Acoustic Guitar Sets', 'Towel Service'],
    popular: true,
    image: bonfireImg
  },
  {
    id: 'act-tinagong-dagat',
    title: 'Tinagong Dagat Islet Island Hopping Safari',
    category: 'Island Exploration',
    description: 'Board our motorized outrigger banca to explore the dozens of limestone karst islets, suspended hanging bridges, and hidden lagoons of Sipalay.',
    pricePHP: 2400,
    priceNote: '₱2,400 per boat (up to 6 guests)',
    duration: '4 Hours',
    schedule: '8:00 AM & 1:00 PM Daily',
    includes: ['Private Banca Boat & Licensed Captain', 'Snorkel Masks', 'Bridge Access Fees', 'Ice Chest with Mineral Water'],
    popular: true,
    image: RESORT_IMAGES.islets
  },
  {
    id: 'act-campomanes-diving',
    title: 'Campomanes Bay Snorkel & Wreck Dive',
    category: 'Diving & Snorkeling',
    description: 'Discover underwater marine sanctuaries, coral gardens, and historic submerged wrecks located in the deep sheltered waters of Campomanes Bay.',
    pricePHP: 1800,
    priceNote: '₱1,800 / person (Snorkeling) • ₱3,500 (Intro Dive)',
    duration: '3.5 Hours',
    schedule: '9:00 AM Daily',
    includes: ['Dive Guide / Snorkel Master', 'Full Gear Rental', 'Environmental Fees', 'Boat Transfer'],
    popular: false,
    image: RESORT_IMAGES.islets
  },
  {
    id: 'act-sugar-beach',
    title: 'Sugar Beach Sunset Banca Cruise',
    category: 'Coastal Cruise',
    description: 'A relaxing boat cruise departing from Poblacion Beach to the golden shores of Sugar Beach, viewing sea cliffs and colorful fishermen bancas.',
    pricePHP: 1200,
    priceNote: '₱1,200 per group (up to 4 guests)',
    duration: '2.5 Hours',
    schedule: '4:00 PM Daily',
    includes: ['Banca Transfer', 'Sunset Viewing', 'Beach Walk Access', 'Complimentary Coolers'],
    popular: false,
    image: sunsetPaddleKayakImg
  },
  {
    id: 'act-hilot',
    title: 'Beachfront Negrense Hilot Massage',
    category: 'Wellness',
    description: 'Restorative Filipino healing massage performed in our open-air bamboo pavilion or in the comfort of your private room with warm virgin coconut oil.',
    pricePHP: 750,
    priceNote: '₱750 / person',
    duration: '60 Minutes',
    schedule: '9:00 AM – 9:00 PM By Appointment',
    includes: ['Herbal Foot Bath', 'Warm Coconut Oil', 'Banana Leaf Scanning', 'Ginger Calamansi Tea'],
    popular: true,
    image: suiteImg
  }
];

export const REVIEWS_DATA: UserReview[] = [
  {
    id: 'rev-1',
    author: 'Patricia & Marco Gonzales',
    rating: 5,
    comment: 'The Aninag Dayglow clear kayak experience at sunset was surreal! Gliding over the water while enjoying the floating snack tray felt like a dream. We will definitely come back!',
    date: 'August 2026',
    roomStayed: 'Aninag Sunset Master Villa',
    title: 'Pure magic on Poblacion Beach ✨',
    likes: 42
  },
  {
    id: 'rev-2',
    author: 'Dr. Aris Villanueva',
    rating: 5,
    comment: 'Alon Aninag strikes the perfect balance between boutique elegance and down-to-earth hospitality. Having a nightly acoustic bonfire right outside our room was so peaceful.',
    date: 'July 2026',
    roomStayed: 'Alon Sunset Ocean Suite',
    title: 'Soul-restoring coastal escape',
    likes: 31
  },
  {
    id: 'rev-3',
    author: 'Chloe Santos',
    rating: 5,
    comment: 'Came here with my barkada from Bacolod. The Barkada Loft was so comfortable, the food was delicious (especially the Inasal and Kansi!), and the staff treated us like family.',
    date: 'August 2026',
    roomStayed: 'Barkada Glow Loft',
    title: 'Best group vacation in Sipalay!',
    likes: 27
  },
  {
    id: 'rev-4',
    author: 'Capt. Ronald Del Rosario',
    rating: 5,
    comment: 'Spectacular location right on the main beach. The clear kayaks are well-maintained and the safety briefing was thorough. Excellent Negrense hospitality.',
    date: 'June 2026',
    roomStayed: 'Baybayin Beachfront Cottage',
    title: 'Five stars across all categories',
    likes: 19
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    userName: 'Bea & Miguel',
    userHandle: '@bea_miguel_sipalay',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    image: sunsetDeckImg,
    caption: 'Unreal golden hour glow at Alon Aninag! 🌅 Soul rested and batteries 100% recharged! #GlowAtAlon #SipalaySunsets',
    location: 'Sunset Deck • Poblacion Beach',
    tag: '#GlowAtAlon',
    timestamp: '2 hours ago',
    likes: 128
  },
  {
    id: 'post-2',
    userName: 'Carlo D.',
    userHandle: '@carlotravels_ph',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    image: dayglowImg,
    caption: 'Floating snack tray on a transparent kayak = the ultimate vacation experience! 🛶🥥 #DayglowAtAlon',
    location: 'Poblacion Bay Waters',
    tag: '#DayglowAtAlon',
    timestamp: '5 hours ago',
    likes: 215
  },
  {
    id: 'post-3',
    userName: 'Sarah Jenkins',
    userHandle: '@sarahj_globetrotter',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    image: bonfireImg,
    caption: 'Acoustic songs, crackling wood fire, and stars overhead. This boutique resort is something truly special. ✨',
    location: 'Beachfront Bonfire Lounge',
    tag: '#GlowAtAlon',
    timestamp: '1 day ago',
    likes: 184
  },
  {
    id: 'post-4',
    userName: 'Mark & Liezel',
    userHandle: '@mark_liezel_wanders',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    image: diningImg,
    caption: 'Dinner by the sea! Bacolod chicken inasal and fresh grilled blue marlin with Don Papa cocktails. 🍢🍹',
    location: 'Beachfront Dining Pavilion',
    tag: '#AlonDining',
    timestamp: '2 days ago',
    likes: 96
  }
];

export const ATTRACTONS_DATA: Attraction[] = [
  {
    id: 'attr-tinagong-dagat',
    name: 'Tinagong Dagat Islets & Bridges',
    category: 'Islands & Lagoons',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=600&q=80',
    distanceKm: 12.4,
    travelTime: '20 mins by banca',
    bestTimeToVisit: 'Morning high tide',
    description: 'A cluster of emerald limestone islets linked by wooden footbridges and hidden lagoons.'
  },
  {
    id: 'attr-sugar-beach',
    name: 'Sugar Beach (Langub Beach)',
    category: 'Beaches',
    image: sunsetPaddleKayakImg,
    distanceKm: 9.8,
    travelTime: '15 mins by boat',
    bestTimeToVisit: 'Late afternoon sunset',
    description: 'Renowned for its fine brown-golden sand, calm swimming waters, and bohemian vibe.'
  },
  {
    id: 'attr-campomanes-bay',
    name: 'Campomanes Bay & Dive Site',
    category: 'Marine Sanctuaries',
    image: heroImg,
    distanceKm: 11.2,
    travelTime: '25 mins scenic drive',
    bestTimeToVisit: 'Midday sunny skies',
    description: 'Sheltered deep-water bay boasting vibrant coral reefs, shipwrecks, and diving sites.'
  },
  {
    id: 'attr-punta-ballo',
    name: 'Punta Ballo White Beach',
    category: 'Beaches',
    image: sunsetDeckImg,
    distanceKm: 14.5,
    travelTime: '30 mins by car / trike',
    bestTimeToVisit: 'Morning & sunset',
    description: 'A long stretch of white sand beach ideal for snorkeling and viewing stunning Sulu Sea horizons.'
  },
  {
    id: 'attr-perth-paradise',
    name: 'Perth Paradise Resort Viewdeck',
    category: 'Viewpoints',
    image: suiteImg,
    distanceKm: 13.0,
    travelTime: '25 mins drive',
    bestTimeToVisit: 'Morning golden hour',
    description: 'Famed hilltop vantage point offering an iconic panoramic view of Sipalay’s karst hill islets.'
  },
  {
    id: 'attr-manami-caves',
    name: 'Cayhagan Caves & Cove',
    category: 'Nature & Spelunking',
    image: bonfireImg,
    distanceKm: 28.0,
    travelTime: '45 mins drive',
    bestTimeToVisit: 'Dry season mornings',
    description: 'Spectacular natural caves with stalactites, underground freshwater rivers, and secluded cove.'
  }
];

export const DAYGLOW_EXPERIENCE_DATA = {
  pricing: {
    overnight: {
      pricePHP: 850
    },
    dayPass: {
      pricePHP: 1200
    }
  },
  features: [
    {
      id: 'feat-kayak',
      image: dayglowImg,
      badge: 'Signature Asset',
      title: 'Transparent Clear Kayaks & SUP',
      subtitle: 'Clear Polycarbonate Hull with Perimeter Glow',
      description: 'Observe coral formations and marine life directly through the crystal-clear bottom while paddling gently along Poblacion Beach shoreline.'
    },
    {
      id: 'feat-tray',
      image: floatingTrayImg,
      badge: 'Artisanal Dining',
      title: 'Aesthetic Floating Refreshment Tray',
      subtitle: 'Handcrafted Wicker Floating Food & Tea Service',
      description: 'Delight in artisanal local delicacies including bibingka, sweet Guimaras mangoes, freshly opened coconuts, and fragrant local iced tea.'
    },
    {
      id: 'feat-daybed',
      image: sunsetPaddleKayakImg,
      badge: 'Beachfront Comfort',
      title: 'Reserved Beachfront Shaded Daybed',
      subtitle: 'Premium Oceanfront Resting Lounge',
      description: 'Your own designated private shaded beachfront cabana with plush linen cushions, cold scented towels, and dedicated beach butler service.'
    }
  ],
  coastalJourney: [
    {
      phase: 'PHASE 1',
      title: 'Morning / Afternoon Paddle',
      time: 'Session Start',
      desc: 'Step into calm turquoise waters with your transparent kayak and floating tray under the morning sun.'
    },
    {
      phase: 'PHASE 2',
      title: 'Floating Snack & Tea Time',
      time: 'Mid-Experience',
      desc: 'Rest on tranquil waters while sipping fresh coconut juice and enjoying artisanal Negrense delicacies.'
    },
    {
      phase: 'PHASE 3',
      title: 'Shaded Daybed Relaxation',
      time: 'Post-Paddle Lounge',
      desc: 'Relax in your reserved beachfront daybed with refreshing cold towels and ocean breezes.'
    },
    {
      phase: 'PHASE 4',
      title: 'Sunset & Bonfire Transition',
      time: 'Golden Hour (5:30 PM)',
      desc: 'Seamlessly flow into the evening as the beach lights glow and our nightly acoustic soul bonfire ignites.'
    }
  ],
  processSteps: [
    {
      step: 1,
      title: 'Select Slot & Guest Type',
      desc: 'Choose overnight guest or day visitor and reserve your preferred time slot.'
    },
    {
      step: 2,
      title: 'Beach Butler Greeting',
      desc: 'Our certified beach team welcomes you with a cold tropical towel and safety life vest.'
    },
    {
      step: 3,
      title: 'Paddle & Floating Service',
      desc: 'Glide out onto Poblacion Bay with your illuminated clear kayak and floating snack tray.'
    },
    {
      step: 4,
      title: 'Complimentary Photo Assist',
      desc: 'Our team captures your picture-perfect vacation memories on the water with your phone or camera.'
    },
    {
      step: 5,
      title: 'Rinse & Beach Lounge',
      desc: 'Enjoy fresh-water showers and spend the rest of your session on your shaded oceanfront daybed.'
    }
  ],
  inclusions: [
    '1-Hour Exclusive Clear Kayak with LED Perimeter Glow',
    'Handwoven Floating Tray with Local Delicacies & Fresh Fruit',
    '2 Signature Sunset Fruit Mocktails / Fresh Young Coconut',
    'Complimentary Sunset Photo Assist by Our Beach Butler',
    'Coast Guard Approved Life Vests & Safety Briefing'
  ],
  timeSlots: [
    {
      id: 'morning',
      label: '7:30 AM – 9:30 AM',
      name: 'Morning Mirror Calm',
      vibe: 'Glass-smooth waters, cool morning breeze, best water clarity'
    },
    {
      id: 'mid-morning',
      label: '9:45 AM – 11:45 AM',
      name: 'Sunlit Azure Glow',
      vibe: 'Vibrant turquoise waters under bright tropical sunlight'
    },
    {
      id: 'afternoon',
      label: '1:30 PM – 3:30 PM',
      name: 'Tropical Breeze Session',
      vibe: 'Invigorating warm breeze, great for active paddling'
    },
    {
      id: 'golden-hour',
      label: '3:45 PM – 5:45 PM',
      name: 'Golden Hour Sunset Glow',
      vibe: 'Spectacular sunset dip into the Sulu Sea with LED kayak glow'
    }
  ],
  differentiation: [
    {
      title: 'Intimate Uncrowded Beachfront',
      desc: 'Unlike crowded mass resorts, Alon Aninag features only 12 boutique rooms, ensuring you have ample space on Poblacion Beach.'
    },
    {
      title: 'Artisanal Floating Service',
      desc: 'Our floating wicker trays are custom-woven by local Negrense artisans and loaded with freshly made regional delicacies.'
    },
    {
      title: 'Sunset Bonfire Brand Synergy',
      desc: 'Your day paddle doesn’t end abruptly—it naturally flows into our signature beachfront acoustic soul bonfire.'
    },
    {
      title: 'Dedicated Local Beach Butlers',
      desc: 'Warm, gracious hospitality with safety-certified hosts who assist with photos and ensure your comfort at every minute.'
    }
  ],
  safetyCommitment: [
    {
      title: 'Coast Guard Approved Life Jackets',
      desc: 'High-buoyancy, comfortable life vests provided and required for all water participants.'
    },
    {
      title: 'Protected Bay Waters',
      desc: 'Poblacion Beach offers sheltered, gentle waves ideal for serene paddling and novice kayakers.'
    },
    {
      title: 'Certified Beach Life-Safety Team',
      desc: 'Our beachfront staff are trained in first aid and active water safety observation.'
    },
    {
      title: 'Daily Sanitized Equipment',
      desc: 'Every clear kayak, paddle, and floating wicker tray is meticulously rinsed and sanitized after every single use.'
    }
  ],
  academicProjectInfo: {
    title: 'Strategic Business Proposal: The Aninag Dayglow & Floating Tray Experience',
    course: 'Strategic Hospitality Management',
    program: 'BSHM 4B',
    activityType: 'Strategic Capstone Feasibility Study',
    members: [
      { name: 'Group 1 Lead Researcher', role: 'Project Coordinator & Market Strategist' },
      { name: 'Operations & Service Designer', role: 'Experience Blueprint & Flow Analyst' },
      { name: 'Financial Feasibility Analyst', role: 'Costing, ROI & Pricing Strategist' },
      { name: 'Hospitality Marketing Strategist', role: 'Branding, Channels & Target Demographics' }
    ],
    strategicRationale: 'Capitalizes on daytime guest activity demand to drive incremental revenue (₱850–₱1,200 per pair), optimize beachfront asset utilization before sunset, and position Alon Aninag as the most visually captivating boutique destination in Sipalay.',
    managementDecision: 'RECOMMENDED FOR IMMEDIATE IMPLEMENTATION'
  }
};
