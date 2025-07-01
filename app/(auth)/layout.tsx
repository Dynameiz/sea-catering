import { Metadata } from "next";
import "@/app/globals.css";
import Image from "next/image";
import { Providers } from "../provider";
import { DynaPuff, DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const dynaPuff = DynaPuff({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-dyna-puff",
  display: "swap",
});

const DM_SansFont = DM_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SEA Catering",
  description: "Healthy Meals, Anytime, Anywhere",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-screen relative">
          {/* Back Button */}
          <Link
            href="/"
            className="absolute left-4 top-8 lg:left-8 z-10 flex items-center p-3 rounded-full shadow bg-white/75 hover:bg-white lg:bg-transparent lg:hover:bg-white/25 transition-colors text-green lg:text-white font-bold"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="hidden lg:flex lg:flex-col bg-green w-full h-full items-center justify-center gap-4">
        <h1 className={`${DM_SansFont.className} text-4xl font-semibold text-light-beige`}>Welcome to</h1>
        <Image src={"/badoobee.png"} alt="SEA Catering Logo" width={500} height={500}/>
        <h1 className={`${dynaPuff.className} text-6xl font-bold text-beige`}>SEA Catering</h1>
        <h2 className={`${DM_SansFont.className} text-xl text-light-beige`}>Healthy Meals, Anytime, Anywhere</h2>
          </div>
          <Providers>
        {children}
          </Providers>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
