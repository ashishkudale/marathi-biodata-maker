'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { ReactTransliterate } from 'react-transliterate';
import 'react-transliterate/dist/index.css';
import { useBiodataStore } from '@/lib/store';

export default function FamilyInfoStep() {
  const { biodataData, updateBiodata, setStep, currentStep } = useBiodataStore();

  const [fatherName, setFatherName] = useState(biodataData?.familyInfo?.fatherName || '');
  const [motherName, setMotherName] = useState(biodataData?.familyInfo?.motherName || '');
  const [mama, setMama] = useState(biodataData?.familyInfo?.mama || '');

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      fatherJobOrBusiness: biodataData?.familyInfo?.fatherJobOrBusiness || '',
      motherJobOrBusiness: biodataData?.familyInfo?.motherJobOrBusiness || '',
      relativeSurnames: biodataData?.familyInfo?.relativeSurnames || '',
      sisters: biodataData?.familyInfo?.sisters || [],
      brothers: biodataData?.familyInfo?.brothers || [],
    }
  });

  const { fields: sisterFields, append: appendSister, remove: removeSister } = useFieldArray({
    control,
    name: 'sisters'
  });

  const { fields: brotherFields, append: appendBrother, remove: removeBrother } = useFieldArray({
    control,
    name: 'brothers'
  });

  const onSubmit = (formData: any) => {
    const updatedData = {
      ...formData,
      fatherName,
      motherName,
      mama,
    };
    updateBiodata({ familyInfo: updatedData });
    setStep(currentStep + 1);
  };

  const handleBack = () => {
    setStep(currentStep - 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          कौटुंबिक माहिती / Family Information
        </h2>
        <p className="text-gray-600 mb-6">
          Enter family details (* = Required)
        </p>
      </div>

      <div className="space-y-4">
        {/* Father's Name - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            वडिलांचे नाव / Father's Name *
          </label>
          <ReactTransliterate
            value={fatherName}
            onChangeText={setFatherName}
            lang="mr"
            placeholder="Type in English"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {!fatherName && <p className="text-red-500 text-xs mt-1">Father's name is required</p>}
        </div>

        {/* Father's Job/Business */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            वडिलांचा व्यवसाय / Father's Job/Business
          </label>
          <input
            {...register('fatherJobOrBusiness')}
            type="text"
            placeholder="Occupation"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Mother's Name - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            आईचे नाव / Mother's Name *
          </label>
          <ReactTransliterate
            value={motherName}
            onChangeText={setMotherName}
            lang="mr"
            placeholder="Type in English"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {!motherName && <p className="text-red-500 text-xs mt-1">Mother's name is required</p>}
        </div>

        {/* Mother's Job/Business */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            आईचा व्यवसाय / Mother's Job/Business
          </label>
          <input
            {...register('motherJobOrBusiness')}
            type="text"
            placeholder="Occupation or Housewife"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Sisters Section */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            बहिणी / Sisters
          </label>

          {sisterFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`sisters.${index}.name` as const)}
                type="text"
                placeholder="Sister's Name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <select
                {...register(`sisters.${index}.maritalStatus` as const)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="Unmarried">Unmarried / अविवाहित</option>
                <option value="Married">Married / विवाहित</option>
              </select>
              <button
                type="button"
                onClick={() => removeSister(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => appendSister({ name: '', maritalStatus: 'Unmarried' })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            + Add Sister / बहीण जोडा
          </button>
        </div>

        {/* Brothers Section */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            भाऊ / Brothers
          </label>

          {brotherFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`brothers.${index}.name` as const)}
                type="text"
                placeholder="Brother's Name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <select
                {...register(`brothers.${index}.maritalStatus` as const)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="Unmarried">Unmarried / अविवाहित</option>
                <option value="Married">Married / विवाहित</option>
              </select>
              <button
                type="button"
                onClick={() => removeBrother(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => appendBrother({ name: '', maritalStatus: 'Unmarried' })}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            + Add Brother / भाऊ जोडा
          </button>
        </div>

        {/* Mama - WITH TRANSLITERATION */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            मामा / Mama (Maternal Uncle)
          </label>
          <ReactTransliterate
            value={mama}
            onChangeText={setMama}
            lang="mr"
            placeholder="Type in English"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Relative Surnames */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            नातेवाईकांची आडनावे / Relatives Surnames
          </label>
          <input
            {...register('relativeSurnames')}
            type="text"
            placeholder="e.g., Deshmukh, Patil, Kulkarni"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter surnames separated by commas
          </p>
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
