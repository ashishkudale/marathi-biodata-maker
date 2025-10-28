'use client';

import { useBiodataStore } from '@/lib/store';
import { useState } from 'react';

const predefinedHeaders = [
  { label: 'श्री गणेशाय नमः', value: 'श्री गणेशाय नमः' },
  { label: 'श्री गुरुभ्यो नमः', value: 'श्री गुरुभ्यो नमः' },
  { label: 'ॐ नमः शिवाय', value: 'ॐ नमः शिवाय' },
  { label: 'श्री साईनाथाय नमः', value: 'श्री साईनाथाय नमः' },
  { label: 'श्री विठ्ठलाय नमः', value: 'श्री विठ्ठलाय नमः' },
  { label: 'श्री दत्तात्रेयाय नमः', value: 'श्री दत्तात्रेयाय नमः' },
  { label: 'श्री रामाय नमः', value: 'श्री रामाय नमः' },
  { label: 'श्री कृष्णाय नमः', value: 'श्री कृष्णाय नमः' },
  { label: 'Custom (Enter your own)', value: 'custom' },
];

export default function HeaderStep() {
  const { biodataData, updateBiodata } = useBiodataStore();
  const [selectedOption, setSelectedOption] = useState(
    biodataData.header?.text && !predefinedHeaders.find(h => h.value === biodataData.header?.text)
      ? 'custom'
      : biodataData.header?.text || 'श्री गणेशाय नमः'
  );
  const [customText, setCustomText] = useState(
    biodataData.header?.text && !predefinedHeaders.find(h => h.value === biodataData.header?.text)
      ? biodataData.header.text
      : ''
  );

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    if (value !== 'custom') {
      updateBiodata({
        header: {
          text: value,
          showSymbols: biodataData.header?.showSymbols ?? true,
        },
      });
    }
  };

  const handleCustomTextChange = (text: string) => {
    setCustomText(text);
    updateBiodata({
      header: {
        text: text,
        showSymbols: biodataData.header?.showSymbols ?? true,
      },
    });
  };

  const handleSymbolsToggle = (checked: boolean) => {
    updateBiodata({
      header: {
        text: selectedOption === 'custom' ? customText : selectedOption,
        showSymbols: checked,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Header / Invocation Text
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose a deity name or enter your own text for the biodata header
        </p>
      </div>

      {/* Predefined Options */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Header Text:
        </label>
        {predefinedHeaders.map((header) => (
          <div key={header.value} className="flex items-center">
            <input
              type="radio"
              id={header.value}
              name="header"
              value={header.value}
              checked={selectedOption === header.value}
              onChange={(e) => handleOptionChange(e.target.value)}
              className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
            />
            <label
              htmlFor={header.value}
              className="ml-3 text-gray-700 cursor-pointer hover:text-orange-600"
            >
              {header.label}
            </label>
          </div>
        ))}
      </div>

      {/* Custom Input */}
      {selectedOption === 'custom' && (
        <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Custom Text (Marathi or English):
          </label>
          <input
            type="text"
            value={customText}
            onChange={(e) => handleCustomTextChange(e.target.value)}
            placeholder="Enter your custom header text..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-600 mt-2">
            Example: Your family deity name, custom blessing, etc.
          </p>
        </div>
      )}

      {/* Symbols Toggle */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Show || symbols around text
            </label>
            <p className="text-xs text-gray-600 mt-1">
              Toggle to add or remove || symbols before and after the header text
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={biodataData.header?.showSymbols ?? true}
              onChange={(e) => handleSymbolsToggle(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
          </label>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-6 bg-white border-2 border-orange-200 rounded-lg">
        <p className="text-xs text-gray-600 mb-2 text-center">Preview:</p>
        <div className="text-center text-lg font-semibold text-orange-600">
          {biodataData.header?.showSymbols && '|| '}
          {selectedOption === 'custom' ? customText || 'Enter custom text' : selectedOption}
          {biodataData.header?.showSymbols && ' ||'}
        </div>
      </div>

      <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="font-medium text-blue-900 mb-1">💡 Tip:</p>
        <p>The header text appears at the top of your biodata. You can leave it blank if you don't want any header text.</p>
      </div>
    </div>
  );
}
