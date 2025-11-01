# Marathi Biodata Maker - Project Overview

## 📋 What is This Project?

A modern web application for creating beautiful, professional Marathi marriage biodata (matrimonial resumes). Users can fill out a multi-step form, choose from multiple templates, preview in real-time, and download as PDF.

**Live URL:** https://marathi-biodata-maker.vercel.app (or your Vercel deployment)

---

## 🎯 Key Features

### Core Features (MVP - Phase 1)
- ✅ **Multi-step Form** - 6-step guided form for easy data entry
- ✅ **Live Preview** - See biodata update in real-time as you type
- ✅ **4 Templates** - Traditional, Modern, With Photo, and Plain Text
- ✅ **PDF Download** - Export biodata as print-ready PDF
- ✅ **Bilingual Support** - Marathi and English fields
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Header Customization** - Choose deity/invocation text

### Authentication Features (Phase 2)
- ✅ **Google Sign-In** - One-click authentication
- ✅ **Email/Password Auth** - Traditional signup/login
- ✅ **User Dashboard** - Manage saved biodatas
- ✅ **Save & Edit** - Store biodatas in cloud (Firebase Firestore)
- ✅ **User Profile** - Account management
- ✅ **Protected Routes** - Secure user data

---

## 🏗️ Technical Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** React Icons
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion

### Backend & Services
- **Authentication:** Firebase Auth (Google OAuth, Email/Password)
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage (for photos)
- **Hosting:** Vercel

### PDF Generation
- **Libraries:** jsPDF + html2canvas
- **Alternative:** @react-pdf/renderer

---

## 📁 Project Structure

```
marathi-biodata-maker/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Landing page (homepage)
│   │   ├── create/page.tsx           # Biodata creator page
│   │   ├── dashboard/page.tsx        # User dashboard (saved biodatas)
│   │   ├── layout.tsx                # Root layout with AuthProvider
│   │   └── globals.css               # Global styles + Marathi fonts
│   │
│   ├── components/                   # React components
│   │   ├── Auth/                     # Authentication components
│   │   │   ├── AuthModal.tsx         # Login/signup modal
│   │   │   ├── AuthProvider.tsx      # Auth context provider
│   │   │   └── UserMenu.tsx          # User profile dropdown
│   │   │
│   │   ├── BiodataForm/              # Form components
│   │   │   ├── MultiStepForm.tsx     # Form stepper/navigation
│   │   │   └── steps/                # Individual form steps
│   │   │       ├── HeaderStep.tsx    # Deity/header customization
│   │   │       ├── PersonalDetailsStep.tsx
│   │   │       ├── FamilyDetailsStep.tsx
│   │   │       ├── EducationStep.tsx
│   │   │       ├── ContactStep.tsx
│   │   │       └── PartnerPreferencesStep.tsx
│   │   │
│   │   ├── TemplatePreview/          # Live preview
│   │   │   └── PreviewPanel.tsx      # Real-time biodata preview
│   │   │
│   │   ├── TemplateSelector/         # Template chooser
│   │   │   └── TemplateGallery.tsx   # Template selection UI
│   │   │
│   │   └── DownloadShare/            # Export actions
│   │       └── ActionButtons.tsx     # Download & Print buttons
│   │
│   ├── templates/                    # Biodata templates
│   │   ├── Template1.tsx             # Traditional (orange borders)
│   │   ├── Template2.tsx             # Modern Minimal
│   │   ├── Template3.tsx             # With Photo
│   │   └── Template4.tsx             # Plain Text (printer-friendly)
│   │
│   ├── lib/                          # Core utilities & services
│   │   ├── firebase.ts               # Firebase initialization
│   │   ├── authService.ts            # Authentication functions
│   │   ├── biodataService.ts         # Firestore CRUD operations
│   │   ├── store.ts                  # Zustand state management
│   │   └── types.ts                  # TypeScript interfaces
│   │
│   └── utils/                        # Helper utilities
│       └── pdfGenerator.ts           # PDF export logic
│
├── public/                           # Static assets
│
├── .env.local                        # Local environment variables (NOT in Git)
├── .env.example                      # Template for environment variables
├── .gitignore                        # Git ignore rules
│
├── Configuration Files
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind CSS config
├── next.config.ts                    # Next.js config
│
└── Documentation
    ├── PROJECT_OVERVIEW.md           # This file
    ├── MARATHI_BIODATA_MVP_TASKS.md  # Phase 1 development guide
    ├── PHASE_2_AUTHENTICATION_ACTION_PLAN.md  # Phase 2 auth guide
    └── VERCEL_ENV_SETUP.md           # Deployment instructions
```

---

## 🔑 Key Components Explained

### 1. Pages (Routes)

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Landing page with features & CTA |
| `/create` | `app/create/page.tsx` | Main biodata creator interface |
| `/dashboard` | `app/dashboard/page.tsx` | User's saved biodatas (auth required) |

### 2. Form System

**Multi-Step Form Flow:**
1. **Header Step** - Choose deity/invocation (श्री गणेशाय नमः, etc.)
2. **Personal Details** - Name, DOB, height, birth time, gotra, devak, etc.
3. **Family Details** - Parents, siblings, family type
4. **Education & Career** - Qualification, occupation, income
5. **Contact Info** - Phone, email, address
6. **Partner Preferences** - Desired qualities in partner

**Form Features:**
- Progress indicator showing current step
- Previous/Next navigation
- Real-time validation with React Hook Form + Zod
- Auto-save to Zustand store for live preview

### 3. Template System

**4 Available Templates:**

| Template | Style | Use Case |
|----------|-------|----------|
| **Template1** | Traditional with orange borders | Classic Marathi biodata |
| **Template2** | Modern minimal design | Clean, professional look |
| **Template3** | With photo section | Include candidate photo |
| **Template4** | Plain text monospace | Printer-friendly, no styling |

**Template Features:**
- Bilingual display (Marathi/English)
- Customizable header text
- Conditional field rendering
- Centered text layout
- Print-optimized

### 4. State Management (Zustand)

**Store Structure (`lib/store.ts`):**
```typescript
{
  biodataData: {
    header: { text, showSymbols },
    personalDetails: { ... },
    familyDetails: { ... },
    education: { ... },
    contact: { ... },
    partnerPreferences: { ... },
    templateId: 'template-1'
  },
  currentStep: 0,
  updateBiodata: (data) => { ... },
  setStep: (step) => { ... }
}
```

### 5. Firebase Services

**Authentication (`lib/authService.ts`):**
- `signInWithGoogle()` - Google OAuth login
- `signInWithEmail()` - Email/password login
- `signUpWithEmail()` - Create account
- `logout()` - Sign out
- `resetPassword()` - Password recovery

**Database (`lib/biodataService.ts`):**
- `saveBiodata()` - Create new biodata
- `updateBiodata()` - Update existing
- `getBiodata()` - Fetch single biodata
- `getUserBiodatas()` - Get all user biodatas
- `deleteBiodata()` - Delete biodata

### 6. PDF Generation

**Implementation (`utils/pdfGenerator.ts`):**
- Uses `html2canvas` to capture biodata preview
- Converts canvas to PDF with `jsPDF`
- Supports A4 page size
- Handles multi-page content
- Includes print functionality

---

## 🎨 Design Features

### Typography
- **Marathi Font:** Baloo Bhai 2 (cursive, traditional)
- **English Font:** Mukta (clean, readable)
- **Formal Marathi:** Tiro Devanagari Marathi (serif)
- **Plain Text:** System monospace

### Color Scheme
- **Primary:** Orange (#F97316) - Traditional Indian color
- **Secondary:** Gray scales for text
- **Backgrounds:** White, light orange gradients

### Responsive Breakpoints
- **Mobile:** < 768px (stacked layout)
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px (side-by-side form & preview)

---

## 📊 Data Model

### BiodataData Interface (TypeScript)

```typescript
interface BiodataData {
  id?: string;                    // Firestore document ID
  userId?: string;                // User who created it

  header?: {
    text: string;                 // Deity/invocation text
    showSymbols: boolean;         // Show || symbols
  };

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

  education: {
    qualification: string;
    occupation: string;
    company?: string;
    income?: string;
    workLocation?: string;
  };

  contact: {
    phone: string;
    alternatePhone?: string;
    email?: string;
    address: string;
  };

  partnerPreferences?: {
    ageRange?: string;
    heightRange?: string;
    education?: string;
    occupation?: string;
    other?: string;
  };

  photoUrl?: string;              // Firebase Storage URL
  templateId: string;             // Selected template

  // Metadata
  createdAt?: Date;
  updatedAt?: Date;
}
```

---

## 🔒 Security & Environment Variables

### Environment Variables (`.env.local`)

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Security Features:**
- ✅ `.env.local` in `.gitignore` (not committed)
- ✅ Firebase credentials via environment variables
- ✅ Firestore security rules (users can only access their data)
- ✅ Protected routes (auth required for dashboard)
- ✅ `.env.example` template for developers

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Biodatas: anyone can read, only owner can edit/delete
    match /biodatas/{biodataId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## 🚀 Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# Opens at http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

### Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables (see VERCEL_ENV_SETUP.md)
4. Deploy automatically on push to `main`

---

## 📦 Dependencies Overview

### Core Dependencies
- **next** (^15) - React framework with App Router
- **react** (^18) - UI library
- **typescript** (^5) - Type safety

### UI & Styling
- **tailwindcss** (^3.4) - Utility-first CSS
- **react-icons** (^5.5) - Icon library
- **framer-motion** (^12.23) - Animations
- **clsx** (^2.1) - Conditional classnames

### Forms & Validation
- **react-hook-form** (^7.65) - Form handling
- **@hookform/resolvers** (^5.2) - Form validation
- **zod** (^4.1) - Schema validation

### Firebase
- **firebase** (^12.4) - Auth, Firestore, Storage

### State Management
- **zustand** (^5.0) - Lightweight state management

### PDF Generation
- **jspdf** (^3.0) - PDF creation
- **html2canvas** (^1.4) - HTML to canvas
- **@react-pdf/renderer** (^4.3) - Alternative PDF library

### User Experience
- **react-hot-toast** (^2.6) - Toast notifications

---

## 📈 Features Roadmap

### ✅ Completed (MVP)
- Multi-step biodata form
- Live preview with 4 templates
- PDF download
- Google & Email authentication
- User dashboard
- Save/Edit/Delete biodatas
- Header customization
- Responsive design
- Environment variable security

### 🚧 Future Enhancements
- Photo upload to Firebase Storage
- WhatsApp direct share
- Email sharing
- More templates (10+ total)
- Marathi keyboard/transliteration
- Dark mode
- Print preview mode
- Biodata analytics
- Premium templates (paywall)
- Custom branding
- Multi-language support (Hindi, Gujarati)
- QR code generation
- Biodata privacy settings

---

## 🎓 Learning Resources

### Technologies Used
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

### Project Documentation
- `MARATHI_BIODATA_MVP_TASKS.md` - Phase 1 development guide
- `PHASE_2_AUTHENTICATION_ACTION_PLAN.md` - Authentication setup
- `VERCEL_ENV_SETUP.md` - Deployment instructions

---

## 🐛 Common Issues & Solutions

### Issue: Firebase "Invalid API Key"
**Solution:** Check environment variables in Vercel/local `.env.local`

### Issue: "Module not found" errors
**Solution:** Run `npm install` to ensure dependencies are installed

### Issue: Form data not saving
**Solution:** Check Firebase Firestore rules and authentication status

### Issue: PDF not downloading
**Solution:** Check browser console for errors, ensure preview element exists

### Issue: Templates not switching
**Solution:** Verify `templateId` in Zustand store is updating

---

## 👥 Contributing

This is a personal project, but contributions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is private/personal. Contact owner for usage rights.

---

## 📞 Support

For issues or questions:
- Check documentation files
- Review Firebase Console for auth/database issues
- Check Vercel deployment logs
- Review browser console for client-side errors

---

## 🙏 Acknowledgments

- **Firebase** - Backend services
- **Vercel** - Hosting platform
- **Next.js Team** - Amazing framework
- **Tailwind CSS** - Styling system
- **Google Fonts** - Marathi typography

---

**Built with ❤️ for the Marathi community**

---

## Quick Start Guide

```bash
# 1. Clone repository
git clone <your-repo-url>
cd marathi-biodata-maker

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# 4. Run development server
npm run dev

# 5. Open browser
# Visit http://localhost:3000
```

---

**Last Updated:** November 2025
**Version:** 0.1.0
**Status:** Production Ready
