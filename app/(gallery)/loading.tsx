export default function ImageLoading() {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <div className="animate-pulse bg-gray-300 h-8 w-48 rounded mb-4"></div>
          <div className="animate-pulse bg-gray-300 h-4 w-32 rounded mb-2"></div>
          <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
        </div>
      </div>
    );
  }