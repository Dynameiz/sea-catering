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

export default function About() {
  return (
    <div className={`${dmSans.className} relative flex-col items-center justify-center w-full min-h-screen`}>
      <section className="flex flex-col items-center justify-center w-full px-4 py-8 mx-auto bg-beige">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 lg:[&>*:first-child]:col-span-1 lg:[&>*:last-child]:col-span-2 mt-16 overflow-hidden">
          <div className="container flex items-center justify-center w-full">
            <Image src={"/badoobee.png"} alt="Badoobee" width={300} height={300} className="w-full h-auto object-cover" draggable={false}/>
          </div>
          <div className="container flex flex-col w-full justify-center">
            <h1 className="text-4xl lg:text-5xl font-bold">About Us</h1>
            <p className="mt-4 text-lg text-justify leading-loose">
              Welcome to SEA Catering - your trusted partner for healthy, customizable meals delivered right to your doorstep,
              anywhere in Indonesia. Whether you're looking to stay fit, save time, or just enjoy nutritious food without the hassle,
              we're here to make it easier for you to eat well and feel great every day.
            </p>
          </div>
        </div>
      </section>
      <section
        className="flex flex-col items-center justify-center w-full py-24 lg:py-16 relative"
        style={{
          backgroundImage: 'url("/food-background.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark-green opacity-80 pointer-events-none" />
        <div className="container mx-auto flex flex-col items-center justify-center text-center relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-beige border-b-2 pb-3">Our Mission</h1>
          <p className="mt-4 max-w-3xl text-light-beige text-lg text-center leading-loose">
            To make healthy eating easy, affordable, and enjoyable for everyone in Indonesia.
            We believe that food is more than just fuel — it's comfort, culture, and care. That’s why every meal we create is thoughtfully prepared with your goals, preferences, and well-being in mind.
          </p>
        </div>
      </section>
      <GetStarted />
      <Footer />
    </div>
  )
}
