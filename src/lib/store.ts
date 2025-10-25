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
      fullName: 'Ashish Ramesh Patil',
      fullNameMarathi: 'आशीष रमेश पाटील',
      dateOfBirth: '1992-12-08',
      birthTime: '19:24',
      birthPlace: 'पुणे',
      age: 32,
      height: '5\'8"',
      bloodGroup: 'B+',
      complexion: 'Fair',
      manglik: 'No',
      gotra: 'कश्यप',
      devak: 'तुळशी',
    },
    familyDetails: {
      fatherName: 'रमेश गणपत पाटील',
      fatherOccupation: 'व्यापार',
      motherName: 'सुनीता रमेश पाटील',
      motherOccupation: 'गृहिणी',
      brothers: 1,
      brothersMarried: 0,
      sisters: 1,
      sistersMarried: 1,
      familyType: 'Joint',
      nativePlace: 'सातारा',
    },
    education: {
      qualification: 'B.Tech Computer Science',
      occupation: 'Software Engineer',
      company: 'TCS Pune',
      income: '12 LPA',
      workLocation: 'पुणे',
    },
    contact: {
      phone: '+91 98765 43210',
      alternatePhone: '+91 87654 32109',
      email: 'ashish.patil@email.com',
      address: 'कर्वे नगर, पुणे - 411052',
    },
    partnerPreferences: {
      ageRange: '25-30 years',
      heightRange: '5\'2" - 5\'6"',
      education: 'Graduate or above',
      occupation: 'Any professional',
      other: 'Family oriented, cultured',
    },
    aboutMe: 'मी एक सॉफ्टवेअर इंजिनीअर आहे. माझे कुटुंब पारंपारिक आहे. मला वाचन, संगीत ऐकणे आणि प्रवास करणे आवडते.',
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
