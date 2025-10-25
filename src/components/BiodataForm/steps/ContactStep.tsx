'use client';

import { useBiodataStore } from '@/lib/store';

export default function ContactStep() {
  const { biodataData, updateBiodata } = useBiodataStore();

  const handleChange = (field: string, value: any) => {
    updateBiodata({
      contact: {
        phone: biodataData.contact?.phone || '',
        address: biodataData.contact?.address || '',
        ...biodataData.contact,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={biodataData.contact?.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter phone number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alternate Phone Number
          </label>
          <input
            type="tel"
            value={biodataData.contact?.alternatePhone || ''}
            onChange={(e) => handleChange('alternatePhone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Enter alternate phone number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={biodataData.contact?.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Enter email address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Address *
        </label>
        <textarea
          value={biodataData.contact?.address || ''}
          onChange={(e) => handleChange('address', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Enter complete address with city and pincode"
          required
        />
      </div>
    </div>
  );
}
