'use client';

import { useBiodataStore } from '@/lib/store';
import Template1 from '@/templates/Template1';

const templates = [
  {
    id: 'template-1',
    name: 'Traditional Marathi',
    description: 'Classic Marathi biodata with traditional design - Fully optimized with Marathi transliteration support',
    icon: '🕉️',
    component: Template1,
    isPremium: false,
  },
];

// Sample data for preview
const sampleData = {
  personalDetails: {
    fullName: 'Sample Name',
    fullNameMarathi: 'नमुना नाव',
    dateOfBirth: '01/01/1995',
    age: 28,
    height: '5\'6"',
    birthPlace: 'Mumbai',
  },
  familyDetails: {
    fatherName: 'Father Name',
    fatherOccupation: 'Business',
    motherName: 'Mother Name',
  },
  education: {
    qualification: 'B.E.',
    occupation: 'Software Engineer',
  },
  contact: {
    phone: '+91 98765 43210',
    mobileNumber: '+91 98765 43210',
    address: 'Mumbai, Maharashtra',
  },
  templateId: 'template-1',
  language: 'both' as const,
};

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => {
          const TemplateComponent = template.component;
          return (
            <div
              key={template.id}
              onClick={() => handleSelectTemplate(template.id)}
              className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:shadow-lg ${
                biodataData.templateId === template.id
                  ? 'border-orange-500 shadow-lg'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
                <div className="absolute inset-0 transform scale-[0.25] origin-top-left pointer-events-none">
                  <TemplateComponent data={sampleData} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Template Info */}
              <div className={`p-4 ${
                biodataData.templateId === template.id ? 'bg-orange-50' : 'bg-white'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{template.icon}</span>
                    <p className="font-semibold text-gray-800">
                      {template.name}
                    </p>
                  </div>
                  {biodataData.templateId === template.id && (
                    <span className="text-orange-600 font-medium text-sm">
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600">{template.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
