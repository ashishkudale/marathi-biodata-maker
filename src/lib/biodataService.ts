import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';
import { BiodataData } from './types';

const BIODATA_COLLECTION = 'biodatas';

/**
 * Save biodata to Firestore (for authenticated users)
 */
export async function saveBiodata(userId: string, data: Partial<BiodataData>): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const biodataData = {
      ...data,
      userId,
      updatedAt: serverTimestamp(),
      createdAt: data.createdAt || serverTimestamp(),
    };

    let docId = data.id;

    if (docId) {
      // Update existing biodata
      const docRef = doc(db, BIODATA_COLLECTION, docId);
      await updateDoc(docRef, { ...biodataData, updatedAt: serverTimestamp() });
    } else {
      // Create new biodata
      const docRef = doc(collection(db, BIODATA_COLLECTION));
      docId = docRef.id;
      await setDoc(docRef, { ...biodataData, id: docId });
    }

    return { success: true, id: docId };
  } catch (error: any) {
    console.error('Error saving biodata:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get single biodata by ID
 */
export async function getBiodata(biodataId: string): Promise<{ success: boolean; data?: BiodataData; error?: string }> {
  try {
    const docRef = doc(db, BIODATA_COLLECTION, biodataId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() as BiodataData };
    }
    return { success: false, error: 'Biodata not found' };
  } catch (error: any) {
    console.error('Error getting biodata:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Load biodata by ID (backward compatibility)
 */
export async function loadBiodata(id: string): Promise<BiodataData | null> {
  try {
    const docRef = doc(db, BIODATA_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as BiodataData;
    }
    return null;
  } catch (error) {
    console.error('Error loading biodata:', error);
    throw new Error('Failed to load biodata');
  }
}

/**
 * Get all biodatas for a specific user
 */
export async function getUserBiodatas(userId: string): Promise<{ success: boolean; data?: BiodataData[]; error?: string }> {
  try {
    const q = query(
      collection(db, BIODATA_COLLECTION),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const biodatas: BiodataData[] = [];

    querySnapshot.forEach((doc) => {
      biodatas.push(doc.data() as BiodataData);
    });

    return { success: true, data: biodatas };
  } catch (error: any) {
    console.error('Error getting user biodatas:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all biodatas (with optional limit) - for admin/public view
 */
export async function getAllBiodatas(limitCount: number = 10): Promise<BiodataData[]> {
  try {
    const q = query(
      collection(db, BIODATA_COLLECTION),
      orderBy('updatedAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const biodatas: BiodataData[] = [];

    querySnapshot.forEach((doc) => {
      biodatas.push(doc.data() as BiodataData);
    });

    return biodatas;
  } catch (error) {
    console.error('Error getting biodatas:', error);
    throw new Error('Failed to get biodatas');
  }
}

/**
 * Update existing biodata
 */
export async function updateBiodata(biodataId: string, biodataData: Partial<BiodataData>): Promise<{ success: boolean; error?: string }> {
  try {
    const docRef = doc(db, BIODATA_COLLECTION, biodataId);
    const updateData = {
      ...biodataData,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, updateData);
    return { success: true };
  } catch (error: any) {
    console.error('Error updating biodata:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete biodata by ID
 */
export async function deleteBiodata(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const docRef = doc(db, BIODATA_COLLECTION, id);

    // Get the biodata to check for photos
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as BiodataData;

      // Delete photo from storage if exists
      if (data.photoUrl) {
        await deletePhoto(data.photoUrl);
      }
    }

    // Delete the document
    await deleteDoc(docRef);
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting biodata:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Upload photo to Firebase Storage
 */
export async function uploadPhoto(file: File, biodataId: string): Promise<string> {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `${biodataId}_${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `biodata-photos/${fileName}`);

    // Upload file
    await uploadBytes(storageRef, file);

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw new Error('Failed to upload photo');
  }
}

/**
 * Delete photo from Firebase Storage
 */
export async function deletePhoto(photoUrl: string): Promise<void> {
  try {
    const photoRef = ref(storage, photoUrl);
    await deleteObject(photoRef);
  } catch (error) {
    console.error('Error deleting photo:', error);
    // Don't throw error for photo deletion failures
  }
}

/**
 * Save biodata to browser localStorage as backup
 */
export function saveToLocalStorage(data: Partial<BiodataData>): void {
  try {
    localStorage.setItem('biodata_draft', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Load biodata from browser localStorage
 */
export function loadFromLocalStorage(): Partial<BiodataData> | null {
  try {
    const data = localStorage.getItem('biodata_draft');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
}

/**
 * Clear localStorage draft
 */
export function clearLocalStorage(): void {
  try {
    localStorage.removeItem('biodata_draft');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}
