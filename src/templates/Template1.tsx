import { BiodataData } from '@/lib/types';

interface TemplateProps {
  data: Partial<BiodataData>;
}

export default function Template1({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 font-marathi text-center">
      {/* Header */}
      <div className="text-center border-b-4 border-orange-500 pb-4 mb-6">
        {data.header?.text && (
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            {data.header.showSymbols && '|| '}
            {data.header.text}
            {data.header.showSymbols && ' ||'}
          </h1>
        )}
        {!data.header?.text && (
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            || श्री गणेशाय नमः ||
          </h1>
        )}
        <h2 className="text-2xl font-semibold text-gray-800">
          विवाह सूचक माहिती पत्रक
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-3"></div>
      </div>

      {/* Personal Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
          वैयक्तिक माहिती
        </h3>
        <div className="text-sm space-y-1.5">
          <div>
            <span className="font-semibold">नाव</span>
            <span className="mx-2">:</span>
            <span>{data.personalDetails?.fullNameMarathi || data.personalDetails?.fullName || 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold">जन्मतारीख</span>
            <span className="mx-2">:</span>
            <span>{data.personalDetails?.dateOfBirth || 'N/A'}</span>
          </div>
          {data.personalDetails?.birthTime && (
            <div>
              <span className="font-semibold">जन्मवेळ</span>
              <span className="mx-2">:</span>
              <span>{data.personalDetails.birthTime}</span>
            </div>
          )}
          <div>
            <span className="font-semibold">जन्मस्थळ</span>
            <span className="mx-2">:</span>
            <span>{data.personalDetails?.birthPlace || 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold">वय</span>
            <span className="mx-2">:</span>
            <span>{data.personalDetails?.age || 'N/A'} वर्षे</span>
          </div>
          <div>
            <span className="font-semibold">उंची</span>
            <span className="mx-2">:</span>
            <span>{data.personalDetails?.height || 'N/A'}</span>
          </div>
          {data.personalDetails?.bloodGroup && (
            <div>
              <span className="font-semibold">रक्तगट</span>
              <span className="mx-2">:</span>
              <span>{data.personalDetails.bloodGroup}</span>
            </div>
          )}
          {data.personalDetails?.complexion && (
            <div>
              <span className="font-semibold">रंग</span>
              <span className="mx-2">:</span>
              <span>{data.personalDetails.complexion}</span>
            </div>
          )}
          {data.personalDetails?.manglik && (
            <div>
              <span className="font-semibold">मांगलिक</span>
              <span className="mx-2">:</span>
              <span>{data.personalDetails.manglik}</span>
            </div>
          )}
          {data.personalDetails?.gotra && (
            <div>
              <span className="font-semibold">गोत्र</span>
              <span className="mx-2">:</span>
              <span>{data.personalDetails.gotra}</span>
            </div>
          )}
          {data.personalDetails?.devak && (
            <div>
              <span className="font-semibold">देवक</span>
              <span className="mx-2">:</span>
              <span>{data.personalDetails.devak}</span>
            </div>
          )}
        </div>
      </div>

      {/* Family Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
          कौटुंबिक माहिती
        </h3>
        <div className="text-sm space-y-1.5">
          <div>
            <span className="font-semibold">वडीलांचे नाव</span>
            <span className="mx-2">:</span>
            <span>{data.familyDetails?.fatherName || 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold">वडीलांचा व्यवसाय</span>
            <span className="mx-2">:</span>
            <span>{data.familyDetails?.fatherOccupation || 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold">आईचे नाव</span>
            <span className="mx-2">:</span>
            <span>{data.familyDetails?.motherName || 'N/A'}</span>
          </div>
          {data.familyDetails?.motherOccupation && (
            <div>
              <span className="font-semibold">आईचा व्यवसाय</span>
              <span className="mx-2">:</span>
              <span>{data.familyDetails.motherOccupation}</span>
            </div>
          )}
          {data.familyDetails?.brothers !== undefined && (
            <div>
              <span className="font-semibold">भाऊ</span>
              <span className="mx-2">:</span>
              <span>{data.familyDetails.brothers} (विवाहित: {data.familyDetails.brothersMarried || 0})</span>
            </div>
          )}
          {data.familyDetails?.sisters !== undefined && (
            <div>
              <span className="font-semibold">बहीण</span>
              <span className="mx-2">:</span>
              <span>{data.familyDetails.sisters} (विवाहित: {data.familyDetails.sistersMarried || 0})</span>
            </div>
          )}
          {data.familyDetails?.familyType && (
            <div>
              <span className="font-semibold">कुटुंब प्रकार</span>
              <span className="mx-2">:</span>
              <span>{data.familyDetails.familyType === 'Joint' ? 'संयुक्त' : 'एकटे'}</span>
            </div>
          )}
          {data.familyDetails?.nativePlace && (
            <div>
              <span className="font-semibold">मूळ गाव</span>
              <span className="mx-2">:</span>
              <span>{data.familyDetails.nativePlace}</span>
            </div>
          )}
        </div>
      </div>

      {/* Education & Career */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
          शिक्षण आणि व्यवसाय
        </h3>
        <div className="text-sm space-y-1.5">
          <div>
            <span className="font-semibold">शिक्षण</span>
            <span className="mx-2">:</span>
            <span>{data.education?.qualification || 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold">व्यवसाय</span>
            <span className="mx-2">:</span>
            <span>{data.education?.occupation || 'N/A'}</span>
          </div>
          {data.education?.company && (
            <div>
              <span className="font-semibold">कंपनी</span>
              <span className="mx-2">:</span>
              <span>{data.education.company}</span>
            </div>
          )}
          {data.education?.income && (
            <div>
              <span className="font-semibold">उत्पन्न</span>
              <span className="mx-2">:</span>
              <span>{data.education.income}</span>
            </div>
          )}
          {data.education?.workLocation && (
            <div>
              <span className="font-semibold">कामाचे ठिकाण</span>
              <span className="mx-2">:</span>
              <span>{data.education.workLocation}</span>
            </div>
          )}
        </div>
      </div>

      {/* Contact Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
          संपर्क माहिती
        </h3>
        <div className="text-sm space-y-1.5">
          <div>
            <span className="font-semibold">मोबाईल</span>
            <span className="mx-2">:</span>
            <span>{data.contact?.phone || 'N/A'}</span>
          </div>
          {data.contact?.alternatePhone && (
            <div>
              <span className="font-semibold">पर्यायी मोबाईल</span>
              <span className="mx-2">:</span>
              <span>{data.contact.alternatePhone}</span>
            </div>
          )}
          {data.contact?.email && (
            <div>
              <span className="font-semibold">ईमेल</span>
              <span className="mx-2">:</span>
              <span>{data.contact.email}</span>
            </div>
          )}
          <div>
            <span className="font-semibold">पत्ता</span>
            <span className="mx-2">:</span>
            <span>{data.contact?.address || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Partner Preferences */}
      {data.partnerPreferences && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
            अपेक्षा
          </h3>
          <div className="text-sm space-y-1.5">
            {data.partnerPreferences.ageRange && (
              <div className="flex">
                <span className="font-semibold w-32 text-right">वय</span>
                <span className="mx-2">:</span>
                <span>{data.partnerPreferences.ageRange}</span>
              </div>
            )}
            {data.partnerPreferences.heightRange && (
              <div className="flex">
                <span className="font-semibold w-32 text-right">उंची</span>
                <span className="mx-2">:</span>
                <span>{data.partnerPreferences.heightRange}</span>
              </div>
            )}
            {data.partnerPreferences.education && (
              <div className="flex">
                <span className="font-semibold w-32 text-right">शिक्षण</span>
                <span className="mx-2">:</span>
                <span>{data.partnerPreferences.education}</span>
              </div>
            )}
            {data.partnerPreferences.occupation && (
              <div className="flex">
                <span className="font-semibold w-32 text-right">व्यवसाय</span>
                <span className="mx-2">:</span>
                <span>{data.partnerPreferences.occupation}</span>
              </div>
            )}
            {data.partnerPreferences.other && (
              <div className="flex">
                <span className="font-semibold w-32 text-right">इतर</span>
                <span className="mx-2">:</span>
                <span>{data.partnerPreferences.other}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* About Me */}
      {data.aboutMe && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
            स्वतः विषयी
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{data.aboutMe}</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t-2 border-orange-300">
        <p className="text-sm text-gray-600">
          Created with MarathiBiodata.com
        </p>
      </div>
    </div>
  );
}
