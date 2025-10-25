import { BiodataData } from '@/lib/types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generatePDF(data: Partial<BiodataData>): Promise<Blob> {
  const element = document.getElementById('biodata-preview');

  if (!element) {
    throw new Error('Preview element not found');
  }

  try {
    // Capture the preview element as canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? 'portrait' : 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Return as Blob
    return pdf.output('blob');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function generateFileName(data: Partial<BiodataData>): string {
  const name = data.personalDetails?.fullName || 'biodata';
  const date = new Date().toISOString().split('T')[0];
  return `${name.replace(/\s+/g, '_')}_${date}.pdf`;
}
