'use client';

import { useBiodataStore } from '@/lib/store';

export default function EducationStep() {
  const { biodataData, updateBiodata } = useBiodataStore();

  const handleChange = (field: string, value: any) => {
    updateBiodata({
      education: {
        ...biodataData.education,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Highest Qualification *
          </label>
          <input
            type="text"
            value={biodataData.education?.qualification || ''}
            onChange={(e) => handleChange('qualification', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., B.E., MBA, B.Com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupation *
          </label>
          <input
            type="text"
            value={biodataData.education?.occupation || ''}
            onChange={(e) => handleChange('occupation', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., Software Engineer, Doctor"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company/Organization
          </label>
          <input
            type="text"
            value={biodataData.education?.company || ''}
            onChange={(e) => handleChange('company', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Income
          </label>
          <input
            type="text"
            value={biodataData.education?.income || ''}
            onChange={(e) => handleChange('income', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., 10-12 LPA"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Work Location
        </label>
        <input
          type="text"
          value={biodataData.education?.workLocation || ''}
          onChange={(e) => handleChange('workLocation', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="e.g., Pune, Mumbai"
        />
      </div>
    </div>
  );
}
