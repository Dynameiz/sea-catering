import { Metadata } from "next";
import "@/app/globals.css";
import Image from "next/image";
import { Providers } from "../provider";
import { DynaPuff, DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-screen">
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
