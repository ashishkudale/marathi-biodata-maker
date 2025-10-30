# Phase 2: Authentication & User Data Management - Action Plan

## 🎯 Goal
Add Google & Email/Password authentication + Save user biodata to Firebase Firestore with proper user management.

---

## 📋 What You'll Build

✅ **Google Login** (One-click sign in)
✅ **Email/Password Registration & Login**
✅ **User Profile Management**
✅ **Save Biodata to Firestore** (linked to user account)
✅ **My Biodatas Dashboard** (view all saved biodatas)
✅ **Edit/Delete Saved Biodatas**
✅ **Protected Routes** (only logged-in users can save)
✅ **User Preferences** (settings page)

---

## 🔥 Step 1: Enable Authentication in Firebase Console

### Task 1.1: Enable Google Sign-In

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `resume-maker-55067`
3. Go to **Authentication** → **Sign-in method**
4. Click **Google** → Enable it
5. Set **Project support email** (your email)
6. Save

### Task 1.2: Enable Email/Password Sign-In

1. In same **Sign-in method** page
2. Click **Email/Password** → Enable it
3. **DO NOT** enable "Email link (passwordless sign-in)" for now
4. Save

### Task 1.3: Set Up Authorized Domains

1. In **Authentication** → **Settings** → **Authorized domains**
2. Add your domains:
   - `localhost` (already there)
   - `your-app.vercel.app` (add when you deploy)
3. Save

---

## 📦 Step 2: Install Dependencies

```bash
# Already have firebase, but let's ensure we have what we need
npm install firebase

# Optional: For better form handling
npm install react-hook-form
npm install @hookform/resolvers zod

# Optional: For toast notifications
npm install react-hot-toast
```

---

## 🔐 Step 3: Update Firebase Configuration

### Task 3.1: Update `src/lib/firebase.ts`

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
```

**Note:** Firebase credentials are now stored in environment variables. See `.env.example` for required variables.

---

## 📝 Step 4: Update TypeScript Types

### Task 4.1: Add User Types to `src/lib/types.ts`

Add these interfaces to your existing `types.ts`:

```typescript
// Add to existing types.ts file

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface BiodataData {
  id?: string;
  userId?: string; // Add this field
  
  // ... rest of existing BiodataData interface
  
  // Metadata
  createdAt?: Date;
  updatedAt?: Date;
  isPremium?: boolean;
  isPublic?: boolean;
}

export interface UserPreferences {
  userId: string;
  defaultTemplate: string;
  language: 'marathi' | 'english' | 'both';
  theme: 'light' | 'dark';
  emailNotifications: boolean;
}
```

---

## 🔑 Step 5: Create Authentication Service

### Task 5.1: Create `src/lib/authService.ts`

```typescript
import { 
  auth, 
  googleProvider,
  db 
} from './firebase';
import { 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

// Create or update user document in Firestore
export const createUserDocument = async (user: FirebaseUser) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // Create new user document
    try {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        emailVerified: user.emailVerified,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  } else {
    // Update last login time
    try {
      await setDoc(userRef, {
        lastLoginAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error('Error updating user document:', error);
    }
  }
};

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await createUserDocument(result.user);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error('Google sign in error:', error);
    return { success: false, error: error.message };
  }
};

// Email/Password Sign Up
export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update display name
    await updateProfile(result.user, { displayName });
    
    // Create user document
    await createUserDocument(result.user);
    
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error('Email sign up error:', error);
    return { success: false, error: error.message };
  }
};

// Email/Password Sign In
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await createUserDocument(result.user);
    return { success: true, user: result.user };
  } catch (error: any) {
    console.error('Email sign in error:', error);
    return { success: false, error: error.message };
  }
};

// Sign Out
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
};

// Password Reset
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    console.error('Password reset error:', error);
    return { success: false, error: error.message };
  }
};
```

---

## 💾 Step 6: Create Biodata Service (Firestore CRUD)

### Task 6.1: Create `src/lib/biodataService.ts`

```typescript
import { db } from './firebase';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { BiodataData } from './types';

// Save new biodata
export const saveBiodata = async (userId: string, biodataData: Partial<BiodataData>) => {
  try {
    const biodatasRef = collection(db, 'biodatas');
    const docRef = await addDoc(biodatasRef, {
      ...biodataData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error saving biodata:', error);
    return { success: false, error: error.message };
  }
};

// Update existing biodata
export const updateBiodata = async (biodataId: string, biodataData: Partial<BiodataData>) => {
  try {
    const biodataRef = doc(db, 'biodatas', biodataId);
    await updateDoc(biodataRef, {
      ...biodataData,
      updatedAt: serverTimestamp(),
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Error updating biodata:', error);
    return { success: false, error: error.message };
  }
};

// Delete biodata
export const deleteBiodata = async (biodataId: string) => {
  try {
    const biodataRef = doc(db, 'biodatas', biodataId);
    await deleteDoc(biodataRef);
    
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting biodata:', error);
    return { success: false, error: error.message };
  }
};

// Get single biodata
export const getBiodata = async (biodataId: string) => {
  try {
    const biodataRef = doc(db, 'biodatas', biodataId);
    const biodataSnap = await getDoc(biodataRef);
    
    if (biodataSnap.exists()) {
      return {
        success: true,
        data: { id: biodataSnap.id, ...biodataSnap.data() } as BiodataData
      };
    } else {
      return { success: false, error: 'Biodata not found' };
    }
  } catch (error: any) {
    console.error('Error getting biodata:', error);
    return { success: false, error: error.message };
  }
};

// Get all biodatas for a user
export const getUserBiodatas = async (userId: string) => {
  try {
    const biodatasRef = collection(db, 'biodatas');
    const q = query(
      biodatasRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const biodatas: BiodataData[] = [];
    
    querySnapshot.forEach((doc) => {
      biodatas.push({ id: doc.id, ...doc.data() } as BiodataData);
    });
    
    return { success: true, data: biodatas };
  } catch (error: any) {
    console.error('Error getting user biodatas:', error);
    return { success: false, error: error.message };
  }
};
```

---

## 🎨 Step 7: Create Authentication Components

### Task 7.1: Create `src/components/Auth/AuthModal.tsx`

```typescript
'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiUser, FiX } from 'react-icons/fi';
import { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } from '@/lib/authService';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const result = await signInWithGoogle();
    setLoading(false);

    if (result.success) {
      toast.success('Successfully signed in with Google!');
      onSuccess?.();
      onClose();
    } else {
      toast.error(result.error || 'Failed to sign in');
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let result;
    if (mode === 'signup') {
      result = await signUpWithEmail(email, password, displayName);
    } else if (mode === 'signin') {
      result = await signInWithEmail(email, password);
    } else {
      result = await resetPassword(email);
      setLoading(false);
      if (result.success) {
        toast.success('Password reset email sent!');
        setMode('signin');
        return;
      } else {
        toast.error(result.error || 'Failed to send reset email');
        return;
      }
    }

    setLoading(false);

    if (result.success) {
      toast.success(mode === 'signup' ? 'Account created successfully!' : 'Signed in successfully!');
      onSuccess?.();
      onClose();
    } else {
      toast.error(result.error || 'Authentication failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {mode === 'signin' && 'Welcome Back'}
          {mode === 'signup' && 'Create Account'}
          {mode === 'reset' && 'Reset Password'}
        </h2>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50 mb-4"
        >
          <FcGoogle className="w-6 h-6" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {mode !== 'reset' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Reset Link'}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm">
          {mode === 'signin' && (
            <>
              <button
                onClick={() => setMode('reset')}
                className="text-orange-500 hover:text-orange-600 font-semibold"
              >
                Forgot password?
              </button>
              <p className="mt-2 text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-orange-500 hover:text-orange-600 font-semibold"
                >
                  Sign up
                </button>
              </p>
            </>
          )}

          {mode === 'signup' && (
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setMode('signin')}
                className="text-orange-500 hover:text-orange-600 font-semibold"
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'reset' && (
            <button
              onClick={() => setMode('signin')}
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Task 7.2: Create `src/components/Auth/AuthProvider.tsx`

```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Task 7.3: Create User Menu Component `src/components/Auth/UserMenu.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { logout } from '@/lib/authService';
import { FiUser, FiLogOut, FiSettings, FiFile } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function UserMenu() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success('Logged out successfully');
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition"
      >
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt={user.displayName || 'User'}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
          </div>
        )}
        <span className="hidden md:block font-medium text-gray-700">
          {user.displayName || 'User'}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-200">
              <p className="font-semibold text-gray-900">{user.displayName}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            <div className="py-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FiFile className="w-5 h-5" />
                My Biodatas
              </Link>

              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FiUser className="w-5 h-5" />
                Profile
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FiSettings className="w-5 h-5" />
                Settings
              </Link>
            </div>

            <div className="border-t border-gray-200 py-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-red-600 w-full"
              >
                <FiLogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
```

---

## 🎨 Step 8: Update Layout with Auth Provider

### Task 8.1: Update `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/Auth/AuthProvider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Marathi Biodata Maker - Create Beautiful Marriage Biodata',
  description: 'Create professional Marathi marriage biodata in minutes. Free templates, instant PDF download.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

## 🏠 Step 9: Create Dashboard Page

### Task 9.1: Create `src/app/dashboard/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { getUserBiodatas, deleteBiodata } from '@/lib/biodataService';
import { BiodataData } from '@/lib/types';
import Link from 'next/link';
import { FiPlus, FiEdit, FiTrash2, FiDownload } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AuthModal from '@/components/Auth/AuthModal';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [biodatas, setBiodatas] = useState<BiodataData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      setShowAuthModal(true);
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (user) {
      loadBiodatas();
    }
  }, [user]);

  const loadBiodatas = async () => {
    if (!user) return;

    setLoading(true);
    const result = await getUserBiodatas(user.uid);
    setLoading(false);

    if (result.success && result.data) {
      setBiodatas(result.data);
    } else {
      toast.error('Failed to load biodatas');
    }
  };

  const handleDelete = async (biodataId: string) => {
    if (!confirm('Are you sure you want to delete this biodata?')) return;

    const result = await deleteBiodata(biodataId);
    if (result.success) {
      toast.success('Biodata deleted successfully');
      loadBiodatas();
    } else {
      toast.error('Failed to delete biodata');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => router.push('/')}
        onSuccess={() => setShowAuthModal(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Biodatas</h1>
            <p className="text-gray-600 mt-1">
              Manage your saved biodata documents
            </p>
          </div>
          <Link
            href="/create"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Create New
          </Link>
        </div>

        {/* Biodatas Grid */}
        {biodatas.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPlus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No biodatas yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first biodata to get started
            </p>
            <Link
              href="/create"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Create Biodata
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biodatas.map((biodata) => (
              <div
                key={biodata.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {biodata.personalDetails?.fullName || 'Untitled'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Created:{' '}
                    {biodata.createdAt
                      ? new Date(biodata.createdAt).toLocaleDateString()
                      : 'Unknown'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/create?id=${biodata.id}`}
                    className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <FiEdit className="w-4 h-4" />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(biodata.id!)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 🔒 Step 10: Update Create Page with Save Functionality

### Task 10.1: Update `src/app/create/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { saveBiodata, updateBiodata, getBiodata } from '@/lib/biodataService';
import { useBiodataStore } from '@/lib/store';
import { useSearchParams } from 'next/navigation';
import MultiStepForm from '@/components/BiodataForm/MultiStepForm';
import PreviewPanel from '@/components/TemplatePreview/PreviewPanel';
import TemplateGallery from '@/components/TemplateSelector/TemplateGallery';
import ActionButtons from '@/components/DownloadShare/ActionButtons';
import AuthModal from '@/components/Auth/AuthModal';
import UserMenu from '@/components/Auth/UserMenu';
import toast from 'react-hot-toast';
import { FiSave } from 'react-icons/fi';

export default function CreatePage() {
  const { user } = useAuth();
  const { biodataData, updateBiodata: updateStore } = useBiodataStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [biodataId, setBiodataId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Load existing biodata if editing
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      loadBiodata(id);
      setBiodataId(id);
    }
  }, [searchParams]);

  const loadBiodata = async (id: string) => {
    const result = await getBiodata(id);
    if (result.success && result.data) {
      updateStore(result.data);
    }
  };

  const handleSave = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setSaving(true);

    let result;
    if (biodataId) {
      // Update existing
      result = await updateBiodata(biodataId, biodataData);
    } else {
      // Save new
      result = await saveBiodata(user.uid, biodataData);
      if (result.success && result.id) {
        setBiodataId(result.id);
      }
    }

    setSaving(false);

    if (result.success) {
      toast.success(biodataId ? 'Biodata updated!' : 'Biodata saved!');
    } else {
      toast.error('Failed to save biodata');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Create Your Marathi Biodata
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 flex items-center gap-2"
              >
                <FiSave className="w-5 h-5" />
                {saving ? 'Saving...' : biodataId ? 'Update' : 'Save'}
              </button>
              <UserMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div>
            <TemplateGallery />
            <MultiStepForm />
            <ActionButtons />
          </div>

          {/* Right: Preview */}
          <div className="hidden lg:block">
            <PreviewPanel />
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          handleSave();
        }}
      />
    </div>
  );
}
```

---

## 🔐 Step 11: Update Firestore Security Rules

Go to Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection
    match /users/{userId} {
      // Users can only read/write their own document
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Biodatas collection
    match /biodatas/{biodataId} {
      // Anyone can read (for public biodatas)
      allow read: if true;
      
      // Only authenticated users can create
      allow create: if request.auth != null 
        && request.resource.data.userId == request.auth.uid;
      
      // Only owner can update/delete
      allow update, delete: if request.auth != null 
        && resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## ✅ Step 12: Testing Checklist

Test everything in this order:

### Authentication Tests:
- [ ] Google Sign In works
- [ ] Email Sign Up works (creates user in Firestore)
- [ ] Email Sign In works
- [ ] Password Reset email sent
- [ ] User Menu displays correctly
- [ ] Logout works

### Biodata CRUD Tests:
- [ ] Can save new biodata (must be logged in)
- [ ] Biodata appears in dashboard
- [ ] Can edit saved biodata
- [ ] Can delete biodata
- [ ] Dashboard shows all user's biodatas
- [ ] Non-logged-in users prompted to login when saving

### Security Tests:
- [ ] Users can only see their own biodatas in dashboard
- [ ] Users cannot edit others' biodatas
- [ ] Firestore rules block unauthorized access

---

## 🚀 Step 13: Deploy Updated App

```bash
# Commit changes
git add .
git commit -m "Added authentication and user data management"
git push origin main

# Vercel will auto-deploy
# Or manually: vercel --prod
```

---

## 📝 Summary of What You Built

✅ **Google & Email/Password Authentication**
✅ **User Profile Management**
✅ **Save Biodata to Firestore (linked to user)**
✅ **Dashboard to view all biodatas**
✅ **Edit & Delete functionality**
✅ **Protected routes**
✅ **Secure Firestore rules**

---

## 🎯 Next Steps (Optional Enhancements)

After completing this phase, you can add:

1. **Phone Authentication** (we discussed earlier)
2. **Profile Picture Upload**
3. **Biodata Sharing** (generate public links)
4. **Premium Features** (paywall)
5. **Email Verification**
6. **Social Sharing** (WhatsApp, Email)
7. **Analytics Dashboard**

---

## 💡 Pro Tips

1. **Test in Incognito** - To test auth flows without clearing cookies
2. **Check Firebase Console** - Monitor Authentication → Users
3. **Use Toast Notifications** - For better UX feedback
4. **Handle Errors Gracefully** - Show user-friendly messages
5. **Add Loading States** - Prevent double submissions

---

Good luck building! Let me know if you need help with any specific part. 🚀
