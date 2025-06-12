import { instance, apicall } from '@/services/axios';

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

interface SSRData {
  serverTime: string;
  requestId: string;
  userData: User | null;
  source: string;
}

function generateRequestId(): string {
  return `ssr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
}

async function fetchServerData(): Promise<SSRData> {
  const requestId = generateRequestId();
  const serverTime = new Date().toISOString();
  
  console.log(`[SSR] Processing request: ${requestId} at ${serverTime}`);
  
  try {
    const userId = Math.floor(Math.random() * 10) + 1;
    const config = apicall({
      url: `https://jsonplaceholder.typicode.com/users/${userId}`,
      method: 'GET'
    });
    
    const response = await instance.request<User>(config);
    
    return {
      serverTime,
      requestId,
      userData: response.data,
      source: 'JSONPlaceholder API'
    };
  } catch (error) {
    console.error('[SSR] API failed:', error);
    return {
      serverTime,
      requestId,
      userData: null,
      source: 'Server fallback'
    };
  }
}

export default async function SSRPage() {
  const data = await fetchServerData();

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-green-400 mb-2">
            Server-Side Rendering Demo
          </h1>
          <p className="text-gray-300">
            This page is pre-rendered on the server with fresh data on every request.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-6 text-center">
          <h2 className="text-lg text-gray-400 mb-2">Server Render Time</h2>
          <p className="text-2xl font-mono text-green-300">
            {new Date(data.serverTime).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Request ID: {data.requestId}
          </p>
        </div>

        {data.userData ? (
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h2 className="text-xl text-blue-400 mb-4">
              Data from {data.source}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm text-gray-400">Name</h3>
                <p className="text-lg text-white">{data.userData.name}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400">Email</h3>
                <p className="text-lg text-white">{data.userData.email}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm text-gray-400">Company</h3>
                <p className="text-lg text-white">{data.userData.company.name}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h2 className="text-xl text-yellow-400">Server Fallback</h2>
            <p className="text-gray-300">External API unavailable, but page still server-rendered!</p>
          </div>
        )}

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Why This is SSR:</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Data fetched on server before HTML is sent</li>
            <li>• Each refresh shows new timestamp & request ID</li>
            <li>• External API calls happen server-side</li>
            <li>• Page content is fully rendered when it reaches browser</li>
          </ul>
        </div>

      </div>
    </div>
  );
}