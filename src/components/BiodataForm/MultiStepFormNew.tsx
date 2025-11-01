'use client';

import { useBiodataStore } from '@/lib/store';
import DeityStep from './steps/DeityStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import FamilyInfoStep from './steps/FamilyInfoStep';
import ContactStepNew from './steps/ContactStepNew';
import PhotoStepNew from './steps/PhotoStepNew';

export default function MultiStepFormNew() {
  const { currentStep } = useBiodataStore();

  const steps = [
    {
      id: 0,
      title: 'Deity',
      titleMarathi: 'देवता',
      component: DeityStep,
    },
    {
      id: 1,
      title: 'Personal',
      titleMarathi: 'वैयक्तिक',
      component: PersonalInfoStep,
    },
    {
      id: 2,
      title: 'Family',
      titleMarathi: 'कौटुंबिक',
      component: FamilyInfoStep,
    },
    {
      id: 3,
      title: 'Contact',
      titleMarathi: 'संपर्क',
      component: ContactStepNew,
    },
    {
      id: 4,
      title: 'Photo',
      titleMarathi: 'फोटो',
      component: PhotoStepNew,
    },
  ];

  const CurrentStepComponent = steps[currentStep]?.component || steps[0].component;

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
        <CurrentStepComponent />
      </div>

      {/* Step Indicator */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
  );
}
