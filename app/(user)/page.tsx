"use client";

import { DM_Sans } from "next/font/google";
import { motion } from "framer-motion";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const images = [
  "meal-1.jpg",
  "meal-2.jpg",
  "meal-3.jpg",
  "meal-4.jpg",
  "meal-5.jpg",
  "meal-6.jpg",
  "meal-7.jpg",
  "meal-8.jpg",
];

export default function Home() {
  return (
    <div className={`${dmSans.className} relative flex-col items-center justify-center w-full min-h-screen`}>
      <section className="flex flex-col items-center justify-center w-full min-h-screen aspect-video bg-light">
        <div className="grid grid-cols-2 items-center w-full h-full">
          <div className="container mx-auto flex flex-col pl-48">
            <h1 className="text-6xl font-bold mb-4">Healthy Meals,</h1>
            <h1 className="text-6xl font-bold mb-4">Anytime, Anywhere</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = "/plans"}
              className="w-fit px-8 py-4 mt-4 rounded-lg bg-background text-light text-2xl font-semibold cursor-pointer"
            >
              Explore Plans
            </motion.button>
            <p className="mt-4 ml-1"><i>Skip or Cancel Anytime</i></p>
          </div>
          <div className="relative w-full h-full min-h-screen">
            <img
              src="hero-photo-3.jpg"
              alt=""
              className="object-cover w-full h-full"
              style={{ objectPosition: "center" }}
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full min-h-screen bg-light-2">
        <div className="container mx-96 flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 h-64">

        </div>
      </section>
      <footer className="flex items-center justify-center w-full h-48 bg-gray-800 text-white">

      </footer>
    </div>
  );
}
