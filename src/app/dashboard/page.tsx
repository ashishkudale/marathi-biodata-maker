'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BiodataData } from '@/lib/types';
import { getUserBiodatas, deleteBiodata } from '@/lib/biodataService';
import { FiPlus, FiEdit2, FiTrash2, FiDownload, FiEye, FiLogIn } from 'react-icons/fi';
import toast from 'react-hot-toast';
import UserMenu from '@/components/Auth/UserMenu';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [biodatas, setBiodatas] = useState<BiodataData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      // Redirect to home if not authenticated
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadBiodatas();
    }
  }, [user]);

  const loadBiodatas = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const result = await getUserBiodatas(user.uid);
      if (result.success && result.data) {
        setBiodatas(result.data);
      } else {
        toast.error(result.error || 'Failed to load biodatas');
      }
    } catch (error) {
      toast.error('An error occurred while loading biodatas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (biodataId: string) => {
    if (!confirm('Are you sure you want to delete this biodata?')) {
      return;
    }

    setDeleteLoading(biodataId);
    try {
      const result = await deleteBiodata(biodataId);
      if (result.success) {
        toast.success('Biodata deleted successfully');
        // Remove from local state
        setBiodatas(biodatas.filter(b => b.id !== biodataId));
      } else {
        toast.error(result.error || 'Failed to delete biodata');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (biodataId: string) => {
    router.push(`/create?id=${biodataId}`);
  };

  const formatDate = (date: any) => {
    if (!date) return 'N/A';

    let dateObj: Date;
    if (date.toDate && typeof date.toDate === 'function') {
      // Firestore Timestamp
      dateObj = date.toDate();
    } else if (date instanceof Date) {
      dateObj = date;
    } else {
      return 'N/A';
    }

    return dateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Biodatas</h1>
            <p className="text-gray-600 mt-1">Manage all your biodatas in one place</p>
          </div>
          <Link
            href="/create"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <FiPlus className="w-5 h-5" />
            Create New Biodata
          </Link>
        </div>

        {/* Biodatas List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your biodatas...</p>
          </div>
        ) : biodatas.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPlus className="w-12 h-12 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No biodatas yet</h3>
            <p className="text-gray-600 mb-6">Create your first biodata to get started</p>
            <Link
              href="/create"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Create Biodata
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biodatas.map((biodata) => (
              <div key={biodata.id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                {/* Biodata Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {biodata.personalInfo?.name ||
                     biodata.personalDetails?.fullName ||
                     biodata.personalDetails?.fullNameMarathi ||
                     'Untitled Biodata'}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">Age:</span>{' '}
                      {biodata.personalInfo?.dateOfBirth || biodata.personalDetails?.age || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Education:</span>{' '}
                      {biodata.personalInfo?.education || biodata.education?.qualification || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Occupation:</span>{' '}
                      {biodata.personalInfo?.jobOrBusiness || biodata.education?.occupation || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Last updated: {formatDate(biodata.updatedAt)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(biodata.id!)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition flex items-center justify-center gap-2"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(biodata.id!)}
                    disabled={deleteLoading === biodata.id}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    {deleteLoading === biodata.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
