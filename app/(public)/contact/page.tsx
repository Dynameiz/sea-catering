"use client";

import Footer from "@/components/ui/Footer";
import GetStarted from "@/components/ui/GetStarted";
import { DM_Sans } from "next/font/google";
import Image from "next/image";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export default function Contact() {
  return (
    <div className={`${dmSans.className} relative flex-col items-center justify-center w-full min-h-screen`}>
      <section className="flex flex-col items-center justify-center w-full px-4 py-8 mx-auto bg-light-beige-2">
        <div className="container flex flex-col items-center justify-center mx-auto mt-24 text-center">
          <Image src={"/WAG-QR.png"} alt="WAG QR Code" width={200} height={200} className="rounded-lg mb-8" />
        </div>
      </section>
      <GetStarted />
      <Footer />
    </div>
  )
}
