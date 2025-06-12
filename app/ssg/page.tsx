interface Post {
  id: number;
  title: string;
  body: string;
}

async function getStaticPosts(): Promise<Post[]> {
  console.log(
    "Fetching posts for SSG page... This will only run at build time."
  );
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function SSGPage() {
  const posts = await getStaticPosts();

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">
            Static Site Generation (SSG)
          </h1>
          <p className="text-gray-300">
            This page fetches data at build time. The content is pre-rendered
            into static HTML and served from a CDN. It's incredibly fast and
            great for SEO. This list of posts will not change until you rebuild
            the site.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Data fetched from: https://jsonplaceholder.typicode.com/posts
          </p>
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
            >
              <h2 className="text-xl font-semibold text-cyan-300 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-400">{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
