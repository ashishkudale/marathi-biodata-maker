import { BiodataData } from '@/lib/types';

interface TemplateProps {
  data: Partial<BiodataData>;
}

export default function Template3({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 border-4 border-red-700 text-center">
      {/* Decorative Header */}
      <div className="text-center mb-6 relative">
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-orange-500"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-orange-500"></div>

        {data.header?.text && (
          <h1 className="text-3xl font-bold text-red-700 mb-2 font-marathi-formal">
            {data.header.showSymbols && '|| '}
            {data.header.text}
            {data.header.showSymbols && ' ||'}
          </h1>
        )}
        {!data.header?.text && (
          <h1 className="text-3xl font-bold text-red-700 mb-2 font-marathi-formal">
            || श्री गणेशाय नमः ||
          </h1>
        )}
        <h2 className="text-2xl font-semibold text-gray-800 font-marathi">
          विवाह सूचक माहिती पत्रक
        </h2>
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-3"></div>
      </div>

      {/* Photo and Personal Info Section */}
      <div className="flex gap-6 mb-6">
        {/* Photo Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-40 h-48 border-4 border-orange-400 bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
            {data.photoUrl ? (
              <img src={data.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-gray-400 p-4">
                <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Photo</span>
              </div>
            )}
          </div>
        </div>

        {/* Personal Details */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-red-700 mb-3 font-marathi border-b-2 border-orange-300 pb-1">
            वैयक्तिक माहिती
          </h3>
          <div className="space-y-1.5 text-sm">
            <div className="flex">
              <span className="font-semibold text-gray-700 w-24 text-right">नाव</span>
              <span className="mx-2">:</span>
              <span className="flex-1 font-marathi">
                {data.personalDetails?.fullNameMarathi || data.personalDetails?.fullName || 'N/A'}
              </span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-24 text-right">जन्मतारीख</span>
              <span className="mx-2">:</span>
              <span className="flex-1">{data.personalDetails?.dateOfBirth || 'N/A'}</span>
            </div>
            {data.personalDetails?.birthTime && (
              <div className="flex">
                <span className="font-semibold text-gray-700 w-24 text-right">जन्मवेळ</span>
                <span className="mx-2">:</span>
                <span className="flex-1">{data.personalDetails.birthTime}</span>
              </div>
            )}
            <div className="flex">
              <span className="font-semibold text-gray-700 w-24 text-right">जन्मस्थळ</span>
              <span className="mx-2">:</span>
              <span className="flex-1">{data.personalDetails?.birthPlace || 'N/A'}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-24 text-right">वय</span>
              <span className="mx-2">:</span>
              <span className="flex-1">{data.personalDetails?.age || 'N/A'} वर्षे</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-700 w-24 text-right">उंची</span>
              <span className="mx-2">:</span>
              <span className="flex-1">{data.personalDetails?.height || 'N/A'}</span>
            </div>
            {data.personalDetails?.bloodGroup && (
              <div className="flex">
                <span className="font-semibold text-gray-700 w-24 text-right">रक्तगट</span>
                <span className="mx-2">:</span>
                <span className="flex-1">{data.personalDetails.bloodGroup}</span>
              </div>
            )}
            {data.personalDetails?.manglik && (
              <div className="flex">
                <span className="font-semibold text-gray-700 w-24 text-right">मांगलिक</span>
                <span className="mx-2">:</span>
                <span className="flex-1">{data.personalDetails.manglik}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gotra and Devak */}
      {(data.personalDetails?.gotra || data.personalDetails?.devak) && (
        <div className="mb-6 bg-orange-50 p-4 rounded border border-orange-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {data.personalDetails.gotra && (
              <div>
                <span className="font-semibold text-gray-700">गोत्र:</span>{' '}
                <span className="font-marathi">{data.personalDetails.gotra}</span>
              </div>
            )}
            {data.personalDetails.devak && (
              <div>
                <span className="font-semibold text-gray-700">देवक:</span>{' '}
                <span className="font-marathi">{data.personalDetails.devak}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Family Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-red-700 mb-3 font-marathi border-b-2 border-orange-300 pb-1">
          कौटुंबिक माहिती
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div>
            <span className="font-semibold text-gray-700">वडीलांचे नाव:</span>{' '}
            {data.familyDetails?.fatherName || 'N/A'}
          </div>
          <div>
            <span className="font-semibold text-gray-700">व्यवसाय:</span>{' '}
            {data.familyDetails?.fatherOccupation || 'N/A'}
          </div>
          <div>
            <span className="font-semibold text-gray-700">आईचे नाव:</span>{' '}
            {data.familyDetails?.motherName || 'N/A'}
          </div>
          {data.familyDetails?.motherOccupation && (
            <div>
              <span className="font-semibold text-gray-700">व्यवसाय:</span>{' '}
              {data.familyDetails.motherOccupation}
            </div>
          )}
          {data.familyDetails?.brothers !== undefined && (
            <div>
              <span className="font-semibold text-gray-700">भाऊ:</span>{' '}
              {data.familyDetails.brothers} (विवाहित: {data.familyDetails.brothersMarried || 0})
            </div>
          )}
          {data.familyDetails?.sisters !== undefined && (
            <div>
              <span className="font-semibold text-gray-700">बहीण:</span>{' '}
              {data.familyDetails.sisters} (विवाहित: {data.familyDetails.sistersMarried || 0})
            </div>
          )}
          {data.familyDetails?.familyType && (
            <div>
              <span className="font-semibold text-gray-700">कुटुंब प्रकार:</span>{' '}
              {data.familyDetails.familyType === 'Joint' ? 'संयुक्त' : 'एकटे'}
            </div>
          )}
          {data.familyDetails?.nativePlace && (
            <div>
              <span className="font-semibold text-gray-700">मूळ गाव:</span>{' '}
              {data.familyDetails.nativePlace}
            </div>
          )}
        </div>
      </div>

      {/* Education & Career */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-red-700 mb-3 font-marathi border-b-2 border-orange-300 pb-1">
          शिक्षण आणि व्यवसाय
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div>
            <span className="font-semibold text-gray-700">शिक्षण:</span>{' '}
            {data.education?.qualification || 'N/A'}
          </div>
          <div>
            <span className="font-semibold text-gray-700">व्यवसाय:</span>{' '}
            {data.education?.occupation || 'N/A'}
          </div>
          {data.education?.company && (
            <div>
              <span className="font-semibold text-gray-700">कंपनी:</span>{' '}
              {data.education.company}
            </div>
          )}
          {data.education?.income && (
            <div>
              <span className="font-semibold text-gray-700">उत्पन्न:</span>{' '}
              {data.education.income}
            </div>
          )}
          {data.education?.workLocation && (
            <div className="col-span-2">
              <span className="font-semibold text-gray-700">कामाचे ठिकाण:</span>{' '}
              {data.education.workLocation}
            </div>
          )}
        </div>
      </div>

      {/* About Me */}
      {data.aboutMe && (
        <div className="mb-6 bg-orange-50 p-4 rounded border border-orange-200">
          <h3 className="text-lg font-bold text-red-700 mb-2 font-marathi">स्वतः विषयी</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{data.aboutMe}</p>
        </div>
      )}

      {/* Partner Preferences */}
      {data.partnerPreferences && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-red-700 mb-3 font-marathi border-b-2 border-orange-300 pb-1">
            अपेक्षा
          </h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {data.partnerPreferences.ageRange && (
              <div>
                <span className="font-semibold text-gray-700">वय:</span>{' '}
                {data.partnerPreferences.ageRange}
              </div>
            )}
            {data.partnerPreferences.heightRange && (
              <div>
                <span className="font-semibold text-gray-700">उंची:</span>{' '}
                {data.partnerPreferences.heightRange}
              </div>
            )}
            {data.partnerPreferences.education && (
              <div>
                <span className="font-semibold text-gray-700">शिक्षण:</span>{' '}
                {data.partnerPreferences.education}
              </div>
            )}
            {data.partnerPreferences.occupation && (
              <div>
                <span className="font-semibold text-gray-700">व्यवसाय:</span>{' '}
                {data.partnerPreferences.occupation}
              </div>
            )}
            {data.partnerPreferences.other && (
              <div className="col-span-2">
                <span className="font-semibold text-gray-700">इतर:</span>{' '}
                {data.partnerPreferences.other}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-red-700 mb-3 font-marathi border-b-2 border-orange-300 pb-1">
          संपर्क माहिती
        </h3>
        <div className="space-y-1.5 text-sm">
          {data.contact?.phone && (
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32 text-right">मोबाईल</span>
              <span className="mx-2">:</span>
              <span className="flex-1">{data.contact.phone}</span>
            </div>
          )}
          {data.contact?.alternatePhone && (
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32 text-right">पर्यायी मोबाईल</span>
              <span className="mx-2">:</span>
              <span className="flex-1">{data.contact.alternatePhone}</span>
            </div>
          )}
          {data.contact?.email && (
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32 text-right">ईमेल</span>
              <span className="mx-2">:</span>
              <span className="flex-1">{data.contact.email}</span>
            </div>
          )}
          {data.contact?.address && (
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32 text-right">पत्ता</span>
              <span className="mx-2">:</span>
              <span className="flex-1">{data.contact.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Footer */}
      <div className="text-center mt-8 pt-4 border-t-2 border-orange-300 relative">
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-orange-500"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-orange-500"></div>
        <p className="text-sm text-gray-600 font-marathi">
          Created with MarathiBiodata.com
        </p>
      </div>
    </div>
  );
}
