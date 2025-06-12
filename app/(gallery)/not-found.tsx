export default function ImageNotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-xl font-semibold text-gray-600 mb-4">
            Image Page Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            The Image page you're looking for doesn't exist.
          </p>
          <a
            href="/(gallery)"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Main
          </a>
        </div>
      </div>
    );
  }