'use client';

import React, { useState } from 'react';
import { DEITY_OPTIONS } from '@/lib/types';
import { useBiodataStore } from '@/lib/store';

export default function DeityStep() {
  const { biodataData, updateBiodata, setStep, currentStep } = useBiodataStore();
  const [customDeityName, setCustomDeityName] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(biodataData?.deity?.showImage || false);
  const [selectedDeity, setSelectedDeity] = useState(
    biodataData?.deity?.name ?
      DEITY_OPTIONS.find(d => d.name === biodataData.deity?.name)?.id || 'ganesh'
      : 'ganesh'
  );

  const handleSubmit = () => {
    const selectedOption = DEITY_OPTIONS.find(d => d.id === selectedDeity);
    updateBiodata({
      deity: {
        name: selectedDeity === 'custom' ? customDeityName : selectedOption?.name || '',
        showImage: showImageUpload,
        imageUrl: biodataData?.deity?.imageUrl || '',
      }
    });
    setStep(currentStep + 1);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBiodata({
          deity: {
            ...biodataData?.deity,
            name: biodataData?.deity?.name || '',
            showImage: true,
            imageUrl: reader.result as string,
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          देवता / God Image
        </h2>
        <p className="text-gray-600 mb-6">
          Select or customize the deity invocation for your biodata
        </p>
      </div>

      {/* Deity Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          देवता निवडा / Select Deity
        </label>
        {DEITY_OPTIONS.map((option) => (
          <div key={option.id} className="flex items-center space-x-3">
            <input
              type="radio"
              id={option.id}
              name="deity"
              value={option.id}
              checked={selectedDeity === option.id}
              onChange={(e) => setSelectedDeity(e.target.value)}
              className="w-4 h-4 text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor={option.id} className="text-gray-700 cursor-pointer">
              <span className="font-semibold">{option.name}</span>
              <span className="text-sm text-gray-500 ml-2">({option.nameEnglish})</span>
            </label>
          </div>
        ))}
      </div>

      {/* Custom Deity Name Input */}
      {selectedDeity === 'custom' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Deity Name
          </label>
          <input
            type="text"
            value={customDeityName}
            onChange={(e) => setCustomDeityName(e.target.value)}
            placeholder="Enter custom deity name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
      )}

      {/* Show Image Toggle */}
      {selectedDeity !== 'none' && (
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="showImage"
            checked={showImageUpload}
            onChange={(e) => setShowImageUpload(e.target.checked)}
            className="w-4 h-4 text-orange-500 focus:ring-orange-500"
          />
          <label htmlFor="showImage" className="text-gray-700">
            Show deity image in biodata
          </label>
        </div>
      )}

      {/* Image Upload (Optional) */}
      {showImageUpload && selectedDeity !== 'none' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Deity Image (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Recommended size: 100x100px, PNG or JPG
          </p>
          {biodataData?.deity?.imageUrl && (
            <img
              src={biodataData.deity.imageUrl}
              alt="Preview"
              className="mt-2 w-20 h-20 object-cover border-2 border-orange-500 rounded"
            />
          )}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
      >
        Next Step → / पुढे जा
      </button>
    </div>
  );
}
