import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Komunikasi Digital",
  description: "Platform manajemen komunikasi digital terpadu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${geist.className} h-full`}>
      <body className="h-full flex bg-slate-100">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
