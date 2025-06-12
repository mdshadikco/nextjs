'use client';

export default function ImageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Image Error
        </h2>
        <p className="text-gray-600 mb-4">
          Unable to load Image data
        </p>
        <button
          onClick={reset}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}