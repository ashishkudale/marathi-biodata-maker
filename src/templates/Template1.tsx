import { BiodataData } from '@/lib/types';

interface TemplateProps {
  data: Partial<BiodataData>;
}

// Aligned Row component for perfect colon alignment
function AlignedRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex">
      <span className="font-semibold w-[140px] shrink-0">{label}</span>
      <span className="w-[20px] shrink-0">:</span>
      <span className="flex-1">{value}</span>
    </div>
  );
}

export default function Template1({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 font-marathi">
      {/* Header with Deity */}
      <div className="text-center border-b-4 border-orange-500 pb-4 mb-6">
        {/* New structure: deity */}
        {data.deity?.showImage && data.deity?.imageUrl && (
          <img
            src={data.deity.imageUrl}
            alt="Deity"
            className="w-20 h-20 mx-auto mb-2 object-contain"
          />
        )}
        {data.deity?.name && (
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            {data.deity.name}
          </h1>
        )}
        {/* Fallback to old structure */}
        {!data.deity?.name && data.header?.text && (
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            {data.header.showSymbols && '|| '}
            {data.header.text}
            {data.header.showSymbols && ' ||'}
          </h1>
        )}
        {/* Default */}
        {!data.deity?.name && !data.header?.text && (
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            || श्री गणेशाय नमः ||
          </h1>
        )}
        <h2 className="text-2xl font-semibold text-gray-800">
          विवाह सूचक माहिती पत्रक
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-3"></div>
      </div>

      {/* Photo */}
      {data.photoUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={data.photoUrl}
            alt="Profile"
            className="w-40 h-48 object-cover border-4 border-orange-500 rounded"
          />
        </div>
      )}

      {/* Personal Details - NEW STRUCTURE */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2 text-center">
          वैयक्तिक माहिती
        </h3>
        <div className="text-sm space-y-1.5">
          <AlignedRow
            label="नाव"
            value={data.personalInfo?.name || data.personalDetails?.fullNameMarathi || data.personalDetails?.fullName || 'N/A'}
          />
          <AlignedRow
            label="जन्मतारीख"
            value={data.personalInfo?.dateOfBirth || data.personalDetails?.dateOfBirth || 'N/A'}
          />
          <AlignedRow
            label="जन्मवेळ"
            value={data.personalInfo?.birthTime || data.personalDetails?.birthTime}
          />
          <AlignedRow
            label="जन्मस्थळ"
            value={data.personalInfo?.birthPlace || data.personalDetails?.birthPlace}
          />
          <AlignedRow
            label="धर्म"
            value={data.personalInfo?.religion}
          />
          <AlignedRow
            label="जात"
            value={data.personalInfo?.caste}
          />
          <AlignedRow
            label="उंची"
            value={data.personalInfo?.height || data.personalDetails?.height || 'N/A'}
          />
          <AlignedRow
            label="रक्तगट"
            value={data.personalInfo?.bloodGroup || data.personalDetails?.bloodGroup}
          />
          <AlignedRow
            label="रंग"
            value={data.personalInfo?.colour || data.personalDetails?.complexion}
          />
          <AlignedRow
            label="कुलदैवत"
            value={data.personalInfo?.kuldaivat}
          />
          <AlignedRow
            label="गोत्र"
            value={data.personalInfo?.gotra || data.personalDetails?.gotra}
          />
          <AlignedRow
            label="राशी"
            value={data.personalInfo?.rashi}
          />
          <AlignedRow
            label="नक्षत्र"
            value={data.personalInfo?.nakshatra}
          />
          <AlignedRow
            label="मांगलिक"
            value={data.personalInfo?.manglik || data.personalDetails?.manglik}
          />
          <AlignedRow
            label="शिक्षण"
            value={data.personalInfo?.education}
          />
          <AlignedRow
            label="नोकरी/व्यवसाय"
            value={data.personalInfo?.jobOrBusiness}
          />
          <AlignedRow
            label="वार्षिक उत्पन्न"
            value={data.personalInfo?.salary}
          />
        </div>
      </div>

      {/* Family Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2 text-center">
          कौटुंबिक माहिती
        </h3>
        <div className="text-sm space-y-1.5">
          <AlignedRow
            label="वडीलांचे नाव"
            value={data.familyInfo?.fatherName || data.familyDetails?.fatherName || 'N/A'}
          />
          <AlignedRow
            label="वडीलांचा व्यवसाय"
            value={data.familyInfo?.fatherJobOrBusiness || data.familyDetails?.fatherOccupation}
          />
          <AlignedRow
            label="आईचे नाव"
            value={data.familyInfo?.motherName || data.familyDetails?.motherName || 'N/A'}
          />
          <AlignedRow
            label="आईचा व्यवसाय"
            value={data.familyInfo?.motherJobOrBusiness || data.familyDetails?.motherOccupation}
          />
          {data.familyInfo?.sisters && data.familyInfo.sisters.length > 0 && (
            <AlignedRow
              label="बहिणी"
              value={data.familyInfo.sisters.map((s) => `${s.name} (${s.maritalStatus === 'Married' ? 'विवाहित' : 'अविवाहित'})`).join(', ')}
            />
          )}
          {data.familyInfo?.brothers && data.familyInfo.brothers.length > 0 && (
            <AlignedRow
              label="भाऊ"
              value={data.familyInfo.brothers.map((b) => `${b.name} (${b.maritalStatus === 'Married' ? 'विवाहित' : 'अविवाहित'})`).join(', ')}
            />
          )}
          <AlignedRow
            label="मामा"
            value={data.familyInfo?.mama}
          />
          <AlignedRow
            label="नातेवाईक आडनावे"
            value={data.familyInfo?.relativeSurnames}
          />
        </div>
      </div>

      {/* Contact Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2 text-center">
          संपर्क माहिती
        </h3>
        <div className="text-sm space-y-1.5">
          <AlignedRow
            label="मोबाईल"
            value={data.contact?.mobileNumber || data.contact?.phone || 'N/A'}
          />
          <AlignedRow
            label="पत्ता"
            value={data.contact?.address || 'N/A'}
          />
        </div>
      </div>


      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t-2 border-orange-300">
        <p className="text-sm text-gray-600">
          Created with Marathi Biodata Maker
        </p>
      </div>
    </div>
  );
}
