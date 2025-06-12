import { Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Images Gallery",
  description: " A collection of beautiful images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header */}
      <header className="bg-gray-400 text-white p-4 shadow-md flex-shrink-0 shadow-lg shadow-slate-100 border-b-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
            <Link href="/" className="text-slate-200 hover:text-slate-100 hover:scale-110 transition-transform duration-300">
              <Home/>
            </Link>
            <h1 className="text-xl font-bold ">Images</h1>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
