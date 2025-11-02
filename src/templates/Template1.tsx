import { BiodataData } from '@/lib/types';

interface TemplateProps {
  data: Partial<BiodataData>;
}

// Helper function to convert 24-hour time to 12-hour format with AM/PM
function formatTime(time: string | undefined): string | undefined {
  if (!time) return undefined;

  // Check if time is already in 12-hour format (contains AM/PM)
  if (time.toLowerCase().includes('am') || time.toLowerCase().includes('pm')) {
    return time;
  }

  // Parse 24-hour format (e.g., "00:34" or "14:30")
  const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));

  if (isNaN(hours) || isNaN(minutes)) {
    return time; // Return original if can't parse
  }

  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
  const minutesStr = minutes.toString().padStart(2, '0');

  return `${hours12}:${minutesStr} ${period}`;
}

// Aligned Row component for perfect colon alignment
function AlignedRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex">
      <span className="font-semibold w-[170px] shrink-0">{label}</span>
      <span className="w-[15px] shrink-0">:</span>
      <span className="flex-1">{value}</span>
    </div>
  );
}

export default function Template1({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 font-marathi">
      {/* Header with Deity */}
      <div className="text-center border-b-[3px] border-orange-500 pb-[15px] mb-5">
        {/* New structure: deity */}
        {data.deity?.name && (
          <h1 className="text-lg font-bold text-orange-500 mb-[5px]">
            {data.deity.name}
          </h1>
        )}
        {/* Fallback to old structure */}
        {!data.deity?.name && data.header?.text && (
          <h1 className="text-lg font-bold text-orange-500 mb-[5px]">
            {data.header.showSymbols && '|| '}
            {data.header.text}
            {data.header.showSymbols && ' ||'}
          </h1>
        )}
        {/* Default */}
        {!data.deity?.name && !data.header?.text && (
          <h1 className="text-lg font-bold text-orange-500 mb-[5px]">
            || श्री गणेशाय नमः ||
          </h1>
        )}
      </div>

      {/* Personal Details - NEW STRUCTURE */}
      <div className="mb-[15px]">
        <h3 className="text-[13px] font-bold text-orange-500 mb-2 pb-1 border-b border-orange-200">
          वैयक्तिक माहिती
        </h3>
        <div className="text-[11px] space-y-[5px]">
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
            value={formatTime(data.personalInfo?.birthTime || data.personalDetails?.birthTime)}
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
      <div className="mb-[15px]">
        <h3 className="text-[13px] font-bold text-orange-500 mb-2 pb-1 border-b border-orange-200">
          कौटुंबिक माहिती
        </h3>
        <div className="text-[11px] space-y-[5px]">
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
      <div className="mb-[15px]">
        <h3 className="text-[13px] font-bold text-orange-500 mb-2 pb-1 border-b border-orange-200">
          संपर्क माहिती
        </h3>
        <div className="text-[11px] space-y-[5px]">
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
      <div className="text-center mt-5 pt-2.5 border-t border-orange-200">
        <p className="text-[9px] text-gray-500">
          Created with Marathi Biodata Maker
        </p>
      </div>
    </div>
  );
}
