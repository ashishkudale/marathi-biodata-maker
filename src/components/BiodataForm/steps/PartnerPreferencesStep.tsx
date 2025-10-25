'use client';

import { useBiodataStore } from '@/lib/store';

export default function PartnerPreferencesStep() {
  const { biodataData, updateBiodata } = useBiodataStore();

  const handlePartnerPrefChange = (field: string, value: any) => {
    updateBiodata({
      partnerPreferences: {
        ...biodataData.partnerPreferences,
        [field]: value,
      },
    });
  };

  const handleAboutMeChange = (value: string) => {
    updateBiodata({
      aboutMe: value,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Partner Preferences</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Range
          </label>
          <input
            type="text"
            value={biodataData.partnerPreferences?.ageRange || ''}
            onChange={(e) => handlePartnerPrefChange('ageRange', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., 25-30 years"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height Range
          </label>
          <input
            type="text"
            value={biodataData.partnerPreferences?.heightRange || ''}
            onChange={(e) => handlePartnerPrefChange('heightRange', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., 5'4&quot; - 5'8&quot;"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education Preference
          </label>
          <input
            type="text"
            value={biodataData.partnerPreferences?.education || ''}
            onChange={(e) => handlePartnerPrefChange('education', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., Graduate or above"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupation Preference
          </label>
          <input
            type="text"
            value={biodataData.partnerPreferences?.occupation || ''}
            onChange={(e) => handlePartnerPrefChange('occupation', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="e.g., Working professional"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Other Preferences
        </label>
        <textarea
          value={biodataData.partnerPreferences?.other || ''}
          onChange={(e) => handlePartnerPrefChange('other', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Any other preferences or requirements"
        />
      </div>

      <div className="border-t pt-4 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">About Me</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brief Introduction
          </label>
          <textarea
            value={biodataData.aboutMe || ''}
            onChange={(e) => handleAboutMeChange(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Write a brief introduction about yourself, your interests, hobbies, etc."
          />
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-green-800">
          <strong>All done!</strong> Click &quot;Complete&quot; to finish creating your biodata.
        </p>
      </div>
    </div>
  );
}
