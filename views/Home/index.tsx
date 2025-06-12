import Link from "next/link";
import { PATHNAME } from "@/constant/pathname";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Welcome to the Home Page
        </h1>

        <Link
          href={PATHNAME.USERS}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          View Users
        </Link>

        <Link
          href={PATHNAME.IMAGES}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors ml-4"
        >
          View Images
        </Link>

        <div className="mt-6 flex flex-col gap-2 items-center justify-center">
          <p className=" text-gray-300">Check SSG, SSR, and ISR</p>
          <div className="flex space-x-4">
            <Link
              href={PATHNAME.SSG}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-colors ml-4"
            >
              SSG
            </Link>
            <Link
              href={PATHNAME.SSR}
              className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition-colors ml-4"
            >
              SSR
            </Link>
            <Link
              href={PATHNAME.ISR}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors ml-4"
            >
              ISR
            </Link>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 items-center justify-center">
          <p className=" text-gray-300">Check Parallel Routing</p>
          <div className="flex mb-2">
            <Link
              href={PATHNAME.PARALLEL}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors ml-4"
            >
              Parallel Route
            </Link>
            <Link
              href={`${PATHNAME.PARALLEL}/test`}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors ml-4"
            >
              Incorrect Parallel Route (Default.tsx)
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href={PATHNAME.BLOG}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors ml-4"
            >
              Blog (Catch All Route)
            </Link>
            <Link
              href={PATHNAME.BLOG_SLUG}
              className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors ml-4"
            >
              Blog with Slug (Catch All Route)
            </Link>
            <Link
              href={PATHNAME.SHOP}
              className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition-colors ml-4"
            >
              Shop (Catch All Route Optional)
            </Link>
            <Link
              href={PATHNAME.SHOP_SLUG}
              className="bg-lime-600 text-white px-6 py-2 rounded hover:bg-lime-700 transition-colors ml-4"
            >
              Shop with Slug (Catch All Route Optional)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
