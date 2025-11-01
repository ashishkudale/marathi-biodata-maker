import { BiodataData } from '@/lib/types';

interface TemplateProps {
  data: Partial<BiodataData>;
}

export default function Template1({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 font-marathi text-center">
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
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
          वैयक्तिक माहिती
        </h3>
        <div className="text-sm space-y-1.5">
          <div>
            <span className="font-semibold">नाव</span>
            <span className="mx-2">:</span>
            <span>{data.personalInfo?.name || data.personalDetails?.fullNameMarathi || data.personalDetails?.fullName || 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold">जन्मतारीख</span>
            <span className="mx-2">:</span>
            <span>{data.personalInfo?.dateOfBirth || data.personalDetails?.dateOfBirth || 'N/A'}</span>
          </div>
          {(data.personalInfo?.birthTime || data.personalDetails?.birthTime) && (
            <div>
              <span className="font-semibold">जन्मवेळ</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo?.birthTime || data.personalDetails?.birthTime}</span>
            </div>
          )}
          {(data.personalInfo?.birthPlace || data.personalDetails?.birthPlace) && (
            <div>
              <span className="font-semibold">जन्मस्थळ</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo?.birthPlace || data.personalDetails?.birthPlace}</span>
            </div>
          )}
          {(data.personalInfo?.religion) && (
            <div>
              <span className="font-semibold">धर्म</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo.religion}</span>
            </div>
          )}
          {(data.personalInfo?.caste) && (
            <div>
              <span className="font-semibold">जात</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo.caste}</span>
            </div>
          )}
          <div>
            <span className="font-semibold">उंची</span>
            <span className="mx-2">:</span>
            <span>{data.personalInfo?.height || data.personalDetails?.height || 'N/A'}</span>
          </div>
          {(data.personalInfo?.bloodGroup || data.personalDetails?.bloodGroup) && (
            <div>
              <span className="font-semibold">रक्तगट</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo?.bloodGroup || data.personalDetails?.bloodGroup}</span>
            </div>
          )}
          {(data.personalInfo?.colour || data.personalDetails?.complexion) && (
            <div>
              <span className="font-semibold">रंग</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo?.colour || data.personalDetails?.complexion}</span>
            </div>
          )}
          {(data.personalInfo?.kuldaivat) && (
            <div>
              <span className="font-semibold">कुलदैवत</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo.kuldaivat}</span>
            </div>
          )}
          {(data.personalInfo?.gotra || data.personalDetails?.gotra) && (
            <div>
              <span className="font-semibold">गोत्र</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo?.gotra || data.personalDetails?.gotra}</span>
            </div>
          )}
          {(data.personalInfo?.rashi) && (
            <div>
              <span className="font-semibold">राशी</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo.rashi}</span>
            </div>
          )}
          {(data.personalInfo?.nakshatra) && (
            <div>
              <span className="font-semibold">नक्षत्र</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo.nakshatra}</span>
            </div>
          )}
          {(data.personalInfo?.manglik || data.personalDetails?.manglik) && (
            <div>
              <span className="font-semibold">मांगलिक</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo?.manglik || data.personalDetails?.manglik}</span>
            </div>
          )}
          {/* Education & Job from new structure */}
          {data.personalInfo?.education && (
            <div>
              <span className="font-semibold">शिक्षण</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo.education}</span>
            </div>
          )}
          {data.personalInfo?.jobOrBusiness && (
            <div>
              <span className="font-semibold">नोकरी/व्यवसाय</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo.jobOrBusiness}</span>
            </div>
          )}
          {data.personalInfo?.salary && (
            <div>
              <span className="font-semibold">वार्षिक उत्पन्न</span>
              <span className="mx-2">:</span>
              <span>{data.personalInfo.salary}</span>
            </div>
          )}
        </div>
      </div>

      {/* Family Details - NEW STRUCTURE */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
          कौटुंबिक माहिती
        </h3>
        <div className="text-sm space-y-1.5">
          <div>
            <span className="font-semibold">वडीलांचे नाव</span>
            <span className="mx-2">:</span>
            <span>{data.familyInfo?.fatherName || data.familyDetails?.fatherName || 'N/A'}</span>
          </div>
          {(data.familyInfo?.fatherJobOrBusiness || data.familyDetails?.fatherOccupation) && (
            <div>
              <span className="font-semibold">वडीलांचा व्यवसाय</span>
              <span className="mx-2">:</span>
              <span>{data.familyInfo?.fatherJobOrBusiness || data.familyDetails?.fatherOccupation}</span>
            </div>
          )}
          <div>
            <span className="font-semibold">आईचे नाव</span>
            <span className="mx-2">:</span>
            <span>{data.familyInfo?.motherName || data.familyDetails?.motherName || 'N/A'}</span>
          </div>
          {(data.familyInfo?.motherJobOrBusiness || data.familyDetails?.motherOccupation) && (
            <div>
              <span className="font-semibold">आईचा व्यवसाय</span>
              <span className="mx-2">:</span>
              <span>{data.familyInfo?.motherJobOrBusiness || data.familyDetails?.motherOccupation}</span>
            </div>
          )}

          {/* New structure: detailed siblings */}
          {data.familyInfo?.sisters && data.familyInfo.sisters.length > 0 && (
            <div>
              <span className="font-semibold">बहिणी</span>
              <span className="mx-2">:</span>
              <span>
                {data.familyInfo.sisters.map((sister, idx) =>
                  `${sister.name} (${sister.maritalStatus === 'Married' ? 'विवाहित' : 'अविवाहित'})`
                ).join(', ')}
              </span>
            </div>
          )}
          {data.familyInfo?.brothers && data.familyInfo.brothers.length > 0 && (
            <div>
              <span className="font-semibold">भाऊ</span>
              <span className="mx-2">:</span>
              <span>
                {data.familyInfo.brothers.map((brother, idx) =>
                  `${brother.name} (${brother.maritalStatus === 'Married' ? 'विवाहित' : 'अविवाहित'})`
                ).join(', ')}
              </span>
            </div>
          )}

          {/* Old structure: number of siblings */}
          {!data.familyInfo?.brothers && data.familyDetails?.brothers !== undefined && (
            <div>
              <span className="font-semibold">भाऊ</span>
              <span className="mx-2">:</span>
              <span>{data.familyDetails.brothers} (विवाहित: {data.familyDetails.brothersMarried || 0})</span>
            </div>
          )}
          {!data.familyInfo?.sisters && data.familyDetails?.sisters !== undefined && (
            <div>
              <span className="font-semibold">बहीण</span>
              <span className="mx-2">:</span>
              <span>{data.familyDetails.sisters} (विवाहित: {data.familyDetails.sistersMarried || 0})</span>
            </div>
          )}

          {data.familyInfo?.mama && (
            <div>
              <span className="font-semibold">मामा</span>
              <span className="mx-2">:</span>
              <span>{data.familyInfo.mama}</span>
            </div>
          )}
          {data.familyInfo?.relativeSurnames && (
            <div>
              <span className="font-semibold">नातेवाईक आडनावे</span>
              <span className="mx-2">:</span>
              <span>{data.familyInfo.relativeSurnames}</span>
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

      {/* Education & Career - OLD STRUCTURE FALLBACK */}
      {!data.personalInfo?.education && data.education && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
            शिक्षण आणि व्यवसाय
          </h3>
          <div className="text-sm space-y-1.5">
            <div>
              <span className="font-semibold">शिक्षण</span>
              <span className="mx-2">:</span>
              <span>{data.education.qualification || 'N/A'}</span>
            </div>
            <div>
              <span className="font-semibold">व्यवसाय</span>
              <span className="mx-2">:</span>
              <span>{data.education.occupation || 'N/A'}</span>
            </div>
            {data.education.company && (
              <div>
                <span className="font-semibold">कंपनी</span>
                <span className="mx-2">:</span>
                <span>{data.education.company}</span>
              </div>
            )}
            {data.education.income && (
              <div>
                <span className="font-semibold">उत्पन्न</span>
                <span className="mx-2">:</span>
                <span>{data.education.income}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contact Details */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-orange-600 mb-3 border-b-2 border-orange-300 pb-2">
          संपर्क माहिती
        </h3>
        <div className="text-sm space-y-1.5">
          <div>
            <span className="font-semibold">मोबाईल</span>
            <span className="mx-2">:</span>
            <span>{data.contact?.mobileNumber || data.contact?.phone || 'N/A'}</span>
          </div>
          <div>
            <span className="font-semibold">पत्ता</span>
            <span className="mx-2">:</span>
            <span>{data.contact?.address || 'N/A'}</span>
          </div>
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
