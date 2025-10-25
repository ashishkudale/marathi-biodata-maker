import { BiodataData } from '@/lib/types';

export async function generatePDF(data: Partial<BiodataData>): Promise<Blob> {
  // For MVP, we'll use browser's print to PDF functionality
  // This is the simplest and most reliable method without additional dependencies

  const element = document.getElementById('biodata-preview');

  if (!element) {
    throw new Error('Preview element not found');
  }

  // Using browser's print to PDF as simplest MVP solution
  window.print();

  // For production, you can upgrade to use libraries like:
  // - @react-pdf/renderer (already installed)
  // - jsPDF
  // - html2canvas + jsPDF

  return new Blob();
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
