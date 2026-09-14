import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot,
  Firestore 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Reservation, UserAccount } from '../types';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firestore with configured databaseId
export const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

export { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile 
};

export type { FirebaseUser };

/**
 * Fetch or create user account profile document in Firestore
 */
export async function syncUserProfile(
  fbUser: FirebaseUser, 
  additionalData?: Partial<UserAccount>
): Promise<UserAccount> {
  const userDocRef = doc(db, 'users', fbUser.uid);
  try {
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const data = userDocSnap.data() as Partial<UserAccount>;
      const mergedUser: UserAccount = {
        id: fbUser.uid,
        name: data.name || fbUser.displayName || additionalData?.name || 'Guest Explorer',
        firstName: data.firstName || additionalData?.firstName || fbUser.displayName?.split(' ')[0] || 'Guest',
        lastName: data.lastName || additionalData?.lastName || fbUser.displayName?.split(' ').slice(1).join(' ') || '',
        email: fbUser.email || data.email || additionalData?.email || '',
        phone: data.phone || additionalData?.phone || fbUser.phoneNumber || '',
        role: data.role || 'customer',
        loyaltyPoints: data.loyaltyPoints ?? (additionalData?.loyaltyPoints || 340),
        loyaltyTier: data.loyaltyTier || additionalData?.loyaltyTier || 'Wave',
        savedDestinations: data.savedDestinations || ['attr-tinagong-dagat', 'attr-campomanes-bay', 'attr-sugar-beach'],
        bookingHistory: data.bookingHistory || [],
        avatar: fbUser.photoURL || data.avatar,
        memberSince: data.memberSince || '2026'
      };
      // Update with any new profile details
      if (additionalData) {
        await setDoc(userDocRef, mergedUser, { merge: true });
      }
      return mergedUser;
    }
  } catch (err) {
    console.warn('Could not read user profile from Firestore:', err);
  }

  // Fallback: create fresh profile document
  const firstName = additionalData?.firstName || fbUser.displayName?.split(' ')[0] || 'Guest';
  const lastName = additionalData?.lastName || fbUser.displayName?.split(' ').slice(1).join(' ') || '';
  const newAccount: UserAccount = {
    id: fbUser.uid,
    name: fbUser.displayName || `${firstName} ${lastName}`.trim() || 'Guest Explorer',
    firstName,
    lastName,
    email: fbUser.email || '',
    phone: additionalData?.phone || '',
    role: 'customer',
    loyaltyPoints: 350,
    loyaltyTier: 'Wave',
    savedDestinations: ['attr-tinagong-dagat', 'attr-campomanes-bay', 'attr-sugar-beach'],
    bookingHistory: [],
    avatar: fbUser.photoURL || undefined,
    memberSince: '2026'
  };

  try {
    await setDoc(userDocRef, newAccount, { merge: true });
  } catch (err) {
    console.warn('Could not save user profile to Firestore:', err);
  }

  return newAccount;
}

/**
 * Save reservation to Firestore
 */
export async function saveReservationToFirestore(reservation: Reservation): Promise<void> {
  try {
    const resRef = doc(db, 'reservations', reservation.id);
    await setDoc(resRef, reservation);
  } catch (err) {
    console.warn('Could not persist reservation to Firestore:', err);
  }
}

/**
 * Update reservation in Firestore
 */
export async function updateReservationInFirestore(
  id: string, 
  status: Reservation['bookingStatus']
): Promise<void> {
  try {
    const resRef = doc(db, 'reservations', id);
    await setDoc(resRef, { bookingStatus: status }, { merge: true });
  } catch (err) {
    console.warn('Could not update reservation in Firestore:', err);
  }
}

/**
 * Listen to all reservations from Firestore
 */
export function subscribeToReservations(callback: (reservations: Reservation[]) => void) {
  try {
    const q = query(collection(db, 'reservations'));
    return onSnapshot(q, (snapshot) => {
      const items: Reservation[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as Reservation);
      });
      if (items.length > 0) {
        callback(items);
      }
    }, (error) => {
      console.warn('Firestore reservations subscription warning:', error);
    });
  } catch (e) {
    console.warn('Error setting up reservations listener:', e);
    return () => {};
  }
}
