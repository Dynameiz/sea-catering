"use client";

import Footer from "@/components/ui/Footer";
import GetStarted from "@/components/ui/GetStarted";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export default function Subscription() {
  return (
    <div className={`${dmSans.className} relative flex-col items-center justify-center w-full min-h-screen`}>
      <section className="flex flex-col items-center justify-center w-full px-4 py-8 mx-auto bg-light-beige-2">
      </section>
      <section className="flex flex-col items-center justify-center w-full pt-24 lg:pt-16 bg-green">
        
      </section>
      <GetStarted />
      <Footer />
    </div>
  )
}
