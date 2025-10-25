'use client';

import { useBiodataStore } from '@/lib/store';

export default function PersonalDetailsStep() {
  const { biodataData, updateBiodata } = useBiodataStore();

  const handleChange = (field: string, value: any) => {
    updateBiodata({
      personalDetails: {
        ...biodataData.personalDetails,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name (English) *
          </label>
          <input
            type="text"
            value={biodataData.personalDetails?.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            पूर्ण नाव (मराठी)
          </label>
          <input
            type="text"
            value={biodataData.personalDetails?.fullNameMarathi || ''}
            onChange={(e) => handleChange('fullNameMarathi', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-marathi"
            placeholder="पूर्ण नाव टाका"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={biodataData.personalDetails?.dateOfBirth || ''}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Time
          </label>
          <input
            type="time"
            value={biodataData.personalDetails?.birthTime || ''}
            onChange={(e) => handleChange('birthTime', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Place *
          </label>
          <input
            type="text"
            value={biodataData.personalDetails?.birthPlace || ''}
            onChange={(e) => handleChange('birthPlace', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="City, District"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age *
          </label>
          <input
            type="number"
            value={biodataData.personalDetails?.age || ''}
            onChange={(e) => handleChange('age', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="25"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height *
          </label>
          <input
            type="text"
            value={biodataData.personalDetails?.height || ''}
            onChange={(e) => handleChange('height', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="5'6&quot;"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Group
          </label>
          <select
            value={biodataData.personalDetails?.bloodGroup || ''}
            onChange={(e) => handleChange('bloodGroup', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Complexion
          </label>
          <select
            value={biodataData.personalDetails?.complexion || ''}
            onChange={(e) => handleChange('complexion', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="Fair">Fair</option>
            <option value="Wheatish">Wheatish</option>
            <option value="Dark">Dark</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Manglik
          </label>
          <select
            value={biodataData.personalDetails?.manglik || ''}
            onChange={(e) => handleChange('manglik', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Anshik">Anshik</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gotra
          </label>
          <input
            type="text"
            value={biodataData.personalDetails?.gotra || ''}
            onChange={(e) => handleChange('gotra', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter gotra"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Devak
          </label>
          <input
            type="text"
            value={biodataData.personalDetails?.devak || ''}
            onChange={(e) => handleChange('devak', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter devak"
          />
        </div>
      </div>
    </div>
  );
}
