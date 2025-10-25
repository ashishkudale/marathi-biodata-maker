'use client';

import MultiStepForm from '@/components/BiodataForm/MultiStepForm';
import PreviewPanel from '@/components/TemplatePreview/PreviewPanel';
import TemplateGallery from '@/components/TemplateSelector/TemplateGallery';
import ActionButtons from '@/components/DownloadShare/ActionButtons';

export default function CreateBiodata() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-marathi">
            बायोडाटा तयार करा
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Create Your Marathi Biodata
          </h2>
          <p className="text-gray-600">
            Fill in the details below to create your beautiful biodata
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Form and Actions */}
          <div className="space-y-6">
            {/* Template Selector */}
            <TemplateGallery />

            {/* Multi-Step Form */}
            <MultiStepForm />

            {/* Action Buttons */}
            <div className="no-print bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Download & Share
              </h3>
              <ActionButtons />
            </div>
          </div>

          {/* Right Column: Live Preview */}
          <div className="hidden lg:block">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
