import { Document, Page, Text, View, StyleSheet, Font, pdf } from '@react-pdf/renderer';
import { BiodataData } from '@/lib/types';

// Register Noto Sans Devanagari font for Marathi text
Font.register({
  family: 'Noto Sans Devanagari',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/notosansdevanagari/v26/TuGUUVpzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlXQky-AzoFoW4Ow.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/notosansdevanagari/v26/TuGUUVpzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AldQly-AzoFoW4Ow.ttf',
      fontWeight: 700,
    },
  ],
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Noto Sans Devanagari',
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    borderBottom: 3,
    borderBottomColor: '#f97316',
    paddingBottom: 15,
  },
  deityText: {
    fontSize: 18,
    fontWeight: 700,
    color: '#f97316',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1f2937',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#f97316',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: 1.5,
    borderBottomColor: '#fed7aa',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
    textAlign: 'center',
  },
  label: {
    fontWeight: 700,
    color: '#374151',
    marginRight: 5,
  },
  value: {
    color: '#1f2937',
  },
  photo: {
    width: 120,
    height: 150,
    marginBottom: 15,
    alignSelf: 'center',
    border: 3,
    borderColor: '#f97316',
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: 1.5,
    borderTopColor: '#fed7aa',
    textAlign: 'center',
    fontSize: 9,
    color: '#6b7280',
  },
  centered: {
    textAlign: 'center',
  },
});

// PDF Document Component
interface BiodataPDFProps {
  data: Partial<BiodataData>;
}

const BiodataPDF = ({ data }: BiodataPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        {data.deity?.name && (
          <Text style={styles.deityText}>{data.deity.name}</Text>
        )}
        {!data.deity?.name && data.header?.text && (
          <Text style={styles.deityText}>
            {data.header.showSymbols && '|| '}
            {data.header.text}
            {data.header.showSymbols && ' ||'}
          </Text>
        )}
        {!data.deity?.name && !data.header?.text && (
          <Text style={styles.deityText}>|| श्री गणेशाय नमः ||</Text>
        )}
        <Text style={styles.title}>विवाह सूचक माहिती पत्रक</Text>
      </View>

      {/* Personal Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>वैयक्तिक माहिती</Text>
        <View style={styles.centered}>
          <Text style={styles.row}>
            <Text style={styles.label}>नाव : </Text>
            <Text style={styles.value}>
              {data.personalInfo?.name || data.personalDetails?.fullNameMarathi || data.personalDetails?.fullName || 'N/A'}
            </Text>
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>जन्मतारीख : </Text>
            <Text style={styles.value}>{data.personalInfo?.dateOfBirth || data.personalDetails?.dateOfBirth || 'N/A'}</Text>
          </Text>
          {(data.personalInfo?.birthTime || data.personalDetails?.birthTime) && (
            <Text style={styles.row}>
              <Text style={styles.label}>जन्मवेळ : </Text>
              <Text style={styles.value}>{data.personalInfo?.birthTime || data.personalDetails?.birthTime}</Text>
            </Text>
          )}
          {(data.personalInfo?.birthPlace || data.personalDetails?.birthPlace) && (
            <Text style={styles.row}>
              <Text style={styles.label}>जन्मस्थळ : </Text>
              <Text style={styles.value}>{data.personalInfo?.birthPlace || data.personalDetails?.birthPlace}</Text>
            </Text>
          )}
          {data.personalInfo?.religion && (
            <Text style={styles.row}>
              <Text style={styles.label}>धर्म : </Text>
              <Text style={styles.value}>{data.personalInfo.religion}</Text>
            </Text>
          )}
          {data.personalInfo?.caste && (
            <Text style={styles.row}>
              <Text style={styles.label}>जात : </Text>
              <Text style={styles.value}>{data.personalInfo.caste}</Text>
            </Text>
          )}
          <Text style={styles.row}>
            <Text style={styles.label}>उंची : </Text>
            <Text style={styles.value}>{data.personalInfo?.height || data.personalDetails?.height || 'N/A'}</Text>
          </Text>
          {(data.personalInfo?.bloodGroup || data.personalDetails?.bloodGroup) && (
            <Text style={styles.row}>
              <Text style={styles.label}>रक्तगट : </Text>
              <Text style={styles.value}>{data.personalInfo?.bloodGroup || data.personalDetails?.bloodGroup}</Text>
            </Text>
          )}
          {(data.personalInfo?.colour || data.personalDetails?.complexion) && (
            <Text style={styles.row}>
              <Text style={styles.label}>रंग : </Text>
              <Text style={styles.value}>{data.personalInfo?.colour || data.personalDetails?.complexion}</Text>
            </Text>
          )}
          {data.personalInfo?.kuldaivat && (
            <Text style={styles.row}>
              <Text style={styles.label}>कुलदैवत : </Text>
              <Text style={styles.value}>{data.personalInfo.kuldaivat}</Text>
            </Text>
          )}
          {(data.personalInfo?.gotra || data.personalDetails?.gotra) && (
            <Text style={styles.row}>
              <Text style={styles.label}>गोत्र : </Text>
              <Text style={styles.value}>{data.personalInfo?.gotra || data.personalDetails?.gotra}</Text>
            </Text>
          )}
          {data.personalInfo?.rashi && (
            <Text style={styles.row}>
              <Text style={styles.label}>राशी : </Text>
              <Text style={styles.value}>{data.personalInfo.rashi}</Text>
            </Text>
          )}
          {data.personalInfo?.nakshatra && (
            <Text style={styles.row}>
              <Text style={styles.label}>नक्षत्र : </Text>
              <Text style={styles.value}>{data.personalInfo.nakshatra}</Text>
            </Text>
          )}
          {(data.personalInfo?.manglik || data.personalDetails?.manglik) && (
            <Text style={styles.row}>
              <Text style={styles.label}>मांगलिक : </Text>
              <Text style={styles.value}>{data.personalInfo?.manglik || data.personalDetails?.manglik}</Text>
            </Text>
          )}
          {data.personalInfo?.education && (
            <Text style={styles.row}>
              <Text style={styles.label}>शिक्षण : </Text>
              <Text style={styles.value}>{data.personalInfo.education}</Text>
            </Text>
          )}
          {data.personalInfo?.jobOrBusiness && (
            <Text style={styles.row}>
              <Text style={styles.label}>नोकरी/व्यवसाय : </Text>
              <Text style={styles.value}>{data.personalInfo.jobOrBusiness}</Text>
            </Text>
          )}
          {data.personalInfo?.salary && (
            <Text style={styles.row}>
              <Text style={styles.label}>वार्षिक उत्पन्न : </Text>
              <Text style={styles.value}>{data.personalInfo.salary}</Text>
            </Text>
          )}
        </View>
      </View>

      {/* Family Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>कौटुंबिक माहिती</Text>
        <View style={styles.centered}>
          <Text style={styles.row}>
            <Text style={styles.label}>वडीलांचे नाव : </Text>
            <Text style={styles.value}>{data.familyInfo?.fatherName || data.familyDetails?.fatherName || 'N/A'}</Text>
          </Text>
          {(data.familyInfo?.fatherJobOrBusiness || data.familyDetails?.fatherOccupation) && (
            <Text style={styles.row}>
              <Text style={styles.label}>वडीलांचा व्यवसाय : </Text>
              <Text style={styles.value}>{data.familyInfo?.fatherJobOrBusiness || data.familyDetails?.fatherOccupation}</Text>
            </Text>
          )}
          <Text style={styles.row}>
            <Text style={styles.label}>आईचे नाव : </Text>
            <Text style={styles.value}>{data.familyInfo?.motherName || data.familyDetails?.motherName || 'N/A'}</Text>
          </Text>
          {(data.familyInfo?.motherJobOrBusiness || data.familyDetails?.motherOccupation) && (
            <Text style={styles.row}>
              <Text style={styles.label}>आईचा व्यवसाय : </Text>
              <Text style={styles.value}>{data.familyInfo?.motherJobOrBusiness || data.familyDetails?.motherOccupation}</Text>
            </Text>
          )}
          {data.familyInfo?.sisters && data.familyInfo.sisters.length > 0 && (
            <Text style={styles.row}>
              <Text style={styles.label}>बहिणी : </Text>
              <Text style={styles.value}>
                {data.familyInfo.sisters.map((s) => `${s.name} (${s.maritalStatus === 'Married' ? 'विवाहित' : 'अविवाहित'})`).join(', ')}
              </Text>
            </Text>
          )}
          {data.familyInfo?.brothers && data.familyInfo.brothers.length > 0 && (
            <Text style={styles.row}>
              <Text style={styles.label}>भाऊ : </Text>
              <Text style={styles.value}>
                {data.familyInfo.brothers.map((b) => `${b.name} (${b.maritalStatus === 'Married' ? 'विवाहित' : 'अविवाहित'})`).join(', ')}
              </Text>
            </Text>
          )}
          {data.familyInfo?.mama && (
            <Text style={styles.row}>
              <Text style={styles.label}>मामा : </Text>
              <Text style={styles.value}>{data.familyInfo.mama}</Text>
            </Text>
          )}
          {data.familyInfo?.relativeSurnames && (
            <Text style={styles.row}>
              <Text style={styles.label}>नातेवाईक आडनावे : </Text>
              <Text style={styles.value}>{data.familyInfo.relativeSurnames}</Text>
            </Text>
          )}
        </View>
      </View>

      {/* Contact Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>संपर्क माहिती</Text>
        <View style={styles.centered}>
          <Text style={styles.row}>
            <Text style={styles.label}>मोबाईल : </Text>
            <Text style={styles.value}>{data.contact?.mobileNumber || data.contact?.phone || 'N/A'}</Text>
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>पत्ता : </Text>
            <Text style={styles.value}>{data.contact?.address || 'N/A'}</Text>
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Created with Marathi Biodata Maker</Text>
      </View>
    </Page>
  </Document>
);

// Function to generate and download PDF
export const generatePDF = async (data: Partial<BiodataData>, filename: string = 'biodata.pdf') => {
  try {
    const blob = await pdf(<BiodataPDF data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    return { success: true };
  } catch (error) {
    console.error('PDF generation error:', error);
    return { success: false, error };
  }
};

export default BiodataPDF;
