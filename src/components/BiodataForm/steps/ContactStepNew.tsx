'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useBiodataStore } from '@/lib/store';

export default function ContactStepNew() {
  const { biodataData, updateBiodata, setStep, currentStep } = useBiodataStore();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      address: biodataData?.contact?.address || '',
      mobileNumber: biodataData?.contact?.mobileNumber || '',
    }
  });

  const onSubmit = (formData: any) => {
    updateBiodata({ contact: formData });
    setStep(currentStep + 1);
  };

  const handleBack = () => {
    setStep(currentStep - 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          संपर्क माहिती / Contact Information
        </h2>
        <p className="text-gray-600 mb-6">
          Enter contact details (* = Required)
        </p>
      </div>

      <div className="space-y-4">
        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            पत्ता / Address *
          </label>
          <textarea
            {...register('address', { required: 'Address is required' })}
            rows={3}
            placeholder="Full Address with City, State, PIN"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address.message as string}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            मोबाईल नंबर / Mobile Number *
          </label>
          <input
            {...register('mobileNumber', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit mobile number'
              }
            })}
            type="tel"
            maxLength={10}
            placeholder="10-digit mobile number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message as string}</p>
          )}
        </div>
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
          type="submit"
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Next Step → / पुढे
        </button>
      </div>
    </form>
  );
}
