export interface BiodataData {
  id?: string;
  userId?: string;  // User ID for linking biodata to authenticated users
  // Personal Details
  personalDetails: {
    fullName: string;
    fullNameMarathi?: string;
    dateOfBirth: string;
    birthTime?: string;
    birthPlace: string;
    age: number;
    height: string;
    bloodGroup?: string;
    complexion?: string;
    manglik?: 'Yes' | 'No' | 'Anshik';
    gotra?: string;
    devak?: string;
  };

  // Family Details
  familyDetails: {
    fatherName: string;
    fatherOccupation: string;
    motherName: string;
    motherOccupation?: string;
    brothers?: number;
    brothersMarried?: number;
    sisters?: number;
    sistersMarried?: number;
    familyType?: 'Joint' | 'Nuclear';
    nativePlace?: string;
  };

  // Education & Career
  education: {
    qualification: string;
    occupation: string;
    company?: string;
    income?: string;
    workLocation?: string;
  };

  // Contact Details
  contact: {
    phone: string;
    alternatePhone?: string;
    email?: string;
    address: string;
  };

  // Partner Preferences
  partnerPreferences?: {
    ageRange?: string;
    heightRange?: string;
    education?: string;
    occupation?: string;
    other?: string;
  };

  // About Me
  aboutMe?: string;

  // Photo
  photoUrl?: string;

  // Template & Settings
  templateId: string;
  language: 'marathi' | 'english' | 'both';

  // Metadata
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  isPremium: boolean;
  category: 'traditional' | 'modern' | 'minimal';
  hasPhoto: boolean;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt?: Date;
  lastLoginAt?: Date;
}
