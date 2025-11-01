'use client';

import React, { useState } from 'react';
import { useBiodataStore } from '@/lib/store';

export default function PhotoStepNew() {
  const { biodataData, updateBiodata, setStep, currentStep } = useBiodataStore();
  const [preview, setPreview] = useState<string | null>(biodataData?.photoUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        updateBiodata({ photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkip = () => {
    updateBiodata({ photoUrl: '' });
    setStep(currentStep + 1);
  };

  const handleSubmit = () => {
    setStep(currentStep + 1);
  };

  const handleBack = () => {
    setStep(currentStep - 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          फोटो / Photo (Optional)
        </h2>
        <p className="text-gray-600 mb-6">
          Upload your photo for the biodata
        </p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        {preview ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="max-w-xs max-h-64 object-contain border-4 border-orange-500 rounded-lg"
              />
            </div>
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  updateBiodata({ photoUrl: '' });
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove Photo / काढा
              </button>
              <label className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">
                Change Photo / बदला
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center cursor-pointer">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-600 mb-2">Click to upload photo</span>
            <span className="text-xs text-gray-500">PNG, JPG up to 2MB</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Photo upload is optional. You can skip this step.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          ← Back / मागे
        </button>
        <button
          type="button"
          onClick={handleSkip}
          className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-gray-500 transition"
        >
          Skip / वगळा
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          {preview ? 'Complete → / पूर्ण' : 'Skip & Complete'}
        </button>
      </div>
    </div>
  );
}
