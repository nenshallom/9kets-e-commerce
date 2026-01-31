import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

// font
const lufga = localFont({
  src: [
    {
      path: "./fonts/Lufga-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Lufga-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Lufga-Bold.ttf",
      weight: "700",
      style: "normal",
    },
   
  ],
  variable: "--font-lufga", // This is the CSS variable name
  display: "swap",
});


export const metadata: Metadata = {
  title: "9kets | Latest Gadgets",
  description: "Explore smartphones, laptops, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lufga.variable} min-h-screen flex flex-col bg-white`}>
      <Providers> 
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />

          <Toaster 
            position="top-center" 
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}