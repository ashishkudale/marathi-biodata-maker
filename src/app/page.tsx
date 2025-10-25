import Link from 'next/link';
import { FiEdit3, FiDownload, FiShare2, FiLayout } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 font-marathi">
              मराठी बायोडाटा मेकर
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Create Beautiful
              <span className="text-orange-500"> Marathi Biodata</span>
              <br />
              in Minutes
            </h2>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Modern, professional, and traditional biodata templates.
            <br />
            Free to use. No signup required.
          </p>
          <Link
            href="/create"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition shadow-lg hover:shadow-xl"
          >
            Create Biodata Now →
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiEdit3 className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Easy to Use</h3>
            <p className="text-gray-600 text-sm">
              Simple step-by-step form to fill your details
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLayout className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Beautiful Templates</h3>
            <p className="text-gray-600 text-sm">
              Choose from traditional and modern designs
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiDownload className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Download PDF</h3>
            <p className="text-gray-600 text-sm">
              Get print-ready PDF instantly
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShare2 className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Easy Sharing</h3>
            <p className="text-gray-600 text-sm">
              Share via WhatsApp or email
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Choose Template</h3>
              <p className="text-gray-600 text-sm">
                Select from traditional, modern, or photo templates
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Fill Details</h3>
              <p className="text-gray-600 text-sm">
                Complete the form with your personal and family information
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Download & Share</h3>
              <p className="text-gray-600 text-sm">
                Download PDF or share directly with family and friends
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-500 text-white py-16 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your Biodata?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            It&apos;s free, fast, and easy!
          </p>
          <Link
            href="/create"
            className="inline-block bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
          >
            Get Started →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Marathi Biodata Maker. Made with ❤️ for the Marathi community.
          </p>
        </div>
      </footer>
    </div>
  );
}
