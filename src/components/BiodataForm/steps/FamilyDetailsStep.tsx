'use client';

import { useBiodataStore } from '@/lib/store';

export default function FamilyDetailsStep() {
  const { biodataData, updateBiodata } = useBiodataStore();

  const handleChange = (field: string, value: any) => {
    updateBiodata({
      familyDetails: {
        ...biodataData.familyDetails,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Father&apos;s Name *
          </label>
          <input
            type="text"
            value={biodataData.familyDetails?.fatherName || ''}
            onChange={(e) => handleChange('fatherName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter father's name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Father&apos;s Occupation *
          </label>
          <input
            type="text"
            value={biodataData.familyDetails?.fatherOccupation || ''}
            onChange={(e) => handleChange('fatherOccupation', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter father's occupation"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mother&apos;s Name *
          </label>
          <input
            type="text"
            value={biodataData.familyDetails?.motherName || ''}
            onChange={(e) => handleChange('motherName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter mother's name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mother&apos;s Occupation
          </label>
          <input
            type="text"
            value={biodataData.familyDetails?.motherOccupation || ''}
            onChange={(e) => handleChange('motherOccupation', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter mother's occupation"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Brothers
          </label>
          <input
            type="number"
            min="0"
            value={biodataData.familyDetails?.brothers || ''}
            onChange={(e) => handleChange('brothers', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brothers Married
          </label>
          <input
            type="number"
            min="0"
            value={biodataData.familyDetails?.brothersMarried || ''}
            onChange={(e) => handleChange('brothersMarried', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Sisters
          </label>
          <input
            type="number"
            min="0"
            value={biodataData.familyDetails?.sisters || ''}
            onChange={(e) => handleChange('sisters', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sisters Married
          </label>
          <input
            type="number"
            min="0"
            value={biodataData.familyDetails?.sistersMarried || ''}
            onChange={(e) => handleChange('sistersMarried', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Family Type
          </label>
          <select
            value={biodataData.familyDetails?.familyType || ''}
            onChange={(e) => handleChange('familyType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="Joint">Joint Family</option>
            <option value="Nuclear">Nuclear Family</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Native Place
          </label>
          <input
            type="text"
            value={biodataData.familyDetails?.nativePlace || ''}
            onChange={(e) => handleChange('nativePlace', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter native place"
          />
        </div>
      </div>
    </div>
  );
}
