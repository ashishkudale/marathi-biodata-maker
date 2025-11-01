# Phase 1 Upgrade Progress - New Structure Implementation

## Current Status: IN PROGRESS

This document tracks the progress of upgrading the Marathi Biodata Maker to the new simplified structure as outlined in MASTER_IMPLEMENTATION_GUIDE.md.

---

## ✅ Completed Steps

### 1. Dependencies Installation
- ✅ Installed `@react-pdf/renderer` (already present)
- ✅ Installed `react-transliterate` with `--legacy-peer-deps`
- ✅ Created `/public/fonts/` directory

### 2. Type Definitions Updated
- ✅ Backed up old types to `types-old-backup.ts`
- ✅ Updated `src/lib/types.ts` with new structure:
  - New `BiodataData` interface with `deity`, `personalInfo`, `familyInfo`, `contact`
  - Removed old `personalDetails`, `familyDetails`, `education`, `partnerPreferences`
  - Added `DEITY_OPTIONS` constant
  - Added `REQUIRED_FIELDS` validation array
  - Kept `Template` and `User` interfaces for backward compatibility

### 3. Zustand Store Updated
- ✅ Updated `src/lib/store.ts` with new data structure
- ✅ Created `initialState` matching new types
- ✅ Maintained `saveToLocalStorage` and `loadDraft` functionality

### 4. Components Created
- ✅ Created `src/components/BiodataForm/steps/DeityStep.tsx`
  - Deity selection from predefined options
  - Custom deity name input
  - Deity image upload with preview
  - Toggle for showing image in biodata

---

## 🚧 Remaining Steps

### 5. Create Form Step Components

Need to create the following components with React Transliteration:

#### A. PersonalInfoStep.tsx
**File:** `src/components/BiodataForm/steps/PersonalInfoStep.tsx`
- Use `ReactTransliterate` for Marathi fields:
  - name, birthPlace, kuldaivat, gotra, rashi, nakshatra
- Regular inputs for: dateOfBirth, birthTime, religion, caste, height, education, jobOrBusiness, salary
- Dropdowns for: gan, nadi, manglik, colour, bloodGroup
- Mark required fields with asterisk (*)
- Use `react-hook-form` for validation

#### B. FamilyInfoStep.tsx
**File:** `src/components/BiodataForm/steps/FamilyInfoStep.tsx`
- Use `ReactTransliterate` for: fatherName, motherName, mama
- Regular inputs for: fatherJobOrBusiness, motherJobOrBusiness, relativeSurnames
- Dynamic arrays with `useFieldArray`:
  - Sisters: name + maritalStatus (Married/Unmarried)
  - Brothers: name + maritalStatus (Married/Unmarried)
- Add/Remove buttons for siblings

#### C. ContactStep.tsx
**File:** `src/components/BiodataForm/steps/ContactStep.tsx`
- Textarea for address (required)
- Input for mobileNumber with validation (10 digits, required)
- Simple step with validation

#### D. PhotoStep.tsx
**File:** `src/components/BiodataForm/steps/PhotoStep.tsx`
- File upload with preview
- Optional - can skip
- File size validation (max 2MB)
- Image type validation
- Remove/Change photo options

### 6. Update MultiStepForm
**File:** `src/components/BiodataForm/MultiStepForm.tsx`
- Replace old 6-step flow with new 5-step flow:
  1. DeityStep
  2. PersonalInfoStep
  3. FamilyInfoStep
  4. ContactStep
  5. PhotoStep
- Update progress bar to show 5 steps
- Remove references to old step components

### 7. Update Templates

Need to update all 4 templates to use new data structure:

#### Changes Required for Each Template:
- **Header:** Use `data.deity?.name` and `data.deity?.imageUrl`
- **Personal Info:** Access via `data.personalInfo.name`, `data.personalInfo.religion`, etc.
- **Family Info:** Access via `data.familyInfo.fatherName`, map `sisters`, `brothers` arrays
- **Contact:** Use `data.contact.address` and `data.contact.mobileNumber`
- **Remove:** All references to `personalDetails`, `familyDetails`, `education`, `partnerPreferences`

#### Templates to Update:
1. ✏️ `src/templates/Template1.tsx` - Traditional
2. ✏️ `src/templates/Template2.tsx` - Modern Minimal
3. ✏️ `src/templates/Template3.tsx` - With Photo
4. ✏️ `src/templates/Template4.tsx` - Plain Text

### 8. Create Improved PDF Generator
**File:** `src/utils/pdfGenerator.tsx` (rename from .ts)
- Use `@react-pdf/renderer` for vector-based PDFs
- Register Noto Sans Devanagari fonts (use Google Fonts CDN URLs)
- Create `BiodataPDFDocument` component
- Create `DownloadPDFButton` component
- Support all new data fields
- Handle optional fields gracefully

### 9. Add Transliteration CSS
**File:** `src/app/globals.css`
- Import: `@import 'react-transliterate/dist/index.css';`
- Add custom styles for suggestions dropdown
- Style active suggestions
- Ensure Marathi text renders properly

### 10. Update Create Page
**File:** `src/app/create/page.tsx`
- Ensure it uses updated MultiStepForm
- Update any direct references to old data structure
- Test with new store

### 11. Update Dashboard/Firestore Services
**Files:** `src/lib/biodataService.ts`, `src/app/dashboard/page.tsx`
- Update to handle new data structure
- Add migration logic for old saved biodatas (optional)
- Test save/load functionality

---

## 📋 Implementation Order

Recommended order to minimize breaking changes:

1. ✅ **Types & Store** (DONE)
2. ✅ **DeityStep** (DONE)
3. ⏹️ **PersonalInfoStep** - Next critical step
4. ⏹️ **FamilyInfoStep** - Next
5. ⏹️ **ContactStep** - Simple, quick
6. ⏹️ **PhotoStep** - Simple, quick
7. ⏹️ **Update MultiStepForm** - Wire all steps together
8. ⏹️ **Add Transliteration CSS** - Required for steps 3-4
9. ⏹️ **Update Templates** - Can be done in parallel
10. ⏹️ **PDF Generator** - Final enhancement
11. ⏹️ **Testing** - Comprehensive

---

## 🔧 Testing Checklist

Once implementation is complete, test:

- [ ] All 5 form steps load without errors
- [ ] Transliteration works (type "ram" → see "राम")
- [ ] Deity selection and image upload works
- [ ] Can add/remove siblings dynamically
- [ ] Validation shows for required fields
- [ ] Can navigate back/forward through steps
- [ ] Progress bar updates correctly
- [ ] Data persists in Zustand store
- [ ] Templates render new data structure
- [ ] PDF download works with new data
- [ ] Marathi text renders in PDF
- [ ] Can save biodata to Firestore
- [ ] Can load saved biodata
- [ ] Responsive on mobile devices

---

## ⚠️ Breaking Changes

**Important:** This upgrade changes the data structure significantly.

### Old Structure:
```typescript
{
  personalDetails: { fullName, dateOfBirth, ... },
  familyDetails: { fatherName, ... },
  education: { qualification, occupation, ... },
  partnerPreferences: { ... }
}
```

### New Structure:
```typescript
{
  deity: { name, imageUrl, showImage },
  personalInfo: { name, dateOfBirth, religion, caste, education, jobOrBusiness, salary, ... },
  familyInfo: { fatherName, sisters: [], brothers: [], ... },
  contact: { address, mobileNumber }
}
```

### Migration Strategy:
- Old saved biodatas may not load correctly
- Options:
  1. Add data migration function
  2. Clear localStorage and start fresh
  3. Maintain both structures (complex)

**Recommendation:** For now, implement new structure. Add migration later if needed.

---

## 📚 Key References

- **Main Guide:** `MASTER_IMPLEMENTATION_GUIDE.md`
- **Old Types Backup:** `src/lib/types-old-backup.ts`
- **React Transliterate Docs:** https://www.npmjs.com/package/react-transliterate
- **@react-pdf/renderer Docs:** https://react-pdf.org/

---

## 🎯 Next Immediate Steps

1. Create `PersonalInfoStep.tsx` with transliteration
2. Create `FamilyInfoStep.tsx` with dynamic sibling arrays
3. Create `ContactStep.tsx` and `PhotoStep.tsx`
4. Update `MultiStepForm.tsx` to use new 5-step flow
5. Add transliteration CSS to `globals.css`
6. Test form flow end-to-end

---

## 📝 Notes

- Using `--legacy-peer-deps` for `react-transliterate` due to React 18 compatibility
- Google Fonts CDN used instead of local font files for simplicity
- Maintaining backward compatibility with `Template` and `User` interfaces
- Auto-save to localStorage still functional via Zustand store

---

**Last Updated:** 2025-11-01
**Status:** 30% Complete (Types, Store, DeityStep done)
**Next:** Create remaining form step components
