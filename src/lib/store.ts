import { create } from 'zustand';
import { BiodataData } from './types';
import { saveToLocalStorage, loadFromLocalStorage } from './biodataService';

interface BiodataStore {
  biodataData: Partial<BiodataData>;
  currentStep: number;
  updateBiodata: (data: Partial<BiodataData>) => void;
  setStep: (step: number) => void;
  resetBiodata: () => void;
  loadDraft: () => void;
}

export const useBiodataStore = create<BiodataStore>((set) => ({
  biodataData: {
    personalDetails: {
      fullName: '',
      fullNameMarathi: '',
      dateOfBirth: '',
      birthTime: '',
      birthPlace: '',
      age: 0,
      height: '',
      bloodGroup: '',
      complexion: '',
      manglik: undefined,
      gotra: '',
      devak: '',
    },
    familyDetails: {
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      brothers: 0,
      brothersMarried: 0,
      sisters: 0,
      sistersMarried: 0,
      familyType: undefined,
      nativePlace: '',
    },
    education: {
      qualification: '',
      occupation: '',
      company: '',
      income: '',
      workLocation: '',
    },
    contact: {
      phone: '',
      alternatePhone: '',
      email: '',
      address: '',
    },
    partnerPreferences: {
      ageRange: '',
      heightRange: '',
      education: '',
      occupation: '',
      other: '',
    },
    aboutMe: '',
    templateId: 'template-1',
    language: 'both',
  },
  currentStep: 0,
  updateBiodata: (data) =>
    set((state) => {
      const updatedData = { ...state.biodataData, ...data };
      // Auto-save to localStorage
      saveToLocalStorage(updatedData);
      return { biodataData: updatedData };
    }),
  setStep: (step) => set({ currentStep: step }),
  loadDraft: () =>
    set(() => {
      const draft = loadFromLocalStorage();
      if (draft) {
        return { biodataData: draft, currentStep: 0 };
      }
      return {};
    }),
  resetBiodata: () =>
    set({
      biodataData: {
        personalDetails: {
          fullName: '',
          fullNameMarathi: '',
          dateOfBirth: '',
          birthTime: '',
          birthPlace: '',
          age: 0,
          height: '',
          bloodGroup: '',
          complexion: '',
          manglik: undefined,
          gotra: '',
          devak: '',
        },
        familyDetails: {
          fatherName: '',
          fatherOccupation: '',
          motherName: '',
          motherOccupation: '',
          brothers: 0,
          brothersMarried: 0,
          sisters: 0,
          sistersMarried: 0,
          familyType: undefined,
          nativePlace: '',
        },
        education: {
          qualification: '',
          occupation: '',
          company: '',
          income: '',
          workLocation: '',
        },
        contact: {
          phone: '',
          alternatePhone: '',
          email: '',
          address: '',
        },
        partnerPreferences: {
          ageRange: '',
          heightRange: '',
          education: '',
          occupation: '',
          other: '',
        },
        aboutMe: '',
        templateId: 'template-1',
        language: 'both',
      },
      currentStep: 0,
    }),
}));
