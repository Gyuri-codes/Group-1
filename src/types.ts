export type CurrencyCode = 'PHP' | 'USD' | 'EUR' | 'JPY' | 'KRW' | 'AUD' | 'SGD';

export type LanguageCode = 'en' | 'hil' | 'fil' | 'ceb' | 'es' | 'ja' | 'ko';

export interface Room {
  id: string;
  name: string;
  category: 'Villa' | 'Suite' | 'Loft' | 'Deluxe' | string;
  tagline: string;
  description: string;
  pricePHP: number;
  capacity: {
    adults: number;
    children: number;
    text: string;
    maxTotal?: number;
  };
  bedType: string;
  sizeSqM: number;
  view: string;
  features: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  totalUnits: number;
  availableUnits: number;
}

export interface BookingAddon {
  id: string;
  name: string;
  description: string;
  pricePHP: number;
  category?: string;
}

export interface Reservation {
  id: string;
  referenceNumber: string;
  roomId: string;
  roomName: string;
  guestName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  adults: number;
  children: number;
  roomCount: number;
  selectedAddons?: BookingAddon[];
  specialRequests?: string;
  promoCodeApplied?: string;
  discountAmountPHP?: number;
  totalAmountPHP: number;
  depositPaidPHP: number;
  balanceDuePHP: number;
  paymentMethod: string;
  paymentStatus: string;
  bookingStatus: 'Confirmed' | 'Checked-In' | 'Completed' | 'Cancelled';
  guestId?: string;
  createdAt: string;
  dietaryRequirements?: string;
  estimatedArrivalTime?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  memberSince?: string;
  role: 'customer' | 'staff' | 'admin';
  loyaltyPoints: number;
  loyaltyTier: 'Sand' | 'Wave' | 'Sunbeam' | 'Golden Glow';
  savedDestinations?: string[];
  bookingHistory?: string[];
  createdAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  encrypted?: boolean;
  options?: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'promo' | 'weather' | 'booking';
  read: boolean;
}

export interface UserReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  roomStayed: string;
  title: string;
  likes: number;
}

export interface SocialPost {
  id: string;
  userName: string;
  userHandle: string;
  avatar: string;
  image: string;
  caption: string;
  location: string;
  tag: string;
  timestamp: string;
  likes: number;
}

export interface Attraction {
  id: string;
  name: string;
  category: string;
  image: string;
  distanceKm: number;
  travelTime: string;
  bestTimeToVisit: string;
  description?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  localName?: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Bar & Cocktails';
  description: string;
  pricePHP: number;
  tags: string[];
  image?: string;
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  description: string;
  pricePHP: number;
  priceNote?: string;
  duration: string;
  schedule: string;
  includes: string[];
  popular?: boolean;
  image: string;
}

export interface CompetitorResort {
  id: string;
  name: string;
  category: string;
  location: string;
  distanceKm: number;
  travelTime: string;
  mapPin: {
    leftPercent: number;
    topPercent: number;
    x?: number;
    y?: number;
  };
  highlights: string[];
  priceRange: string;
  atmosphere: string;
  description: string;
}
