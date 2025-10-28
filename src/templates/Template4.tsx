import { BiodataData } from '@/lib/types';

interface TemplateProps {
  data: Partial<BiodataData>;
}

export default function Template4({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 font-mono text-black text-center">
      {/* Header */}
      <div className="text-center mb-8">
        {data.header?.text && (
          <div className="text-lg mb-1">
            {data.header.showSymbols && '|| '}
            {data.header.text}
            {data.header.showSymbols && ' ||'}
          </div>
        )}
        {!data.header?.text && (
          <div className="text-lg mb-1">|| श्री गणेशाय नमः ||</div>
        )}
        <div className="text-xl font-bold mb-1">विवाह सूचक माहिती पत्रक</div>
        <div className="text-xl font-bold">BIODATA</div>
      </div>

      {/* Personal Details */}
      <div className="mb-6">
        <div className="font-bold mb-2">वैयक्तिक माहिती / PERSONAL DETAILS</div>
        <div className="pl-4 space-y-1 text-sm">
          <div>नाव / Name: {data.personalDetails?.fullNameMarathi || data.personalDetails?.fullName || '_________________'}</div>
          <div>जन्मतारीख / Date of Birth: {data.personalDetails?.dateOfBirth || '_________________'}</div>
          {data.personalDetails?.birthTime && (
            <div>जन्मवेळ / Birth Time: {data.personalDetails.birthTime}</div>
          )}
          <div>जन्मस्थळ / Birth Place: {data.personalDetails?.birthPlace || '_________________'}</div>
          <div>वय / Age: {data.personalDetails?.age || '__'} वर्षे / Years</div>
          <div>उंची / Height: {data.personalDetails?.height || '_________________'}</div>
          {data.personalDetails?.bloodGroup && (
            <div>रक्तगट / Blood Group: {data.personalDetails.bloodGroup}</div>
          )}
          {data.personalDetails?.complexion && (
            <div>रंग / Complexion: {data.personalDetails.complexion}</div>
          )}
          {data.personalDetails?.manglik && (
            <div>मांगलिक / Manglik: {data.personalDetails.manglik}</div>
          )}
          {data.personalDetails?.gotra && (
            <div>गोत्र / Gotra: {data.personalDetails.gotra}</div>
          )}
          {data.personalDetails?.devak && (
            <div>देवक / Devak: {data.personalDetails.devak}</div>
          )}
        </div>
      </div>

      {/* Family Details */}
      <div className="mb-6">
        <div className="font-bold mb-2">कौटुंबिक माहिती / FAMILY DETAILS</div>
        <div className="pl-4 space-y-1 text-sm">
          <div>वडीलांचे नाव / Father's Name: {data.familyDetails?.fatherName || '_________________'}</div>
          <div>वडीलांचा व्यवसाय / Father's Occupation: {data.familyDetails?.fatherOccupation || '_________________'}</div>
          <div>आईचे नाव / Mother's Name: {data.familyDetails?.motherName || '_________________'}</div>
          {data.familyDetails?.motherOccupation && (
            <div>आईचा व्यवसाय / Mother's Occupation: {data.familyDetails.motherOccupation}</div>
          )}
          {data.familyDetails?.brothers !== undefined && (
            <div>भाऊ / Brothers: {data.familyDetails.brothers} (विवाहित / Married: {data.familyDetails.brothersMarried || 0})</div>
          )}
          {data.familyDetails?.sisters !== undefined && (
            <div>बहीण / Sisters: {data.familyDetails.sisters} (विवाहित / Married: {data.familyDetails.sistersMarried || 0})</div>
          )}
          {data.familyDetails?.familyType && (
            <div>कुटुंब प्रकार / Family Type: {data.familyDetails.familyType === 'Joint' ? 'संयुक्त / Joint' : 'एकटे / Nuclear'}</div>
          )}
          {data.familyDetails?.nativePlace && (
            <div>मूळ गाव / Native Place: {data.familyDetails.nativePlace}</div>
          )}
        </div>
      </div>

      {/* Education & Career */}
      <div className="mb-6">
        <div className="font-bold mb-2">शिक्षण आणि व्यवसाय / EDUCATION & CAREER</div>
        <div className="pl-4 space-y-1 text-sm">
          <div>शिक्षण / Education: {data.education?.qualification || '_________________'}</div>
          <div>व्यवसाय / Occupation: {data.education?.occupation || '_________________'}</div>
          {data.education?.company && (
            <div>कंपनी / Company: {data.education.company}</div>
          )}
          {data.education?.income && (
            <div>उत्पन्न / Income: {data.education.income}</div>
          )}
          {data.education?.workLocation && (
            <div>कामाचे ठिकाण / Work Location: {data.education.workLocation}</div>
          )}
        </div>
      </div>

      {/* Contact Details */}
      <div className="mb-6">
        <div className="font-bold mb-2">संपर्क माहिती / CONTACT DETAILS</div>
        <div className="pl-4 space-y-1 text-sm">
          <div>मोबाईल / Mobile: {data.contact?.phone || '_________________'}</div>
          {data.contact?.alternatePhone && (
            <div>पर्यायी मोबाईल / Alternate Mobile: {data.contact.alternatePhone}</div>
          )}
          {data.contact?.email && (
            <div>ईमेल / Email: {data.contact.email}</div>
          )}
          <div>पत्ता / Address: {data.contact?.address || '_________________'}</div>
        </div>
      </div>

      {/* Partner Preferences */}
      {data.partnerPreferences && (Object.values(data.partnerPreferences).some(val => val)) && (
        <div className="mb-6">
          <div className="font-bold mb-2">अपेक्षा / PARTNER PREFERENCES</div>
          <div className="pl-4 space-y-1 text-sm">
            {data.partnerPreferences.ageRange && (
              <div>वय / Age: {data.partnerPreferences.ageRange}</div>
            )}
            {data.partnerPreferences.heightRange && (
              <div>उंची / Height: {data.partnerPreferences.heightRange}</div>
            )}
            {data.partnerPreferences.education && (
              <div>शिक्षण / Education: {data.partnerPreferences.education}</div>
            )}
            {data.partnerPreferences.occupation && (
              <div>व्यवसाय / Occupation: {data.partnerPreferences.occupation}</div>
            )}
            {data.partnerPreferences.other && (
              <div>इतर / Other: {data.partnerPreferences.other}</div>
            )}
          </div>
        </div>
      )}

      {/* About Me */}
      {data.aboutMe && (
        <div className="mb-6">
          <div className="font-bold mb-2">स्वतः विषयी / ABOUT</div>
          <div className="pl-4 text-sm leading-relaxed">{data.aboutMe}</div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-gray-400 text-xs">
        <div>Created with MarathiBiodata.com</div>
      </div>
    </div>
  );
}
