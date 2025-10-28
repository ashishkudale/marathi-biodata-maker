'use client';

import { useBiodataStore } from '@/lib/store';
import HeaderStep from './steps/HeaderStep';
import PersonalDetailsStep from './steps/PersonalDetailsStep';
import FamilyDetailsStep from './steps/FamilyDetailsStep';
import EducationStep from './steps/EducationStep';
import ContactStep from './steps/ContactStep';
import PartnerPreferencesStep from './steps/PartnerPreferencesStep';

const steps = [
  { id: 0, title: 'Header / Invocation', component: HeaderStep },
  { id: 1, title: 'Personal Details', component: PersonalDetailsStep },
  { id: 2, title: 'Family Details', component: FamilyDetailsStep },
  { id: 3, title: 'Education & Career', component: EducationStep },
  { id: 4, title: 'Contact Info', component: ContactStep },
  { id: 5, title: 'Partner Preferences', component: PartnerPreferencesStep },
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
