import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookSwap",
  description: "BookSwap is an online marketplace for buying and selling second-hand books. Discover a wide variety of books at affordable prices or sell your used books to a community of avid readers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>
      <div className="container">
        <Navbar />
        {children}
        <Footer />
          </div>
      </body>
    </html>
  );
}
