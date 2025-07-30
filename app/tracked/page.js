export default function TrackedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Email Tracked Successfully! 📧
          </h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for opening this email. Your engagement has been recorded.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>What happened?</strong><br />
              When you clicked the link in your email, it triggered our tracking system and logged your email open.
            </p>
          </div>
          
          <div className="space-y-3">
            <a
              href="/"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Dashboard
            </a>
            
            <button
              onClick={() => window.close()}
              className="block w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 