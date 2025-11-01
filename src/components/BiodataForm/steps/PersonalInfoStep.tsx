'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactTransliterate } from 'react-transliterate';
import 'react-transliterate/dist/index.css';
import { useBiodataStore } from '@/lib/store';

export default function PersonalInfoStep() {
  const { biodataData, updateBiodata, setStep, currentStep } = useBiodataStore();

  // States for transliteration fields
  const [nameMarathi, setNameMarathi] = useState(biodataData?.personalInfo?.name || '');
  const [birthPlace, setBirthPlace] = useState(biodataData?.personalInfo?.birthPlace || '');
  const [kuldaivat, setKuldaivat] = useState(biodataData?.personalInfo?.kuldaivat || '');
  const [gotra, setGotra] = useState(biodataData?.personalInfo?.gotra || '');
  const [rashi, setRashi] = useState(biodataData?.personalInfo?.rashi || '');
  const [nakshatra, setNakshatra] = useState(biodataData?.personalInfo?.nakshatra || '');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      dateOfBirth: biodataData?.personalInfo?.dateOfBirth ?? '',
      birthTime: biodataData?.personalInfo?.birthTime ?? '',
      religion: biodataData?.personalInfo?.religion ?? '',
      caste: biodataData?.personalInfo?.caste ?? '',
      height: biodataData?.personalInfo?.height ?? '',
      gan: biodataData?.personalInfo?.gan ?? '',
      nadi: biodataData?.personalInfo?.nadi ?? '',
      manglik: biodataData?.personalInfo?.manglik ?? '',
      colour: biodataData?.personalInfo?.colour ?? '',
      bloodGroup: biodataData?.personalInfo?.bloodGroup ?? '',
      education: biodataData?.personalInfo?.education ?? '',
      jobOrBusiness: biodataData?.personalInfo?.jobOrBusiness ?? '',
      salary: biodataData?.personalInfo?.salary ?? '',
    }
  });

  const onSubmit = (formData: any) => {
    const updatedData = {
      ...formData,
      name: nameMarathi,
      birthPlace,
      kuldaivat,
      gotra,
      rashi,
      nakshatra,
    };
    updateBiodata({ personalInfo: updatedData });
    setStep(currentStep + 1);
  };

  const handleBack = () => {
    setStep(currentStep - 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          वैयक्तिक माहिती / Personal Information
        </h2>
        <p className="text-gray-600 mb-6">
          💡 Type in English to get Marathi (* = Required)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            नाव / Name *
          </label>
          <ReactTransliterate
            value={nameMarathi}
            onChangeText={setNameMarathi}
            lang="mr"
            placeholder="Type: amit → अमित"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {!nameMarathi && <p className="text-red-500 text-xs mt-1">Name is required</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            जन्मतारीख / Date of Birth *
          </label>
          <input
            {...register('dateOfBirth', { required: 'Date of birth is required' })}
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message as string}</p>
          )}
        </div>

        {/* Birth Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            जन्म वेळ / Birth Time
          </label>
          <input
            {...register('birthTime')}
            type="time"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Birth Place - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            जन्म ठिकाण / Birth Place
          </label>
          <ReactTransliterate
            value={birthPlace}
            onChangeText={setBirthPlace}
            lang="mr"
            placeholder="Type: pune → पुणे"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Religion */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            धर्म / Religion *
          </label>
          <input
            {...register('religion', { required: 'Religion is required' })}
            type="text"
            placeholder="Hindu, Jain, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.religion && (
            <p className="text-red-500 text-xs mt-1">{errors.religion.message as string}</p>
          )}
        </div>

        {/* Caste */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            जात / Caste *
          </label>
          <input
            {...register('caste', { required: 'Caste is required' })}
            type="text"
            placeholder="Maratha, Brahmin, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.caste && (
            <p className="text-red-500 text-xs mt-1">{errors.caste.message as string}</p>
          )}
        </div>

        {/* Kuldaivat - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            कुलदैवत / Kuldaivat
          </label>
          <ReactTransliterate
            value={kuldaivat}
            onChangeText={setKuldaivat}
            lang="mr"
            placeholder="Type: bhavani → भवानी"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Gotra - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            गोत्र / Gotra
          </label>
          <ReactTransliterate
            value={gotra}
            onChangeText={setGotra}
            lang="mr"
            placeholder="Type in English"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Rashi - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            राशी / Rashi
          </label>
          <ReactTransliterate
            value={rashi}
            onChangeText={setRashi}
            lang="mr"
            placeholder="Type: mesh → मेष"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Nakshatra - WITH TRANSLITERATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            नक्षत्र / Nakshatra
          </label>
          <ReactTransliterate
            value={nakshatra}
            onChangeText={setNakshatra}
            lang="mr"
            placeholder="Type: ashwini → अश्विनी"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Gan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            गण / Gan
          </label>
          <select
            {...register('gan')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select / निवडा</option>
            <option value="Dev">Dev / देव</option>
            <option value="Manushya">Manushya / मनुष्य</option>
            <option value="Rakshasa">Rakshasa / राक्षस</option>
          </select>
        </div>

        {/* Nadi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            नाडी / Nadi
          </label>
          <select
            {...register('nadi')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select / निवडा</option>
            <option value="Adi">Adi / आदि</option>
            <option value="Madhya">Madhya / मध्य</option>
            <option value="Antya">Antya / अंत्य</option>
          </select>
        </div>

        {/* Manglik */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            मांगलिक / Manglik
          </label>
          <select
            {...register('manglik')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select / निवडा</option>
            <option value="Yes">Yes / होय</option>
            <option value="No">No / नाही</option>
            <option value="Anshik">Anshik / अंशिक</option>
          </select>
        </div>

        {/* Height */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            उंची / Height *
          </label>
          <input
            {...register('height', { required: 'Height is required' })}
            type="text"
            placeholder="e.g., 5'6''"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.height && (
            <p className="text-red-500 text-xs mt-1">{errors.height.message as string}</p>
          )}
        </div>

        {/* Colour */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            वर्ण / Colour
          </label>
          <select
            {...register('colour')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select / निवडा</option>
            <option value="Fair">Fair / गोरा</option>
            <option value="Wheatish">Wheatish / गव्हाळ</option>
            <option value="Dark">Dark / सावळा</option>
          </select>
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            रक्तगट / Blood Group
          </label>
          <select
            {...register('bloodGroup')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select / निवडा</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            शिक्षण / Education *
          </label>
          <input
            {...register('education', { required: 'Education is required' })}
            type="text"
            placeholder="B.E., MBA, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.education && (
            <p className="text-red-500 text-xs mt-1">{errors.education.message as string}</p>
          )}
        </div>

        {/* Job/Business */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            नोकरी/व्यवसाय / Job/Business *
          </label>
          <input
            {...register('jobOrBusiness', { required: 'Job/Business is required' })}
            type="text"
            placeholder="Software Engineer, Business"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.jobOrBusiness && (
            <p className="text-red-500 text-xs mt-1">{errors.jobOrBusiness.message as string}</p>
          )}
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            वार्षिक उत्पन्न / Annual Salary *
          </label>
          <input
            {...register('salary', { required: 'Salary is required' })}
            type="text"
            placeholder="5-6 LPA"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          {errors.salary && (
            <p className="text-red-500 text-xs mt-1">{errors.salary.message as string}</p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Type in English (e.g., "ram") and get Marathi suggestions (राम)
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
          type="submit"
          className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Next Step → / पुढे
        </button>
      </div>
    </form>
  );
}
