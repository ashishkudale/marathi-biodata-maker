# Marathi Biodata Maker - MVP Development Tasks

## 🎯 MVP Goal
Build a functional Marathi biodata maker with core features: form input, live preview, 3-5 templates, PDF download, and basic sharing capabilities.

---

## 📦 Phase 1: Project Setup & Configuration

### Task 1.1: Initialize Next.js Project
```bash
# Create Next.js project with TypeScript
npx create-next-app@latest marathi-biodata-maker --typescript --tailwind --app --use-npm

# Navigate to project
cd marathi-biodata-maker

# Install core dependencies
npm install firebase zustand framer-motion
npm install @react-pdf/renderer
npm install react-icons
npm install clsx
```

### Task 1.2: Setup Firebase Configuration
Create `src/lib/firebase.ts`:
```typescript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration from environment variables
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
```

**Important:** Create a `.env.local` file in your project root with your Firebase credentials. See `.env.example` for required variables. Never commit `.env.local` to version control.

### Task 1.3: Setup Marathi Fonts
Create `src/app/globals.css` and add:
```css
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400;500;600;700&family=Mukta:wght@300;400;500;600;700&family=Tiro+Devanagari+Marathi&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    font-family: 'Mukta', sans-serif;
  }
  
  .font-marathi {
    font-family: 'Baloo Bhai 2', cursive;
  }
  
  .font-marathi-formal {
    font-family: 'Tiro Devanagari Marathi', serif;
  }
}
```

### Task 1.4: Create Project Folder Structure
```
src/
├── app/
│   ├── page.tsx (Landing page)
│   ├── create/
│   │   └── page.tsx (Biodata creator)
│   └── globals.css
├── components/
│   ├── BiodataForm/
│   ├── TemplatePreview/
│   ├── TemplateSelector/
│   └── UI/
├── lib/
│   ├── firebase.ts
│   ├── store.ts (Zustand store)
│   └── types.ts
├── templates/
│   └── (template configurations)
└── utils/
    └── pdfGenerator.ts
```

### Task 1.5: Create TypeScript Types
Create `src/lib/types.ts`:
```typescript
export interface BiodataData {
  id?: string;
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
```

---

## 📝 Phase 2: Biodata Form (Core Feature)

### Task 2.1: Create Zustand Store
Create `src/lib/store.ts`:
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

export const useBiodataStore = create<BiodataStore>((set) => ({
  biodataData: {
    personalDetails: {},
    familyDetails: {},
    education: {},
    contact: {},
    templateId: 'template-1',
    language: 'both',
  },
  currentStep: 0,
  updateBiodata: (data) =>
    set((state) => ({
      biodataData: { ...state.biodataData, ...data },
    })),
  setStep: (step) => set({ currentStep: step }),
  resetBiodata: () =>
    set({
      biodataData: {
        personalDetails: {},
        familyDetails: {},
        education: {},
        contact: {},
        templateId: 'template-1',
        language: 'both',
      },
      currentStep: 0,
    }),
}));
```

### Task 2.2: Create Multi-Step Form Component
Create `src/components/BiodataForm/MultiStepForm.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { useBiodataStore } from '@/lib/store';
import PersonalDetailsStep from './steps/PersonalDetailsStep';
import FamilyDetailsStep from './steps/FamilyDetailsStep';
import EducationStep from './steps/EducationStep';
import ContactStep from './steps/ContactStep';
import PartnerPreferencesStep from './steps/PartnerPreferencesStep';

const steps = [
  { id: 0, title: 'Personal Details', component: PersonalDetailsStep },
  { id: 1, title: 'Family Details', component: FamilyDetailsStep },
  { id: 2, title: 'Education & Career', component: EducationStep },
  { id: 3, title: 'Contact Info', component: ContactStep },
  { id: 4, title: 'Partner Preferences', component: PartnerPreferencesStep },
];

export default function MultiStepForm() {
  const { currentStep, setStep } = useBiodataStore();
  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${
                index < steps.length - 1 ? 'flex-1' : ''
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= index
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    currentStep > index ? 'bg-orange-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-lg font-semibold text-gray-700">
          {steps[currentStep].title}
        </p>
      </div>

      {/* Form Step */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <CurrentStepComponent />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition"
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
        </button>
      </div>
    </div>
  );
}
```

### Task 2.3: Create Form Step Components
Create individual step components in `src/components/BiodataForm/steps/`:

**PersonalDetailsStep.tsx:**
```typescript
'use client';

import { useBiodataStore } from '@/lib/store';

export default function PersonalDetailsStep() {
  const { biodataData, updateBiodata } = useBiodataStore();

  const handleChange = (field: string, value: any) => {
    updateBiodata({
      personalDetails: {
        ...biodataData.personalDetails,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name (English) *
          </label>
          <input
            type="text"
            value={biodataData.personalDetails?.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            पूर्ण नाव (मराठी)
          </label>
          <input
            type="text"
            value={biodataData.personalDetails?.fullNameMarathi || ''}
            onChange={(e) => handleChange('fullNameMarathi', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-marathi"
            placeholder="पूर्ण नाव टाका"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={biodataData.personalDetails?.dateOfBirth || ''}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Time
          </label>
          <input
            type="time"
            value={biodataData.personalDetails?.birthTime || ''}
            onChange={(e) => handleChange('birthTime', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Place *
          </label>
          <input
            type="text"
            value={biodataData.personalDetails?.birthPlace || ''}
            onChange={(e) => handleChange('birthPlace', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="City, District"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age *
          </label>
          <input
            type="number"
            value={biodataData.personalDetails?.age || ''}
            onChange={(e) => handleChange('age', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="25"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height *
          </label>
          <input
            type="text"
            value={biodataData.personalDetails?.height || ''}
            onChange={(e) => handleChange('height', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="5'6&quot;"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Group
          </label>
          <select
            value={biodataData.personalDetails?.bloodGroup || ''}
            onChange={(e) => handleChange('bloodGroup', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Complexion
          </label>
          <select
            value={biodataData.personalDetails?.complexion || ''}
            onChange={(e) => handleChange('complexion', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="Fair">Fair</option>
            <option value="Wheatish">Wheatish</option>
            <option value="Dark">Dark</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manglik
          </label>
          <select
            value={biodataData.personalDetails?.manglik || ''}
            onChange={(e) => handleChange('manglik', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Anshik">Anshik</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gotra
          </label>
          <input
            type="text"
            value={biodataData.personalDetails?.gotra || ''}
            onChange={(e) => handleChange('gotra', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter gotra"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Devak
          </label>
          <input
            type="text"
            value={biodataData.personalDetails?.devak || ''}
            onChange={(e) => handleChange('devak', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter devak"
          />
        </div>
      </div>
    </div>
  );
}
```

**Note:** Create similar components for:
- `FamilyDetailsStep.tsx`
- `EducationStep.tsx`
- `ContactStep.tsx`
- `PartnerPreferencesStep.tsx`

Following the same pattern with respective fields.

---

## 👁️ Phase 3: Live Preview Component

### Task 3.1: Create Template Preview Component
Create `src/components/TemplatePreview/PreviewPanel.tsx`:
```typescript
'use client';

import { useBiodataStore } from '@/lib/store';
import Template1 from '@/templates/Template1';
import Template2 from '@/templates/Template2';
import Template3 from '@/templates/Template3';

const templates: { [key: string]: React.ComponentType<any> } = {
  'template-1': Template1,
  'template-2': Template2,
  'template-3': Template3,
};

export default function PreviewPanel() {
  const { biodataData } = useBiodataStore();
  const TemplateComponent = templates[biodataData.templateId || 'template-1'];

  return (
    <div className="sticky top-6 bg-gray-50 rounded-lg shadow-lg p-6 max-h-[calc(100vh-100px)] overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Preview</h3>
        <p className="text-sm text-gray-600">See your biodata in real-time</p>
      </div>

      <div className="bg-white rounded-lg shadow-md transform scale-90 origin-top">
        <TemplateComponent data={biodataData} />
      </div>
    </div>
  );
}
```

### Task 3.2: Create Basic Template Designs
Create `src/templates/Template1.tsx` (Traditional Design):
```typescript
import { BiodataData } from '@/lib/types';

interface TemplateProps {
  data: Partial<BiodataData>;
}

export default function Template1({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 font-marathi">
      {/* Header */}
      <div className="text-center border-b-4 border-orange-500 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-2">
          || श्री गणेशाय नमः ||
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800">
          विवाह सूचक माहिती पत्रक
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-3"></div>
      </div>

      {/* Personal Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
          वैयक्तिक माहिती
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-semibold">नाव:</span>{' '}
            {data.personalDetails?.fullNameMarathi || data.personalDetails?.fullName || 'N/A'}
          </div>
          <div>
            <span className="font-semibold">जन्मतारीख:</span>{' '}
            {data.personalDetails?.dateOfBirth || 'N/A'}
          </div>
          <div>
            <span className="font-semibold">वय:</span>{' '}
            {data.personalDetails?.age || 'N/A'} वर्षे
          </div>
          <div>
            <span className="font-semibold">उंची:</span>{' '}
            {data.personalDetails?.height || 'N/A'}
          </div>
          <div>
            <span className="font-semibold">जन्मस्थळ:</span>{' '}
            {data.personalDetails?.birthPlace || 'N/A'}
          </div>
          {data.personalDetails?.bloodGroup && (
            <div>
              <span className="font-semibold">रक्तगट:</span>{' '}
              {data.personalDetails.bloodGroup}
            </div>
          )}
        </div>
      </div>

      {/* Family Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
          कौटुंबिक माहिती
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-semibold">वडीलांचे नाव:</span>{' '}
            {data.familyDetails?.fatherName || 'N/A'}
          </div>
          <div>
            <span className="font-semibold">व्यवसाय:</span>{' '}
            {data.familyDetails?.fatherOccupation || 'N/A'}
          </div>
          <div>
            <span className="font-semibold">आईचे नाव:</span>{' '}
            {data.familyDetails?.motherName || 'N/A'}
          </div>
          {data.familyDetails?.brothers !== undefined && (
            <div>
              <span className="font-semibold">भाऊ:</span>{' '}
              {data.familyDetails.brothers} (विवाहित: {data.familyDetails.brothersMarried || 0})
            </div>
          )}
        </div>
      </div>

      {/* Education & Career */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
          शिक्षण आणि व्यवसाय
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-semibold">शिक्षण:</span>{' '}
            {data.education?.qualification || 'N/A'}
          </div>
          <div>
            <span className="font-semibold">व्यवसाय:</span>{' '}
            {data.education?.occupation || 'N/A'}
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
          संपर्क माहिती
        </h3>
        <div className="text-sm space-y-2">
          <div>
            <span className="font-semibold">मोबाईल:</span>{' '}
            {data.contact?.phone || 'N/A'}
          </div>
          <div>
            <span className="font-semibold">पत्ता:</span>{' '}
            {data.contact?.address || 'N/A'}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t-2 border-orange-300">
        <p className="text-sm text-gray-600">
          Created with MarathiBiodata.com
        </p>
      </div>
    </div>
  );
}
```

Create similar templates:
- `Template2.tsx` (Modern Minimal)
- `Template3.tsx` (With Photo)

---

## 🎨 Phase 4: Template Selector

### Task 4.1: Create Template Selector Component
Create `src/components/TemplateSelector/TemplateGallery.tsx`:
```typescript
'use client';

import { useBiodataStore } from '@/lib/store';
import Image from 'next/image';

const templates = [
  {
    id: 'template-1',
    name: 'Traditional',
    thumbnail: '/templates/template-1-thumb.png',
    isPremium: false,
  },
  {
    id: 'template-2',
    name: 'Modern Minimal',
    thumbnail: '/templates/template-2-thumb.png',
    isPremium: false,
  },
  {
    id: 'template-3',
    name: 'With Photo',
    thumbnail: '/templates/template-3-thumb.png',
    isPremium: false,
  },
];

export default function TemplateGallery() {
  const { biodataData, updateBiodata } = useBiodataStore();

  const handleSelectTemplate = (templateId: string) => {
    updateBiodata({ templateId });
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Choose Template
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelectTemplate(template.id)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              biodataData.templateId === template.id
                ? 'border-orange-500 shadow-lg'
                : 'border-gray-200 hover:border-orange-300'
            }`}
          >
            <div className="aspect-[3/4] bg-gray-100 relative">
              {/* Add template thumbnail images */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Template Preview
              </div>
            </div>
            <div className="p-3 bg-white">
              <p className="font-semibold text-sm text-center">
                {template.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 📥 Phase 5: PDF Download & Share

### Task 5.1: Create PDF Generator Utility
Create `src/utils/pdfGenerator.ts`:
```typescript
import { BiodataData } from '@/lib/types';

export async function generatePDF(data: Partial<BiodataData>): Promise<Blob> {
  // For MVP, we'll use html2pdf or browser print
  // This is a placeholder - implement based on chosen library
  
  const element = document.getElementById('biodata-preview');
  
  if (!element) {
    throw new Error('Preview element not found');
  }

  // Using browser's print to PDF as simplest MVP solution
  window.print();
  
  // For production, use libraries like:
  // - @react-pdf/renderer
  // - jsPDF
  // - html2canvas + jsPDF
  
  return new Blob();
}

export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
```

### Task 5.2: Create Download & Share Component
Create `src/components/DownloadShare/ActionButtons.tsx`:
```typescript
'use client';

import { useBiodataStore } from '@/lib/store';
import { FiDownload, FiShare2 } from 'react-icons/fi';
import { useState } from 'react';

export default function ActionButtons() {
  const { biodataData } = useBiodataStore();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Trigger browser print dialog
      window.print();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const text = `Check out my biodata: ${biodataData.personalDetails?.fullName}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Biodata',
          text: text,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback: Copy link
      alert('Share functionality - coming soon!');
    }
  };

  return (
    <div className="flex gap-4 mt-6">
      <button
        onClick={handleDownloadPDF}
        disabled={isDownloading}
        className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <FiDownload className="w-5 h-5" />
        {isDownloading ? 'Downloading...' : 'Download PDF'}
      </button>
      
      <button
        onClick={handleShare}
        className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2"
      >
        <FiShare2 className="w-5 h-5" />
        Share
      </button>
    </div>
  );
}
```

---

## 🏠 Phase 6: Landing Page

### Task 6.1: Create Landing Page
Create `src/app/page.tsx`:
```typescript
import Link from 'next/link';
import { FiEdit3, FiDownload, FiShare2, FiLayout } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Beautiful
            <span className="text-orange-500"> Marathi Biodata</span>
            <br />
            in Minutes
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Modern, professional, and traditional biodata templates.
            <br />
            Free to use. No signup required.
          </p>
          <Link
            href="/create"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition shadow-lg"
          >
            Create Biodata Now →
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-8 mt-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiEdit3 className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy to Use</h3>
            <p className="text-gray-600 text-sm">
              Simple step-by-step form to fill your details
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLayout className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Beautiful Templates</h3>
            <p className="text-gray-600 text-sm">
              Choose from traditional and modern designs
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiDownload className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Download PDF</h3>
            <p className="text-gray-600 text-sm">
              Get print-ready PDF instantly
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShare2 className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Sharing</h3>
            <p className="text-gray-600 text-sm">
              Share via WhatsApp or email
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-500 text-white py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Biodata?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            It's free, fast, and easy!
          </p>
          <Link
            href="/create"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </div>
  );
}
```

---

## 🎯 Phase 7: Create Page Layout

### Task 7.1: Build Main Creator Page
Create `src/app/create/page.tsx`:
```typescript
'use client';

import MultiStepForm from '@/components/BiodataForm/MultiStepForm';
import PreviewPanel from '@/components/TemplatePreview/PreviewPanel';
import TemplateGallery from '@/components/TemplateSelector/TemplateGallery';
import ActionButtons from '@/components/DownloadShare/ActionButtons';

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Create Your Marathi Biodata
        </h1>

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
    </div>
  );
}
```

---

## ✅ MVP Completion Checklist

After completing all phases, verify:

- [ ] Project setup complete with all dependencies installed
- [ ] Firebase configuration working
- [ ] Marathi fonts loading correctly
- [ ] Multi-step form functioning
- [ ] All 5 form steps created and working
- [ ] Live preview updating in real-time
- [ ] At least 3 templates created
- [ ] Template switching works
- [ ] PDF download functional (even if using browser print)
- [ ] Share button present (basic functionality)
- [ ] Landing page complete with CTA
- [ ] Creator page layout responsive
- [ ] Mobile view optimized
- [ ] No console errors

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

---

## 📝 Next Steps After MVP

Once MVP is working:
1. Improve PDF generation (use proper library)
2. Add Firebase save functionality
3. Implement WhatsApp direct share
4. Add photo upload feature
5. Create more templates
6. Add Marathi transliteration
7. Implement premium features
8. Add payment gateway

---

## 💡 Tips for Kodu.ai

- Start with Phase 1 completely before moving to Phase 2
- Test each component individually
- Use the preview panel to debug form data flow
- Keep components small and focused
- Use Tailwind classes for quick styling
- Test mobile responsiveness continuously

---

Good luck building! 🎉
