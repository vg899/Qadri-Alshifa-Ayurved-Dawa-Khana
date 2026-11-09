import { auth, isFirebaseConfigured } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

const DEMO_ADMIN_SESSION_KEY = 'qadri_demo_admin_auth';

export interface AdminUser {
  email: string;
  isDemo: boolean;
  uid: string;
}

export const authenticationService = {
  /**
   * Listen to Firebase auth state changes or demo state
   */
  subscribeToAuth(callback: (user: AdminUser | null) => void): () => void {
    if (isFirebaseConfigured() && auth) {
      return onAuthStateChanged(auth, (fbUser: User | null) => {
        if (fbUser) {
          callback({
            email: fbUser.email || 'admin@qadrialshifa.com',
            isDemo: false,
            uid: fbUser.uid
          });
        } else {
          // Check if demo session is active
          if (typeof window !== 'undefined' && localStorage.getItem(DEMO_ADMIN_SESSION_KEY) === 'true') {
            callback({
              email: 'admin.demo@qadrialshifa.com',
              isDemo: true,
              uid: 'demo-admin-uid'
            });
          } else {
            callback(null);
          }
        }
      });
    }

    // Demo fallback watcher
    if (typeof window !== 'undefined') {
      const isDemoActive = localStorage.getItem(DEMO_ADMIN_SESSION_KEY) === 'true';
      callback(
        isDemoActive
          ? { email: 'admin.demo@qadrialshifa.com', isDemo: true, uid: 'demo-admin-uid' }
          : null
      );
    } else {
      callback(null);
    }

    return () => {};
  },

  /**
   * Sign in with email and password, or demo credentials
   */
  async login(email: string, pass: string): Promise<AdminUser> {
    const trimmedEmail = email.trim();
    const trimmedPass = pass.trim();

    // Check if real Firebase is available and configured
    if (isFirebaseConfigured() && auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPass);
        return {
          email: cred.user.email || trimmedEmail,
          isDemo: false,
          uid: cred.user.uid
        };
      } catch (err: unknown) {
        // If Firebase auth failed, and user used standard demo credentials, allow demo access
        const isDemoAttempt =
          (trimmedEmail.toLowerCase() === 'admin@qadrialshifa.com' || trimmedEmail.toLowerCase() === 'admin') &&
          trimmedPass === 'qadri123';

        if (isDemoAttempt) {
          if (typeof window !== 'undefined') {
            localStorage.setItem(DEMO_ADMIN_SESSION_KEY, 'true');
          }
          return {
            email: 'admin.demo@qadrialshifa.com',
            isDemo: true,
            uid: 'demo-admin-uid'
          };
        }
        const error = err as { message?: string };
        throw new Error(error.message || 'Firebase Authentication failed. Check your credentials.');
      }
    }

    // Demo Authentication verification
    // Default demo passcode for client preview
    if (
      (trimmedEmail.toLowerCase() === 'admin@qadrialshifa.com' ||
        trimmedEmail.toLowerCase() === 'admin' ||
        trimmedEmail === 'demo') &&
      trimmedPass === 'qadri123'
    ) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(DEMO_ADMIN_SESSION_KEY, 'true');
      }
      return {
        email: 'admin.demo@qadrialshifa.com',
        isDemo: true,
        uid: 'demo-admin-uid'
      };
    }

    throw new Error('अमान्य ईमेल या पासवर्ड। डेमो मोड हेतु email: admin@qadrialshifa.com एवं पासवर्ड: qadri123 का उपयोग करें।');
  },

  /**
   * Sign out
   */
  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DEMO_ADMIN_SESSION_KEY);
    }
    if (isFirebaseConfigured() && auth) {
      try {
        await firebaseSignOut(auth);
      } catch {
        // ignore
      }
    }
  },

  /**
   * Check current session
   */
  getCurrentUser(): AdminUser | null {
    if (typeof window === 'undefined') return null;
    if (isFirebaseConfigured() && auth?.currentUser) {
      return {
        email: auth.currentUser.email || 'admin@qadrialshifa.com',
        isDemo: false,
        uid: auth.currentUser.uid
      };
    }
    if (localStorage.getItem(DEMO_ADMIN_SESSION_KEY) === 'true') {
      return {
        email: 'admin.demo@qadrialshifa.com',
        isDemo: true,
        uid: 'demo-admin-uid'
      };
    }
    return null;
  }
};
