import { BiodataData } from '@/lib/types';

interface TemplateProps {
  data: Partial<BiodataData>;
}

export default function Template2({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-slate-50 to-gray-100 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          {data.personalDetails?.fullName || 'Your Name'}
        </h1>
        {data.personalDetails?.fullNameMarathi && (
          <h2 className="text-2xl font-marathi text-slate-600 mb-1">
            {data.personalDetails.fullNameMarathi}
          </h2>
        )}
        <div className="flex justify-center items-center gap-4 text-sm text-slate-600 mt-3">
          {data.personalDetails?.age && (
            <span>{data.personalDetails.age} years</span>
          )}
          {data.personalDetails?.height && (
            <>
              <span>•</span>
              <span>{data.personalDetails.height}</span>
            </>
          )}
          {data.personalDetails?.birthPlace && (
            <>
              <span>•</span>
              <span>{data.personalDetails.birthPlace}</span>
            </>
          )}
        </div>
      </div>

      {/* About Me */}
      {data.aboutMe && (
        <div className="mb-6 bg-white rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">
            About Me
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">{data.aboutMe}</p>
        </div>
      )}

      {/* Personal Details */}
      <div className="mb-6 bg-white rounded-lg p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">
          Personal Details
        </h3>
        <div className="space-y-2 text-sm">
          {data.personalDetails?.dateOfBirth && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Date of Birth</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.personalDetails.dateOfBirth}</span>
            </div>
          )}
          {data.personalDetails?.birthTime && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Birth Time</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.personalDetails.birthTime}</span>
            </div>
          )}
          {data.personalDetails?.age && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Age</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.personalDetails.age} years</span>
            </div>
          )}
          {data.personalDetails?.height && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Height</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.personalDetails.height}</span>
            </div>
          )}
          {data.personalDetails?.bloodGroup && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Blood Group</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.personalDetails.bloodGroup}</span>
            </div>
          )}
          {data.personalDetails?.complexion && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Complexion</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.personalDetails.complexion}</span>
            </div>
          )}
          {data.personalDetails?.manglik && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Manglik</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.personalDetails.manglik}</span>
            </div>
          )}
          {data.personalDetails?.gotra && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Gotra</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.personalDetails.gotra}</span>
            </div>
          )}
          {data.personalDetails?.devak && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Devak</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.personalDetails.devak}</span>
            </div>
          )}
        </div>
      </div>

      {/* Education & Career */}
      <div className="mb-6 bg-white rounded-lg p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">
          Education & Career
        </h3>
        <div className="space-y-2 text-sm">
          {data.education?.qualification && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Education</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.education.qualification}</span>
            </div>
          )}
          {data.education?.occupation && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Occupation</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.education.occupation}</span>
            </div>
          )}
          {data.education?.company && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Company</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.education.company}</span>
            </div>
          )}
          {data.education?.income && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Income</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.education.income}</span>
            </div>
          )}
          {data.education?.workLocation && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Location</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.education.workLocation}</span>
            </div>
          )}
        </div>
      </div>

      {/* Family Details */}
      <div className="mb-6 bg-white rounded-lg p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">
          Family Details
        </h3>
        <div className="space-y-2 text-sm">
          {data.familyDetails?.fatherName && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Father</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">
                {data.familyDetails.fatherName}
                {data.familyDetails.fatherOccupation && (
                  <span className="text-slate-600 font-normal"> ({data.familyDetails.fatherOccupation})</span>
                )}
              </span>
            </div>
          )}
          {data.familyDetails?.motherName && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Mother</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">
                {data.familyDetails.motherName}
                {data.familyDetails.motherOccupation && (
                  <span className="text-slate-600 font-normal"> ({data.familyDetails.motherOccupation})</span>
                )}
              </span>
            </div>
          )}
          {data.familyDetails?.brothers !== undefined && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Brothers</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">
                {data.familyDetails.brothers} (Married: {data.familyDetails.brothersMarried || 0})
              </span>
            </div>
          )}
          {data.familyDetails?.sisters !== undefined && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Sisters</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">
                {data.familyDetails.sisters} (Married: {data.familyDetails.sistersMarried || 0})
              </span>
            </div>
          )}
          {data.familyDetails?.familyType && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Family Type</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.familyDetails.familyType}</span>
            </div>
          )}
          {data.familyDetails?.nativePlace && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Native Place</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.familyDetails.nativePlace}</span>
            </div>
          )}
        </div>
      </div>

      {/* Contact Details */}
      <div className="mb-6 bg-white rounded-lg p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">
          Contact Information
        </h3>
        <div className="space-y-2 text-sm">
          {data.contact?.phone && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Phone</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.contact.phone}</span>
            </div>
          )}
          {data.contact?.alternatePhone && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Alternate Phone</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.contact.alternatePhone}</span>
            </div>
          )}
          {data.contact?.email && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Email</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.contact.email}</span>
            </div>
          )}
          {data.contact?.address && (
            <div className="flex">
              <span className="text-slate-600 w-32 text-right">Address</span>
              <span className="text-slate-600 mx-2">:</span>
              <span className="font-medium text-slate-800 flex-1">{data.contact.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Partner Preferences */}
      {data.partnerPreferences && (
        <div className="mb-6 bg-white rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">
            Partner Preferences
          </h3>
          <div className="space-y-2 text-sm">
            {data.partnerPreferences.ageRange && (
              <div className="grid grid-cols-[1fr_auto_2fr] gap-x-2">
                <span className="text-slate-600 text-right">Age Range</span>
                <span className="text-slate-600">:</span>
                <span className="font-medium text-slate-800">{data.partnerPreferences.ageRange}</span>
              </div>
            )}
            {data.partnerPreferences.heightRange && (
              <div className="grid grid-cols-[1fr_auto_2fr] gap-x-2">
                <span className="text-slate-600 text-right">Height Range</span>
                <span className="text-slate-600">:</span>
                <span className="font-medium text-slate-800">{data.partnerPreferences.heightRange}</span>
              </div>
            )}
            {data.partnerPreferences.education && (
              <div className="grid grid-cols-[1fr_auto_2fr] gap-x-2">
                <span className="text-slate-600 text-right">Education</span>
                <span className="text-slate-600">:</span>
                <span className="font-medium text-slate-800">{data.partnerPreferences.education}</span>
              </div>
            )}
            {data.partnerPreferences.occupation && (
              <div className="grid grid-cols-[1fr_auto_2fr] gap-x-2">
                <span className="text-slate-600 text-right">Occupation</span>
                <span className="text-slate-600">:</span>
                <span className="font-medium text-slate-800">{data.partnerPreferences.occupation}</span>
              </div>
            )}
            {data.partnerPreferences.other && (
              <div className="grid grid-cols-[1fr_auto_2fr] gap-x-2">
                <span className="text-slate-600 text-right">Other</span>
                <span className="text-slate-600">:</span>
                <span className="font-medium text-slate-800">{data.partnerPreferences.other}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-slate-300">
        <p className="text-xs text-slate-500">Created with MarathiBiodata.com</p>
      </div>
    </div>
  );
}
