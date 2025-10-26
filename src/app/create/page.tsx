'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MultiStepForm from '@/components/BiodataForm/MultiStepForm';
import PreviewPanel from '@/components/TemplatePreview/PreviewPanel';
import TemplateGallery from '@/components/TemplateSelector/TemplateGallery';
import ActionButtons from '@/components/DownloadShare/ActionButtons';
import UserMenu from '@/components/Auth/UserMenu';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useBiodataStore } from '@/lib/store';
import { getBiodata, saveBiodata, getUserBiodatas } from '@/lib/biodataService';
import { FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CreateBiodata() {
  const { user, loading: authLoading } = useAuth();
  const { biodataData, updateBiodata } = useBiodataStore();
  const searchParams = useSearchParams();
  const biodataId = searchParams.get('id');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing biodata if ID is provided, or load user's most recent biodata on login
  useEffect(() => {
    if (biodataId && user) {
      loadExistingBiodata(biodataId);
    } else if (user && !biodataId && !authLoading) {
      // Load user's most recent biodata if no specific ID is provided
      loadUserLatestBiodata();
    }
  }, [biodataId, user, authLoading]);

  const loadUserLatestBiodata = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const result = await getUserBiodatas(user.uid);
      if (result.success && result.data && result.data.length > 0) {
        // Load the most recent biodata (first in the array since it's ordered by updatedAt desc)
        const latestBiodata = result.data[0];
        updateBiodata(latestBiodata);
        toast.success('Your latest biodata has been loaded');
      }
      // If no biodatas exist, just leave the form empty (no error message)
    } catch (error) {
      console.error('Error loading latest biodata:', error);
      // Silent fail - just leave form empty
    } finally {
      setIsLoading(false);
    }
  };

  const loadExistingBiodata = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await getBiodata(id);
      if (result.success && result.data) {
        // Check if the biodata belongs to the current user
        if (result.data.userId === user?.uid) {
          updateBiodata(result.data);
          toast.success('Biodata loaded successfully');
        } else {
          toast.error('You do not have permission to edit this biodata');
        }
      } else {
        toast.error(result.error || 'Failed to load biodata');
      }
    } catch (error) {
      toast.error('An error occurred while loading biodata');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save your biodata');
      return;
    }

    setIsSaving(true);
    try {
      const result = await saveBiodata(user.uid, biodataData);
      if (result.success) {
        updateBiodata({ id: result.id, userId: user.uid });
        toast.success('Biodata saved successfully!');
      } else {
        toast.error(result.error || 'Failed to save biodata');
      }
    } catch (error) {
      toast.error('An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            Marathi Biodata
          </Link>
          <UserMenu />
        </div>
      </nav>

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading biodata...</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-marathi">
            बायोडाटा तयार करा
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Create Your Marathi Biodata
          </h2>
          <p className="text-gray-600">
            Fill in the details below to create your beautiful biodata
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Form and Actions */}
          <div className="space-y-6">
            {/* Template Selector */}
            <TemplateGallery />

            {/* Multi-Step Form */}
            <MultiStepForm />

            {/* Save to Cloud Button */}
            {user && (
              <div className="no-print bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Save to Cloud
                </h3>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <FiSave className="w-5 h-5" />
                  {isSaving ? 'Saving...' : biodataData.id ? 'Update Biodata' : 'Save Biodata'}
                </button>
                <p className="text-sm text-gray-600 text-center mt-2">
                  {biodataData.id ? 'Update your saved biodata' : 'Save to access from any device'}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="no-print bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Download & Share
              </h3>
              <ActionButtons />
            </div>
          </div>

          {/* Right Column: Live Preview */}
          <div className="hidden lg:block">
            <PreviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
