interface ProductData {
  id: number;
  title: string;
  description: string;
}

async function getRevalidatedData(): Promise<ProductData | null> {
  const randomProductId = Math.floor(Math.random() * 100) + 1;
  console.log(
    `Fetching data for ISR page (Product ID: ${randomProductId})... This runs at build time and then at most once every 10 seconds on request.`
  );

  try {
    const res = await fetch(
      `https://dummyjson.com/products/${randomProductId}`,
      {
        next: {
          revalidate: 10, // Re-generate this page in the background at most every 10 seconds
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ISRPage() {
  const product = await getRevalidatedData();

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">
            Incremental Static Regeneration (ISR)
          </h1>
          <p className="text-gray-300">
            This page is statically generated but can be updated after
            deployment. A new version is generated in the background if a
            request comes in after the 10-second revalidation period.
          </p>
          <p className="text-gray-300 mt-2">
            Refresh the page after 10 seconds to see a new product. You might
            see the old product first (the stale version) while the new one is
            generated.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Data fetched from: https://dummyjson.com/products
          </p>
        </div>

        {product ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-purple-200 mb-4">
              {product.title}
            </h2>
            <p className="text-gray-300">{product.description}</p>
            <p className="text-center text-sm text-gray-500 mt-6">
              Page last generated at: {new Date().toLocaleTimeString()}
            </p>
          </div>
        ) : (
          <div className="bg-red-900 p-6 rounded-lg shadow-md text-center">
            <p className="text-lg text-white">Failed to load product data.</p>
          </div>
        )}
      </div>
    </div>
  );
}
