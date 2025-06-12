export default function UserLoading() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center p-4 border rounded-md">
            <div className="animate-pulse bg-gray-300 h-8 w-3/4 mb-4"></div>
            <div className="animate-pulse bg-gray-300 h-6 w-3/4 rounded mb-2"></div>
            <div className="animate-pulse bg-gray-300 h-4 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    );
  }