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

      {/* Preview with ID for print targeting */}
      <div id="biodata-preview" className="bg-white rounded-lg shadow-md transform scale-90 origin-top">
        <TemplateComponent data={biodataData} />
      </div>
    </div>
  );
}
