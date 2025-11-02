import { Document, Page, Text, View, StyleSheet, Font, pdf } from '@react-pdf/renderer';
import { BiodataData } from '@/lib/types';

// Register Noto Sans Devanagari font for Marathi text
// Using GitHub CDN for better reliability
Font.register({
  family: 'Noto Sans Devanagari',
  fonts: [
    {
      src: 'https://raw.githubusercontent.com/google/fonts/main/ofl/notosansdevanagari/NotoSansDevanagari%5Bwdth%2Cwght%5D.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://raw.githubusercontent.com/google/fonts/main/ofl/notosansdevanagari/NotoSansDevanagari%5Bwdth%2Cwght%5D.ttf',
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
    marginBottom: 5,
  },
  labelContainer: {
    width: 170, // Increased width to accommodate longer Marathi labels like "वडीलांचे नाव"
    flexShrink: 0,
  },
  label: {
    fontWeight: 700,
    color: '#374151',
  },
  colonContainer: {
    width: 15, // Fixed colon container width
    flexShrink: 0,
  },
  colon: {
    fontWeight: 700,
    color: '#374151',
  },
  value: {
    flex: 1,
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
});

// PDF Document Component
interface BiodataPDFProps {
  data: Partial<BiodataData>;
}

// Helper component for aligned rows
const AlignedRow = ({ label, value }: { label: string; value: string | undefined }) => {
  // Don't render if value is undefined, null, or empty string (but allow "N/A")
  if (!value || value === '') return null;
  return (
    <View style={styles.row}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.colonContainer}>
        <Text style={styles.colon}>:</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

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
      </View>

      {/* Personal Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>वैयक्तिक माहिती</Text>
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
      </View>

      {/* Family Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>कौटुंबिक माहिती</Text>
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
      </View>

      {/* Contact Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>संपर्क माहिती</Text>
        <AlignedRow
          label="मोबाईल"
          value={data.contact?.mobileNumber || data.contact?.phone || 'N/A'}
        />
        <AlignedRow
          label="पत्ता"
          value={data.contact?.address || 'N/A'}
        />
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
