// Updated types for Marathi Biodata Maker - New Simplified Structure

export interface BiodataData {
  id?: string;
  userId?: string;

  // God/Deity Section
  deity?: {
    name: string; // e.g., "श्री गणेशाय नमः", "ॐ श्री", etc.
    imageUrl?: string; // Optional custom deity image
    showImage: boolean;
  };

  // Personal Information (New Structure)
  personalInfo: {
    name: string; // Required
    dateOfBirth: string; // Required
    birthTime?: string;
    birthPlace?: string;
    religion: string; // Required
    caste: string; // Required
    kuldaivat?: string;
    gotra?: string;
    rashi?: string;
    nakshatra?: string;
    gan?: string;
    nadi?: string;
    manglik?: 'Yes' | 'No' | 'Anshik';
    height: string; // Required
    colour?: string;
    bloodGroup?: string;
    education: string; // Required
    jobOrBusiness: string; // Required
    salary: string; // Required;
  };

  // Family Information
  familyInfo: {
    fatherName: string; // Required
    fatherJobOrBusiness?: string;
    motherName: string; // Required
    motherJobOrBusiness?: string;
    sisters?: {
      name: string;
      maritalStatus: 'Married' | 'Unmarried';
    }[];
    brothers?: {
      name: string;
      maritalStatus: 'Married' | 'Unmarried';
    }[];
    mama?: string;
    relativeSurnames?: string; // Comma-separated surnames
  };

  // Contact Information
  contact: {
    address: string; // Required
    mobileNumber: string; // Required
    // TEMPORARY: Backward compatibility
    phone?: string;
    alternatePhone?: string;
    email?: string;
  };

  // Photo (Optional)
  photoUrl?: string;

  // Template Selection
  templateId: string;

  // Metadata
  createdAt?: Date;
  updatedAt?: Date;

  // TEMPORARY: Backward compatibility with old structure
  // TODO: Remove after full migration
  header?: {
    text: string;
    showSymbols: boolean;
  };
  personalDetails?: {
    fullName?: string;
    fullNameMarathi?: string;
    age?: number;
    dateOfBirth?: string;
    birthTime?: string;
    birthPlace?: string;
    height?: string;
    bloodGroup?: string;
    complexion?: string;
    manglik?: 'Yes' | 'No' | 'Anshik';
    gotra?: string;
    devak?: string;
  };
  familyDetails?: {
    fatherName?: string;
    fatherOccupation?: string;
    motherName?: string;
    motherOccupation?: string;
    brothers?: number;
    brothersMarried?: number;
    sisters?: number;
    sistersMarried?: number;
    familyType?: 'Joint' | 'Nuclear';
    nativePlace?: string;
  };
  education?: {
    qualification?: string;
    occupation?: string;
    company?: string;
    income?: string;
    workLocation?: string;
  };
  partnerPreferences?: {
    ageRange?: string;
    heightRange?: string;
    education?: string;
    occupation?: string;
    other?: string;
  };
  aboutMe?: string;
  language?: 'marathi' | 'english' | 'both';
}

// Deity options
export const DEITY_OPTIONS = [
  {
    id: 'ganesh',
    name: '|| श्री गणेशाय नमः ||',
    nameEnglish: 'Shri Ganeshay Namah',
  },
  {
    id: 'om',
    name: '|| ॐ ||',
    nameEnglish: 'Om',
  },
  {
    id: 'shiva',
    name: '|| श्री शिवाय नमः ||',
    nameEnglish: 'Shri Shivay Namah',
  },
  {
    id: 'durga',
    name: '|| श्री दुर्गा देवी ||',
    nameEnglish: 'Shri Durga Devi',
  },
  {
    id: 'custom',
    name: 'इतर (Custom)',
    nameEnglish: 'Custom',
  },
  {
    id: 'none',
    name: 'काहीही नाही (None)',
    nameEnglish: 'None',
  },
];

// Form validation rules
export const REQUIRED_FIELDS = [
  'personalInfo.name',
  'personalInfo.dateOfBirth',
  'personalInfo.religion',
  'personalInfo.caste',
  'personalInfo.height',
  'personalInfo.education',
  'personalInfo.jobOrBusiness',
  'personalInfo.salary',
  'familyInfo.fatherName',
  'familyInfo.motherName',
  'contact.address',
  'contact.mobileNumber',
];

// Keep old interfaces for backward compatibility
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
