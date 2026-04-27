import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import Providers from "@/components/Providers";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI CTO Radar - Dashboard",
  description: "High-performance dashboard for modern technical founders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} light`} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body-lg text-body-lg min-h-screen antialiased flex" suppressHydrationWarning>
        <Sidebar />
        <div className="flex-1 ml-64 flex flex-col min-h-screen w-full">
          <TopNav />
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
