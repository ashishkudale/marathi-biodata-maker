# 🚀 Marathi Biodata Maker - Complete Implementation Guide for Claude AI

> **Instructions for Claude AI in VS Code:**
> This is a complete implementation guide with all code and instructions in one file.
> Follow each phase sequentially to upgrade the Marathi Biodata application.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Phase 1: Setup & Dependencies](#phase-1-setup--dependencies)
3. [Phase 2: Update Type Definitions](#phase-2-update-type-definitions)
4. [Phase 3: Improve PDF Generation](#phase-3-improve-pdf-generation)
5. [Phase 4: Create Simplified Form Components](#phase-4-create-simplified-form-components)
6. [Phase 5: Update Multi-Step Form](#phase-5-update-multi-step-form)
7. [Phase 6: Add Marathi Transliteration](#phase-6-add-marathi-transliteration)
8. [Phase 7: Update Templates](#phase-7-update-templates)
9. [Phase 8: Update Zustand Store](#phase-8-update-zustand-store)
10. [Phase 9: Testing](#phase-9-testing)
11. [Phase 10: Deployment](#phase-10-deployment)

---

## Overview

### What We're Building

Upgrading Marathi Biodata Maker with:
- ✅ **10x Better PDF Quality** (vector-based)
- ✅ **Simplified 5-Step Form** (was 6 steps)
- ✅ **English to Marathi Typing** (transliteration)
- ✅ **Better Validation** (clear required fields)
- ✅ **Enhanced Customization** (deity images, detailed family info)

### Key Changes

**Form Structure:**
- Old: 6 steps → New: 5 steps
- Old: Unclear required fields → New: 12 clearly marked fields
- Old: Basic siblings info → New: Detailed names + marital status
- Old: Partner preferences → New: Removed

**Fields Added:**
- Religion, Caste (required)
- Rashi, Nakshatra, Gan, Nadi
- Education, Job, Salary (moved to personal info)
- Deity image upload
- Detailed siblings
- Mama, Relative surnames

**Fields Removed:**
- Partner preferences (entire section)
- Alternate phone, Email
- Age (auto-calculated)
- Complexion, Devak

---

## Phase 1: Setup & Dependencies

### Step 1.1: Install Required Packages

```bash
# Install PDF generation library (better quality)
npm install @react-pdf/renderer

# Install transliteration library (English to Marathi typing)
npm install react-transliterate

# Verify installation
npm list @react-pdf/renderer react-transliterate
```

### Step 1.2: Download Marathi Fonts

1. Go to: https://fonts.google.com/noto/specimen/Noto+Sans+Devanagari
2. Click "Get font" → Download
3. Extract the ZIP file
4. Create folder: `/public/fonts/`
5. Copy these files to `/public/fonts/`:
   - `NotoSansDevanagari-Regular.ttf`
   - `NotoSansDevanagari-Bold.ttf`

### Step 1.3: Verify Project Structure

```
your-project/
├── public/
│   └── fonts/                              ← CREATE THIS
│       ├── NotoSansDevanagari-Regular.ttf  ← ADD THIS
│       └── NotoSansDevanagari-Bold.ttf     ← ADD THIS
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── templates/
│   └── utils/
└── package.json
```

---

## Phase 2: Update Type Definitions

### Step 2.1: Replace `src/lib/types.ts`

**File:** `src/lib/types.ts`

```typescript
// Updated types for simplified Marathi Biodata Maker

export interface BiodataData {
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
```

**Action:** Replace the entire content of `src/lib/types.ts` with the above code.

---

## Phase 3: Improve PDF Generation

### Step 3.1: Replace `src/utils/pdfGenerator.ts`

**File:** `src/utils/pdfGenerator.tsx` (rename from .ts to .tsx)

```typescript
// Improved PDF Generator using @react-pdf/renderer for better quality
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
  Image,
} from '@react-pdf/renderer';
import { BiodataData } from '@/lib/types';

// Register fonts for Devanagari (Marathi) support
Font.register({
  family: 'NotoSansDevanagari',
  fonts: [
    { 
      src: '/fonts/NotoSansDevanagari-Regular.ttf',
      fontWeight: 'normal'
    },
    { 
      src: '/fonts/NotoSansDevanagari-Bold.ttf',
      fontWeight: 'bold'
    },
  ],
});

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'NotoSansDevanagari',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '2 solid #f97316',
  },
  deityImage: {
    width: 60,
    height: 60,
    marginHorizontal: 'auto',
    marginBottom: 10,
  },
  deityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 8,
    borderBottom: '1 solid #fed7aa',
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    width: '40%',
  },
  value: {
    fontSize: 11,
    width: '60%',
  },
  photo: {
    width: 120,
    height: 150,
    marginHorizontal: 'auto',
    marginBottom: 15,
    border: '2 solid #f97316',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#666',
    borderTop: '1 solid #e5e7eb',
    paddingTop: 10,
  },
});

// PDF Document Component
export const BiodataPDFDocument = ({ data }: { data: BiodataData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Deity */}
      <View style={styles.header}>
        {data.deity?.showImage && data.deity?.imageUrl && (
          <Image style={styles.deityImage} src={data.deity.imageUrl} />
        )}
        {data.deity?.name && (
          <Text style={styles.deityText}>{data.deity.name}</Text>
        )}
        <Text style={styles.title}>विवाह बायोडाटा / Marriage Biodata</Text>
      </View>

      {/* Photo (if available) */}
      {data.photoUrl && (
        <View>
          <Image style={styles.photo} src={data.photoUrl} />
        </View>
      )}

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>वैयक्तिक माहिती / Personal Information</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>नाव / Name:</Text>
          <Text style={styles.value}>{data.personalInfo.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>जन्मतारीख / Date of Birth:</Text>
          <Text style={styles.value}>{data.personalInfo.dateOfBirth}</Text>
        </View>

        {data.personalInfo.birthTime && (
          <View style={styles.row}>
            <Text style={styles.label}>जन्म वेळ / Birth Time:</Text>
            <Text style={styles.value}>{data.personalInfo.birthTime}</Text>
          </View>
        )}

        {data.personalInfo.birthPlace && (
          <View style={styles.row}>
            <Text style={styles.label}>जन्म ठिकाण / Birth Place:</Text>
            <Text style={styles.value}>{data.personalInfo.birthPlace}</Text>
          </View>
        )}

        <View style={styles.row}>
          <Text style={styles.label}>धर्म / Religion:</Text>
          <Text style={styles.value}>{data.personalInfo.religion}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>जात / Caste:</Text>
          <Text style={styles.value}>{data.personalInfo.caste}</Text>
        </View>

        {data.personalInfo.kuldaivat && (
          <View style={styles.row}>
            <Text style={styles.label}>कुलदैवत / Kuldaivat:</Text>
            <Text style={styles.value}>{data.personalInfo.kuldaivat}</Text>
          </View>
        )}

        {data.personalInfo.gotra && (
          <View style={styles.row}>
            <Text style={styles.label}>गोत्र / Gotra:</Text>
            <Text style={styles.value}>{data.personalInfo.gotra}</Text>
          </View>
        )}

        {data.personalInfo.rashi && (
          <View style={styles.row}>
            <Text style={styles.label}>राशी / Rashi:</Text>
            <Text style={styles.value}>{data.personalInfo.rashi}</Text>
          </View>
        )}

        {data.personalInfo.nakshatra && (
          <View style={styles.row}>
            <Text style={styles.label}>नक्षत्र / Nakshatra:</Text>
            <Text style={styles.value}>{data.personalInfo.nakshatra}</Text>
          </View>
        )}

        {data.personalInfo.gan && (
          <View style={styles.row}>
            <Text style={styles.label}>गण / Gan:</Text>
            <Text style={styles.value}>{data.personalInfo.gan}</Text>
          </View>
        )}

        {data.personalInfo.nadi && (
          <View style={styles.row}>
            <Text style={styles.label}>नाडी / Nadi:</Text>
            <Text style={styles.value}>{data.personalInfo.nadi}</Text>
          </View>
        )}

        {data.personalInfo.manglik && (
          <View style={styles.row}>
            <Text style={styles.label}>मांगलिक / Manglik:</Text>
            <Text style={styles.value}>{data.personalInfo.manglik}</Text>
          </View>
        )}

        <View style={styles.row}>
          <Text style={styles.label}>उंची / Height:</Text>
          <Text style={styles.value}>{data.personalInfo.height}</Text>
        </View>

        {data.personalInfo.colour && (
          <View style={styles.row}>
            <Text style={styles.label}>वर्ण / Colour:</Text>
            <Text style={styles.value}>{data.personalInfo.colour}</Text>
          </View>
        )}

        {data.personalInfo.bloodGroup && (
          <View style={styles.row}>
            <Text style={styles.label}>रक्तगट / Blood Group:</Text>
            <Text style={styles.value}>{data.personalInfo.bloodGroup}</Text>
          </View>
        )}

        <View style={styles.row}>
          <Text style={styles.label}>शिक्षण / Education:</Text>
          <Text style={styles.value}>{data.personalInfo.education}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>नोकरी/व्यवसाय / Job/Business:</Text>
          <Text style={styles.value}>{data.personalInfo.jobOrBusiness}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>वार्षिक उत्पन्न / Salary:</Text>
          <Text style={styles.value}>{data.personalInfo.salary}</Text>
        </View>
      </View>

      {/* Family Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>कौटुंबिक माहिती / Family Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>वडिलांचे नाव / Father's Name:</Text>
          <Text style={styles.value}>{data.familyInfo.fatherName}</Text>
        </View>

        {data.familyInfo.fatherJobOrBusiness && (
          <View style={styles.row}>
            <Text style={styles.label}>वडिलांचा व्यवसाय / Father's Occupation:</Text>
            <Text style={styles.value}>{data.familyInfo.fatherJobOrBusiness}</Text>
          </View>
        )}

        <View style={styles.row}>
          <Text style={styles.label}>आईचे नाव / Mother's Name:</Text>
          <Text style={styles.value}>{data.familyInfo.motherName}</Text>
        </View>

        {data.familyInfo.motherJobOrBusiness && (
          <View style={styles.row}>
            <Text style={styles.label}>आईचा व्यवसाय / Mother's Occupation:</Text>
            <Text style={styles.value}>{data.familyInfo.motherJobOrBusiness}</Text>
          </View>
        )}

        {data.familyInfo.sisters && data.familyInfo.sisters.length > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>बहीण / Sisters:</Text>
            <Text style={styles.value}>
              {data.familyInfo.sisters.map((sister, idx) => 
                `${sister.name} (${sister.maritalStatus === 'Married' ? 'विवाहित' : 'अविवाहित'})`
              ).join(', ')}
            </Text>
          </View>
        )}

        {data.familyInfo.brothers && data.familyInfo.brothers.length > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>भाऊ / Brothers:</Text>
            <Text style={styles.value}>
              {data.familyInfo.brothers.map((brother, idx) => 
                `${brother.name} (${brother.maritalStatus === 'Married' ? 'विवाहित' : 'अविवाहित'})`
              ).join(', ')}
            </Text>
          </View>
        )}

        {data.familyInfo.mama && (
          <View style={styles.row}>
            <Text style={styles.label}>मामा / Mama:</Text>
            <Text style={styles.value}>{data.familyInfo.mama}</Text>
          </View>
        )}

        {data.familyInfo.relativeSurnames && (
          <View style={styles.row}>
            <Text style={styles.label}>नातेवाईक आडनाव / Relatives:</Text>
            <Text style={styles.value}>{data.familyInfo.relativeSurnames}</Text>
          </View>
        )}
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>संपर्क माहिती / Contact Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>पत्ता / Address:</Text>
          <Text style={styles.value}>{data.contact.address}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>मोबाईल / Mobile:</Text>
          <Text style={styles.value}>{data.contact.mobileNumber}</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Created with Marathi Biodata Maker • {new Date().toLocaleDateString('en-IN')}
      </Text>
    </Page>
  </Document>
);

// Export Download Link Component
export const DownloadPDFButton = ({ 
  data, 
  filename = 'biodata.pdf' 
}: { 
  data: BiodataData; 
  filename?: string;
}) => {
  return (
    <PDFDownloadLink
      document={<BiodataPDFDocument data={data} />}
      fileName={filename}
      className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
    >
      {({ blob, url, loading, error }) => {
        if (loading) return 'तयार करत आहे... / Preparing PDF...';
        if (error) return 'Error generating PDF';
        return '📥 Download PDF / डाउनलोड करा';
      }}
    </PDFDownloadLink>
  );
};

export default BiodataPDFDocument;
```

**Actions:**
1. Rename `src/utils/pdfGenerator.ts` to `pdfGenerator.tsx`
2. Replace entire content with above code
3. Ensure fonts are in `/public/fonts/`

---

## Phase 4: Create Simplified Form Components

### Step 4.1: Create Deity Step Component

**File:** `src/components/BiodataForm/steps/DeityStep.tsx` (CREATE NEW)

```typescript
'use client';

import React, { useState } from 'react';
import { DEITY_OPTIONS } from '@/lib/types';

export const DeityStep = ({ data, onUpdate, onNext }: any) => {
  const [customDeityName, setCustomDeityName] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(data?.deity?.showImage || false);
  const [selectedDeity, setSelectedDeity] = useState(data?.deity?.name || 'ganesh');

  const handleSubmit = () => {
    const selectedOption = DEITY_OPTIONS.find(d => d.id === selectedDeity);
    onUpdate({
      deity: {
        name: selectedDeity === 'custom' ? customDeityName : selectedOption?.name || '',
        showImage: showImageUpload,
        imageUrl: data?.deity?.imageUrl || '',
      }
    });
    onNext();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({
          deity: {
            ...data?.deity,
            imageUrl: reader.result as string,
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          देवता / God Image
        </h2>
        <p className="text-gray-600 mb-6">
          Select or customize the deity invocation for your biodata
        </p>
      </div>

      {/* Deity Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          देवता निवडा / Select Deity
        </label>
        {DEITY_OPTIONS.map((option) => (
          <div key={option.id} className="flex items-center space-x-3">
            <input
              type="radio"
              id={option.id}
              name="deity"
              value={option.id}
              checked={selectedDeity === option.id}
              onChange={(e) => setSelectedDeity(e.target.value)}
              className="w-4 h-4 text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor={option.id} className="text-gray-700 cursor-pointer">
              <span className="font-semibold">{option.name}</span>
              <span className="text-sm text-gray-500 ml-2">({option.nameEnglish})</span>
            </label>
          </div>
        ))}
      </div>

      {/* Custom Deity Name Input */}
      {selectedDeity === 'custom' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Deity Name
          </label>
          <input
            type="text"
            value={customDeityName}
            onChange={(e) => setCustomDeityName(e.target.value)}
            placeholder="Enter custom deity name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
      )}

      {/* Show Image Toggle */}
      {selectedDeity !== 'none' && (
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="showImage"
            checked={showImageUpload}
            onChange={(e) => setShowImageUpload(e.target.checked)}
            className="w-4 h-4 text-orange-500 focus:ring-orange-500"
          />
          <label htmlFor="showImage" className="text-gray-700">
            Show deity image in biodata
          </label>
        </div>
      )}

      {/* Image Upload (Optional) */}
      {showImageUpload && selectedDeity !== 'none' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Deity Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Recommended size: 100x100px, PNG or JPG
          </p>
          {data?.deity?.imageUrl && (
            <img 
              src={data.deity.imageUrl} 
              alt="Preview" 
              className="mt-2 w-20 h-20 object-cover border-2 border-orange-500 rounded"
            />
          )}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
      >
        Next Step → / पुढे जा
      </button>
    </div>
  );
};
```

### Step 4.2: Create Personal Info Step (With Transliteration)

**File:** `src/components/BiodataForm/steps/PersonalInfoStep.tsx` (CREATE NEW or REPLACE)

```typescript
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactTransliterate } from 'react-transliterate';
import 'react-transliterate/dist/index.css';

export const PersonalInfoStep = ({ data, onUpdate, onNext, onBack }: any) => {
  // States for transliteration fields
  const [nameMarathi, setNameMarathi] = useState(data?.personalInfo?.name || '');
  const [birthPlace, setBirthPlace] = useState(data?.personalInfo?.birthPlace || '');
  const [kuldaivat, setKuldaivat] = useState(data?.personalInfo?.kuldaivat || '');
  const [gotra, setGotra] = useState(data?.personalInfo?.gotra || '');
  const [rashi, setRashi] = useState(data?.personalInfo?.rashi || '');
  const [nakshatra, setNakshatra] = useState(data?.personalInfo?.nakshatra || '');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: data?.personalInfo || {}
  });

  const onSubmit = (formData: any) => {
    const updatedData = {
      ...formData,
      name: nameMarathi,
      birthPlace,
      kuldaivat,
      gotra,
      rashi,
      nakshatra,
    };
    onUpdate({ personalInfo: updatedData });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          वैयक्तिक माहिती / Personal Information
        </h2>
        <p className="text-gray-600 mb-6">
          💡 Type in English to get Marathi (* = Required)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            नाव / Name *
          </label>
          <ReactTransliterate
            value={nameMarathi}
            onChangeText={setNameMarathi}
            lang="mr"
            placeholder="Type: amit → अमित"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {!nameMarathi && <p className="text-red-500 text-xs mt-1">Name is required</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            जन्मतारीख / Date of Birth *
          </label>
          <input
            {...register('dateOfBirth', { required: 'Date of birth is required' })}
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message as string}</p>
          )}
        </div>

        {/* Birth Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            जन्म वेळ / Birth Time
          </label>
          <input
            {...register('birthTime')}
            type="time"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Birth Place - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            जन्म ठिकाण / Birth Place
          </label>
          <ReactTransliterate
            value={birthPlace}
            onChangeText={setBirthPlace}
            lang="mr"
            placeholder="Type: pune → पुणे"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Religion */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            धर्म / Religion *
          </label>
          <input
            {...register('religion', { required: 'Religion is required' })}
            type="text"
            placeholder="Hindu, Jain, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.religion && (
            <p className="text-red-500 text-xs mt-1">{errors.religion.message as string}</p>
          )}
        </div>

        {/* Caste */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            जात / Caste *
          </label>
          <input
            {...register('caste', { required: 'Caste is required' })}
            type="text"
            placeholder="Maratha, Brahmin, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.caste && (
            <p className="text-red-500 text-xs mt-1">{errors.caste.message as string}</p>
          )}
        </div>

        {/* Kuldaivat - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            कुलदैवत / Kuldaivat
          </label>
          <ReactTransliterate
            value={kuldaivat}
            onChangeText={setKuldaivat}
            lang="mr"
            placeholder="Type: bhavani → भवानी"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Gotra - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            गोत्र / Gotra
          </label>
          <ReactTransliterate
            value={gotra}
            onChangeText={setGotra}
            lang="mr"
            placeholder="Type in English"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Rashi - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            राशी / Rashi
          </label>
          <ReactTransliterate
            value={rashi}
            onChangeText={setRashi}
            lang="mr"
            placeholder="Type: mesh → मेष"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Nakshatra - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            नक्षत्र / Nakshatra
          </label>
          <ReactTransliterate
            value={nakshatra}
            onChangeText={setNakshatra}
            lang="mr"
            placeholder="Type: ashwini → अश्विनी"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Gan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            गण / Gan
          </label>
          <select
            {...register('gan')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select / निवडा</option>
            <option value="Dev">Dev / देव</option>
            <option value="Manushya">Manushya / मनुष्य</option>
            <option value="Rakshasa">Rakshasa / राक्षस</option>
          </select>
        </div>

        {/* Nadi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            नाडी / Nadi
          </label>
          <select
            {...register('nadi')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select / निवडा</option>
            <option value="Adi">Adi / आदि</option>
            <option value="Madhya">Madhya / मध्य</option>
            <option value="Antya">Antya / अंत्य</option>
          </select>
        </div>

        {/* Manglik */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            मांगलिक / Manglik
          </label>
          <select
            {...register('manglik')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select / निवडा</option>
            <option value="Yes">Yes / होय</option>
            <option value="No">No / नाही</option>
            <option value="Anshik">Anshik / अंशिक</option>
          </select>
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            उंची / Height *
          </label>
          <input
            {...register('height', { required: 'Height is required' })}
            type="text"
            placeholder="e.g., 5'6''"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.height && (
            <p className="text-red-500 text-xs mt-1">{errors.height.message as string}</p>
          )}
        </div>

        {/* Colour */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            वर्ण / Colour
          </label>
          <select
            {...register('colour')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select / निवडा</option>
            <option value="Fair">Fair / गोरा</option>
            <option value="Wheatish">Wheatish / गव्हाळ</option>
            <option value="Dark">Dark / सावळा</option>
          </select>
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            रक्तगट / Blood Group
          </label>
          <select
            {...register('bloodGroup')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select / निवडा</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            शिक्षण / Education *
          </label>
          <input
            {...register('education', { required: 'Education is required' })}
            type="text"
            placeholder="B.E., MBA, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.education && (
            <p className="text-red-500 text-xs mt-1">{errors.education.message as string}</p>
          )}
        </div>

        {/* Job/Business */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            नोकरी/व्यवसाय / Job/Business *
          </label>
          <input
            {...register('jobOrBusiness', { required: 'Job/Business is required' })}
            type="text"
            placeholder="Software Engineer, Business"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.jobOrBusiness && (
            <p className="text-red-500 text-xs mt-1">{errors.jobOrBusiness.message as string}</p>
          )}
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            वार्षिक उत्पन्न / Annual Salary *
          </label>
          <input
            {...register('salary', { required: 'Salary is required' })}
            type="text"
            placeholder="5-6 LPA"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.salary && (
            <p className="text-red-500 text-xs mt-1">{errors.salary.message as string}</p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Type in English (e.g., "ram") and get Marathi suggestions (राम)
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          ← Back / मागे
        </button>
        <button
          type="submit"
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Next Step → / पुढे
        </button>
      </div>
    </form>
  );
};
```

### Step 4.3: Create Family Info Step

**File:** `src/components/BiodataForm/steps/FamilyInfoStep.tsx` (CREATE NEW or REPLACE)

```typescript
'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { ReactTransliterate } from 'react-transliterate';
import 'react-transliterate/dist/index.css';

export const FamilyInfoStep = ({ data, onUpdate, onNext, onBack }: any) => {
  const [fatherName, setFatherName] = useState(data?.familyInfo?.fatherName || '');
  const [motherName, setMotherName] = useState(data?.familyInfo?.motherName || '');
  const [mama, setMama] = useState(data?.familyInfo?.mama || '');

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: data?.familyInfo || {
      sisters: [],
      brothers: [],
    }
  });

  const { fields: sisterFields, append: appendSister, remove: removeSister } = useFieldArray({
    control,
    name: 'sisters'
  });

  const { fields: brotherFields, append: appendBrother, remove: removeBrother } = useFieldArray({
    control,
    name: 'brothers'
  });

  const onSubmit = (formData: any) => {
    const updatedData = {
      ...formData,
      fatherName,
      motherName,
      mama,
    };
    onUpdate({ familyInfo: updatedData });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          कौटुंबिक माहिती / Family Information
        </h2>
        <p className="text-gray-600 mb-6">
          Enter family details (* = Required)
        </p>
      </div>

      <div className="space-y-4">
        {/* Father's Name - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            वडिलांचे नाव / Father's Name *
          </label>
          <ReactTransliterate
            value={fatherName}
            onChangeText={setFatherName}
            lang="mr"
            placeholder="Type in English"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {!fatherName && <p className="text-red-500 text-xs mt-1">Father's name is required</p>}
        </div>

        {/* Father's Job/Business */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            वडिलांचा व्यवसाय / Father's Job/Business
          </label>
          <input
            {...register('fatherJobOrBusiness')}
            type="text"
            placeholder="Occupation"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Mother's Name - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            आईचे नाव / Mother's Name *
          </label>
          <ReactTransliterate
            value={motherName}
            onChangeText={setMotherName}
            lang="mr"
            placeholder="Type in English"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {!motherName && <p className="text-red-500 text-xs mt-1">Mother's name is required</p>}
        </div>

        {/* Mother's Job/Business */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            आईचा व्यवसाय / Mother's Job/Business
          </label>
          <input
            {...register('motherJobOrBusiness')}
            type="text"
            placeholder="Occupation or Housewife"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Sisters Section */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            बहिणी / Sisters
          </label>
          
          {sisterFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`sisters.${index}.name` as const)}
                type="text"
                placeholder="Sister's Name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <select
                {...register(`sisters.${index}.maritalStatus` as const)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="Unmarried">Unmarried / अविवाहित</option>
                <option value="Married">Married / विवाहित</option>
              </select>
              <button
                type="button"
                onClick={() => removeSister(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => appendSister({ name: '', maritalStatus: 'Unmarried' })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            + Add Sister / बहीण जोडा
          </button>
        </div>

        {/* Brothers Section */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            भाऊ / Brothers
          </label>
          
          {brotherFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`brothers.${index}.name` as const)}
                type="text"
                placeholder="Brother's Name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <select
                {...register(`brothers.${index}.maritalStatus` as const)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="Unmarried">Unmarried / अविवाहित</option>
                <option value="Married">Married / विवाहित</option>
              </select>
              <button
                type="button"
                onClick={() => removeBrother(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => appendBrother({ name: '', maritalStatus: 'Unmarried' })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            + Add Brother / भाऊ जोडा
          </button>
        </div>

        {/* Mama - WITH TRANSLITERATION */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            मामा / Mama (Maternal Uncle)
          </label>
          <ReactTransliterate
            value={mama}
            onChangeText={setMama}
            lang="mr"
            placeholder="Type in English"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Relative Surnames */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            नातेवाईकांची आडनावे / Relatives Surnames
          </label>
          <input
            {...register('relativeSurnames')}
            type="text"
            placeholder="e.g., Deshmukh, Patil, Kulkarni"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter surnames separated by commas
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          ← Back / मागे
        </button>
        <button
          type="submit"
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Next Step → / पुढे
        </button>
      </div>
    </form>
  );
};
```

### Step 4.4: Create Contact Step

**File:** `src/components/BiodataForm/steps/ContactStep.tsx` (CREATE NEW or REPLACE)

```typescript
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

export const ContactStep = ({ data, onUpdate, onNext, onBack }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: data?.contact || {}
  });

  const onSubmit = (formData: any) => {
    onUpdate({ contact: formData });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          संपर्क माहिती / Contact Information
        </h2>
        <p className="text-gray-600 mb-6">
          Enter contact details (* = Required)
        </p>
      </div>

      <div className="space-y-4">
        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            पत्ता / Address *
          </label>
          <textarea
            {...register('address', { required: 'Address is required' })}
            rows={3}
            placeholder="Full Address with City, State, PIN"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address.message as string}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            मोबाईल नंबर / Mobile Number *
          </label>
          <input
            {...register('mobileNumber', { 
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit mobile number'
              }
            })}
            type="tel"
            maxLength={10}
            placeholder="10-digit mobile number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message as string}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          ← Back / मागे
        </button>
        <button
          type="submit"
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Next Step → / पुढे
        </button>
      </div>
    </form>
  );
};
```

### Step 4.5: Create Photo Step

**File:** `src/components/BiodataForm/steps/PhotoStep.tsx` (CREATE NEW or REPLACE)

```typescript
'use client';

import React, { useState } from 'react';

export const PhotoStep = ({ data, onUpdate, onNext, onBack }: any) => {
  const [preview, setPreview] = useState<string | null>(data?.photoUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onUpdate({ photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkip = () => {
    onUpdate({ photoUrl: null });
    onNext();
  };

  const handleSubmit = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          फोटो / Photo (Optional)
        </h2>
        <p className="text-gray-600 mb-6">
          Upload your photo for the biodata
        </p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        {preview ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="max-w-xs max-h-64 object-contain border-4 border-orange-500 rounded-lg"
              />
            </div>
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  onUpdate({ photoUrl: null });
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove Photo / काढा
              </button>
              <label className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">
                Change Photo / बदला
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center cursor-pointer">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-600 mb-2">Click to upload photo</span>
            <span className="text-xs text-gray-500">PNG, JPG up to 2MB</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Photo upload is optional. You can skip this step.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          ← Back / मागे
        </button>
        <button
          type="button"
          onClick={handleSkip}
          className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition"
        >
          Skip / वगळा
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          {preview ? 'Continue → / पुढे' : 'Skip & Continue'}
        </button>
      </div>
    </div>
  );
};
```

---

## Phase 5: Update Multi-Step Form

### Step 5.1: Update MultiStepForm Component

**File:** `src/components/BiodataForm/MultiStepForm.tsx` (REPLACE)

```typescript
'use client';

import { useState } from 'react';
import { BiodataData } from '@/lib/types';
import { DeityStep } from './steps/DeityStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { FamilyInfoStep } from './steps/FamilyInfoStep';
import { ContactStep } from './steps/ContactStep';
import { PhotoStep } from './steps/PhotoStep';

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [biodataData, setBiodataData] = useState<Partial<BiodataData>>({
    templateId: 'template-1',
  });

  const steps = [
    {
      title: 'Deity',
      titleMarathi: 'देवता',
      component: DeityStep,
    },
    {
      title: 'Personal',
      titleMarathi: 'वैयक्तिक',
      component: PersonalInfoStep,
    },
    {
      title: 'Family',
      titleMarathi: 'कौटुंबिक',
      component: FamilyInfoStep,
    },
    {
      title: 'Contact',
      titleMarathi: 'संपर्क',
      component: ContactStep,
    },
    {
      title: 'Photo',
      titleMarathi: 'फोटो',
      component: PhotoStep,
    },
  ];

  const handleUpdate = (data: Partial<BiodataData>) => {
    setBiodataData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - save or preview
      console.log('Final biodata:', biodataData);
      // TODO: Add your save logic here
      // TODO: Navigate to preview page
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 text-center ${
                index <= currentStep ? 'text-orange-500' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 font-bold ${
                  index <= currentStep
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <div className="text-xs font-medium">{step.title}</div>
              <div className="text-xs text-gray-500">{step.titleMarathi}</div>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <CurrentStepComponent
          data={biodataData}
          onUpdate={handleUpdate}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>

      {/* Debug Info (Remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-xs">
          <p className="font-bold">Debug Info:</p>
          <p>Current Step: {currentStep + 1} of {steps.length}</p>
          <pre className="mt-2 overflow-auto">{JSON.stringify(biodataData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

---

## Phase 6: Add Marathi Transliteration

**Note:** This is already integrated in Phase 4 components! ✅

### Step 6.1: Import Transliteration CSS

**File:** `src/app/globals.css`

Add this at the top of your global CSS file:

```css
@import 'react-transliterate/dist/index.css';

/* Custom transliteration styles */
.rtl-container {
  position: relative;
  width: 100%;
}

.rtl-suggestions {
  position: absolute;
  z-index: 1000;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  max-height: 240px;
  overflow-y: auto;
  margin-top: 4px;
  width: 100%;
}

.rtl-suggestion {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 1rem;
}

.rtl-suggestion:hover {
  background-color: #fff7ed;
}

.rtl-suggestion-active {
  background-color: #fed7aa;
  color: #9a3412;
}

/* Ensure Marathi text displays correctly */
.rtl-input {
  font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif;
}
```

---

## Phase 7: Update Templates

### Step 7.1: Example Template Update (Template1)

**File:** `src/templates/Template1.tsx` (UPDATE)

Update your templates to use the new data structure:

```typescript
import { BiodataData } from '@/lib/types';

export default function Template1({ data }: { data: BiodataData }) {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto font-mukta">
      {/* Header with Deity */}
      <div className="text-center mb-6 pb-4 border-b-4 border-orange-500">
        {data.deity?.showImage && data.deity?.imageUrl && (
          <img
            src={data.deity.imageUrl}
            alt="Deity"
            className="w-20 h-20 mx-auto mb-2 object-contain"
          />
        )}
        {data.deity?.name && (
          <h1 className="text-2xl font-bold text-orange-600 mb-2">
            {data.deity.name}
          </h1>
        )}
        <h2 className="text-xl font-semibold text-gray-800">
          विवाह बायोडाटा / Marriage Biodata
        </h2>
      </div>

      {/* Photo */}
      {data.photoUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={data.photoUrl}
            alt="Profile"
            className="w-40 h-48 object-cover border-4 border-orange-500 rounded"
          />
        </div>
      )}

      {/* Personal Information */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-orange-600 mb-3 border-b-2 border-orange-200 pb-1">
          वैयक्तिक माहिती / Personal Information
        </h3>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
          <div><span className="font-semibold">नाव / Name:</span> {data.personalInfo.name}</div>
          <div><span className="font-semibold">जन्मतारीख / DOB:</span> {data.personalInfo.dateOfBirth}</div>
          
          {data.personalInfo.birthTime && (
            <div><span className="font-semibold">जन्म वेळ / Birth Time:</span> {data.personalInfo.birthTime}</div>
          )}
          
          {data.personalInfo.birthPlace && (
            <div><span className="font-semibold">जन्म ठिकाण / Birth Place:</span> {data.personalInfo.birthPlace}</div>
          )}
          
          <div><span className="font-semibold">धर्म / Religion:</span> {data.personalInfo.religion}</div>
          <div><span className="font-semibold">जात / Caste:</span> {data.personalInfo.caste}</div>
          
          {data.personalInfo.kuldaivat && (
            <div><span className="font-semibold">कुलदैवत / Kuldaivat:</span> {data.personalInfo.kuldaivat}</div>
          )}
          
          {data.personalInfo.gotra && (
            <div><span className="font-semibold">गोत्र / Gotra:</span> {data.personalInfo.gotra}</div>
          )}
          
          {data.personalInfo.rashi && (
            <div><span className="font-semibold">राशी / Rashi:</span> {data.personalInfo.rashi}</div>
          )}
          
          {data.personalInfo.nakshatra && (
            <div><span className="font-semibold">नक्षत्र / Nakshatra:</span> {data.personalInfo.nakshatra}</div>
          )}
          
          {data.personalInfo.gan && (
            <div><span className="font-semibold">गण / Gan:</span> {data.personalInfo.gan}</div>
          )}
          
          {data.personalInfo.nadi && (
            <div><span className="font-semibold">नाडी / Nadi:</span> {data.personalInfo.nadi}</div>
          )}
          
          {data.personalInfo.manglik && (
            <div><span className="font-semibold">मांगलिक / Manglik:</span> {data.personalInfo.manglik}</div>
          )}
          
          <div><span className="font-semibold">उंची / Height:</span> {data.personalInfo.height}</div>
          
          {data.personalInfo.colour && (
            <div><span className="font-semibold">वर्ण / Colour:</span> {data.personalInfo.colour}</div>
          )}
          
          {data.personalInfo.bloodGroup && (
            <div><span className="font-semibold">रक्तगट / Blood Group:</span> {data.personalInfo.bloodGroup}</div>
          )}
          
          <div><span className="font-semibold">शिक्षण / Education:</span> {data.personalInfo.education}</div>
          <div><span className="font-semibold">नोकरी/व्यवसाय / Job:</span> {data.personalInfo.jobOrBusiness}</div>
          <div><span className="font-semibold">उत्पन्न / Salary:</span> {data.personalInfo.salary}</div>
        </div>
      </section>

      {/* Family Information */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-orange-600 mb-3 border-b-2 border-orange-200 pb-1">
          कौटुंबिक माहिती / Family Information
        </h3>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
          <div><span className="font-semibold">वडिलांचे नाव / Father:</span> {data.familyInfo.fatherName}</div>
          
          {data.familyInfo.fatherJobOrBusiness && (
            <div><span className="font-semibold">वडिलांचा व्यवसाय / Father's Occupation:</span> {data.familyInfo.fatherJobOrBusiness}</div>
          )}
          
          <div><span className="font-semibold">आईचे नाव / Mother:</span> {data.familyInfo.motherName}</div>
          
          {data.familyInfo.motherJobOrBusiness && (
            <div><span className="font-semibold">आईचा व्यवसाय / Mother's Occupation:</span> {data.familyInfo.motherJobOrBusiness}</div>
          )}
          
          {data.familyInfo.sisters && data.familyInfo.sisters.length > 0 && (
            <div className="col-span-2">
              <span className="font-semibold">बहिणी / Sisters:</span> {data.familyInfo.sisters.map(s => `${s.name} (${s.maritalStatus})`).join(', ')}
            </div>
          )}
          
          {data.familyInfo.brothers && data.familyInfo.brothers.length > 0 && (
            <div className="col-span-2">
              <span className="font-semibold">भाऊ / Brothers:</span> {data.familyInfo.brothers.map(b => `${b.name} (${b.maritalStatus})`).join(', ')}
            </div>
          )}
          
          {data.familyInfo.mama && (
            <div><span className="font-semibold">मामा / Mama:</span> {data.familyInfo.mama}</div>
          )}
          
          {data.familyInfo.relativeSurnames && (
            <div className="col-span-2">
              <span className="font-semibold">नातेवाईक / Relatives:</span> {data.familyInfo.relativeSurnames}
            </div>
          )}
        </div>
      </section>

      {/* Contact Information */}
      <section>
        <h3 className="text-lg font-bold text-orange-600 mb-3 border-b-2 border-orange-200 pb-1">
          संपर्क माहिती / Contact Information
        </h3>
        <div className="text-sm space-y-2">
          <div><span className="font-semibold">पत्ता / Address:</span> {data.contact.address}</div>
          <div><span className="font-semibold">मोबाईल / Mobile:</span> {data.contact.mobileNumber}</div>
        </div>
      </section>
    </div>
  );
}
```

**Action:** Apply similar updates to Template2.tsx, Template3.tsx, and Template4.tsx

---

## Phase 8: Update Zustand Store

### Step 8.1: Update Store Configuration

**File:** `src/lib/store.ts` (UPDATE)

```typescript
import { create } from 'zustand';
import { BiodataData } from './types';

interface BiodataStore {
  biodataData: Partial<BiodataData>;
  currentStep: number;
  updateBiodata: (data: Partial<BiodataData>) => void;
  setStep: (step: number) => void;
  resetBiodata: () => void;
}

const initialState: Partial<BiodataData> = {
  templateId: 'template-1',
  deity: {
    name: '',
    showImage: false,
    imageUrl: '',
  },
  personalInfo: {
    name: '',
    dateOfBirth: '',
    religion: '',
    caste: '',
    height: '',
    education: '',
    jobOrBusiness: '',
    salary: '',
  },
  familyInfo: {
    fatherName: '',
    motherName: '',
    sisters: [],
    brothers: [],
  },
  contact: {
    address: '',
    mobileNumber: '',
  },
};

export const useBiodataStore = create<BiodataStore>((set) => ({
  biodataData: initialState,
  currentStep: 0,
  
  updateBiodata: (data) =>
    set((state) => ({
      biodataData: { ...state.biodataData, ...data },
    })),
  
  setStep: (step) => set({ currentStep: step }),
  
  resetBiodata: () =>
    set({
      biodataData: initialState,
      currentStep: 0,
    }),
}));
```

---

## Phase 9: Testing

### Step 9.1: Local Testing Checklist

Run through this checklist:

```bash
# Start dev server
npm run dev
```

#### Form Testing
- [ ] All 5 steps load without errors
- [ ] Deity selection works
- [ ] Custom deity name input appears when selected
- [ ] Deity image upload works
- [ ] All personal info fields render
- [ ] Required fields show asterisk (*)
- [ ] Validation errors appear for empty required fields
- [ ] Transliteration works (type "ram" → see "राम")
- [ ] Can add/remove sisters
- [ ] Can add/remove brothers
- [ ] Mobile number only accepts 10 digits
- [ ] Address accepts multi-line text
- [ ] Photo upload shows preview
- [ ] Can skip photo step
- [ ] Can go back to previous steps
- [ ] Progress bar updates correctly

#### PDF Testing
- [ ] PDF download works
- [ ] All entered data appears in PDF
- [ ] Marathi text renders correctly
- [ ] English text renders correctly
- [ ] Deity image shows (if uploaded)
- [ ] Photo shows (if uploaded)
- [ ] Layout looks professional
- [ ] File size is reasonable (<500KB)
- [ ] PDF prints well

#### Data Validation Testing
- [ ] Cannot proceed without name
- [ ] Cannot proceed without DOB
- [ ] Cannot proceed without religion
- [ ] Cannot proceed without caste
- [ ] Cannot proceed without height
- [ ] Cannot proceed without education
- [ ] Cannot proceed without job/business
- [ ] Cannot proceed without salary
- [ ] Cannot proceed without father name
- [ ] Cannot proceed without mother name
- [ ] Cannot proceed without address
- [ ] Cannot proceed without mobile number
- [ ] Invalid mobile shows error

### Step 9.2: Browser Console Check

Open browser console (F12) and ensure:
- No errors
- No warnings about missing dependencies
- Fonts load correctly

---

## Phase 10: Deployment

### Step 10.1: Build for Production

```bash
# Build the application
npm run build

# Test production build locally
npm start
```

### Step 10.2: Commit Changes

```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "Improve biodata app: better PDF quality, simplified form, add transliteration"

# Push to repository
git push origin main
```

### Step 10.3: Deploy to Vercel

Vercel will automatically deploy when you push to `main` branch.

#### Verify Deployment:
1. Go to your Vercel dashboard
2. Check deployment status
3. Visit the live URL
4. Test the application

---

## 🎉 Completion Checklist

Mark each phase as complete:

- [ ] Phase 1: Setup & Dependencies
- [ ] Phase 2: Update Type Definitions
- [ ] Phase 3: Improve PDF Generation
- [ ] Phase 4: Create Simplified Form Components
- [ ] Phase 5: Update Multi-Step Form
- [ ] Phase 6: Add Marathi Transliteration
- [ ] Phase 7: Update Templates
- [ ] Phase 8: Update Zustand Store
- [ ] Phase 9: Testing
- [ ] Phase 10: Deployment

---

## 📊 Summary of Changes

### What Changed:

**Form Structure:**
- Old: 6 steps → New: 5 steps
- Added: Deity image customization
- Added: Transliteration (English → Marathi)
- Improved: Clear validation with asterisks

**Data Structure:**
- Old: `personalDetails` → New: `personalInfo`
- Old: `familyDetails` → New: `familyInfo`
- Added: `deity` section
- Added: Detailed siblings array
- Removed: Partner preferences

**PDF Quality:**
- Old: html2canvas + jsPDF (pixelated)
- New: @react-pdf/renderer (vector, 10x better)

**User Experience:**
- Type in English, get Marathi
- Better progress indicator
- Optional photo upload
- Clearer required fields

---

## 🆘 Troubleshooting

### Issue: Fonts not loading
**Solution:** 
- Verify fonts in `/public/fonts/`
- Check exact filenames match
- Restart dev server

### Issue: Transliteration not working
**Solution:**
- Check internet connection
- Verify `react-transliterate` is installed
- Import CSS: `import 'react-transliterate/dist/index.css';`

### Issue: PDF not downloading
**Solution:**
- Check if all required fields have values
- Open browser console for errors
- Verify fonts are loaded

### Issue: Build fails
**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next
npm install
npm run build
```

---

## 📝 Final Notes

**Implementation Time:** ~100 minutes

**Difficulty:** Medium

**Benefits:**
- 10x better PDF quality
- Faster form completion (English → Marathi typing)
- Better user experience
- Clearer validation
- Professional appearance

---

**End of Master Implementation Guide**

🎉 Your Marathi Biodata application is now significantly improved!

For questions or issues, refer to the troubleshooting section or check the browser console for errors.

**Good luck with your implementation!** 🚀
