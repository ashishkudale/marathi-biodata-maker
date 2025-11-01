// Updated types for simplified Marathi Biodata Maker (New Structure)

export interface BiodataDataNew {
  id?: string;
  userId?: string;

  // God/Deity Section
  deity?: {
    name: string; // e.g., "श्री गणेशाय नमः", "ॐ श्री", etc.
    imageUrl?: string; // Optional custom deity image
    showImage: boolean;
  };

  // Personal Information
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
    salary: string; // Required
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
  };

  // Photo (Optional)
  photoUrl?: string;

  // Template Selection
  templateId: string;

  // Metadata
  createdAt?: Date;
  updatedAt?: Date;
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
