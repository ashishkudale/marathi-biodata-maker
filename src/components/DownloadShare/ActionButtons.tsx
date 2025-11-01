'use client';

import { useBiodataStore } from '@/lib/store';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import { useState } from 'react';
import { generatePDF } from '@/utils/pdfGeneratorNew';
import toast from 'react-hot-toast';

export default function ActionButtons() {
  const { biodataData } = useBiodataStore();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Generate filename
      const name = biodataData.personalInfo?.name || biodataData.personalDetails?.fullName || 'biodata';
      const fileName = `${name.replace(/\s+/g, '_')}_biodata.pdf`;

      // Generate and download PDF using new generator
      const result = await generatePDF(biodataData, fileName);

      if (result.success) {
        toast.success('PDF downloaded successfully!');
      } else {
        toast.error('Failed to generate PDF. Please try again.');
      }
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download PDF. Please try again.');
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
