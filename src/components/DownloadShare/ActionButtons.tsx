'use client';

import { useBiodataStore } from '@/lib/store';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import { useState } from 'react';
import { generatePDF, downloadPDF, generateFileName } from '@/utils/pdfGenerator';

export default function ActionButtons() {
  const { biodataData } = useBiodataStore();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Generate PDF from preview
      const pdfBlob = await generatePDF(biodataData);
      const fileName = generateFileName(biodataData);
      downloadPDF(pdfBlob, fileName);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Download and Print */}
      <div className="flex gap-4">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <FiDownload className="w-5 h-5" />
          {isDownloading ? 'Generating...' : 'Download PDF'}
        </button>

        <button
          onClick={handlePrint}
          className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <FiPrinter className="w-5 h-5" />
          Print
        </button>
      </div>
    </div>
  );
}
