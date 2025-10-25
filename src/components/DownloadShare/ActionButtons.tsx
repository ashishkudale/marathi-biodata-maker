'use client';

import { useBiodataStore } from '@/lib/store';
import { FiDownload, FiShare2, FiPrinter } from 'react-icons/fi';
import { useState } from 'react';
import { generateFileName } from '@/utils/pdfGenerator';

export default function ActionButtons() {
  const { biodataData } = useBiodataStore();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Trigger browser print dialog
      // User can choose "Save as PDF" in the print dialog
      window.print();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to open print dialog');
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const name = biodataData.personalDetails?.fullName ||
                 biodataData.personalDetails?.fullNameMarathi ||
                 'Biodata';
    const text = `Check out my biodata - ${name}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Biodata',
          text: text,
        });
      } catch (error) {
        // User cancelled or share failed
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(text);
        alert('Biodata info copied to clipboard!');
      } catch (error) {
        alert('Share functionality is not supported on this browser');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <FiDownload className="w-5 h-5" />
          {isDownloading ? 'Opening...' : 'Download PDF'}
        </button>

        <button
          onClick={handlePrint}
          className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <FiPrinter className="w-5 h-5" />
          Print
        </button>
      </div>

      <button
        onClick={handleShare}
        className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        <FiShare2 className="w-5 h-5" />
        Share
      </button>

      <div className="text-center text-sm text-gray-600 mt-4">
        <p>💡 Tip: Use &quot;Save as PDF&quot; in the print dialog to download</p>
      </div>
    </div>
  );
}
