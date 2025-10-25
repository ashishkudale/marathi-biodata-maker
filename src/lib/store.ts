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
    set((state) => ({
      biodataData: { ...state.biodataData, ...data },
    })),
  setStep: (step) => set({ currentStep: step }),
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
