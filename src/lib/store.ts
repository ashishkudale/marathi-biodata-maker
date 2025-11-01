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

const initialState: Partial<BiodataData> = {
  templateId: 'template-1',
  deity: {
    name: '|| श्री गणेशाय नमः ||',
    showImage: false,
    imageUrl: '',
  },
  personalInfo: {
    name: '',
    dateOfBirth: '',
    birthTime: '',
    birthPlace: '',
    religion: '',
    caste: '',
    kuldaivat: '',
    gotra: '',
    rashi: '',
    nakshatra: '',
    gan: '',
    nadi: '',
    manglik: undefined,
    height: '',
    colour: '',
    bloodGroup: '',
    education: '',
    jobOrBusiness: '',
    salary: '',
  },
  familyInfo: {
    fatherName: '',
    fatherJobOrBusiness: '',
    motherName: '',
    motherJobOrBusiness: '',
    sisters: [],
    brothers: [],
    mama: '',
    relativeSurnames: '',
  },
  contact: {
    address: '',
    mobileNumber: '',
  },
  photoUrl: '',
};

export const useBiodataStore = create<BiodataStore>((set) => ({
  biodataData: initialState,
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
      biodataData: initialState,
      currentStep: 0,
    }),
}));
