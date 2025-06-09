"use client";

import { DM_Sans } from "next/font/google";
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const testimonials = [
  {
    quote: "Pick meals that fit your lifestyle. Whether you're focused on fitness, managing your diet, or just want delicious, balanced meals — we offer flexible plans to meet your needs.",
    name: "Tailored to Your Taste",
    designation: "",
    src: "tailored-to-your-taste.jpg",
  },
  {
    quote: "From big cities to remote areas, we bring healthy meals right to your doorstep. With reliable nationwide delivery, eating well has never been more convenient.",
    name: "Nationwide Delivery",
    designation: "",
    src: "nationwide-delivery.png",
  },
  {
    quote: "Every dish is made fresh daily using quality, locally sourced ingredients. No freezing, no shortcuts — just real food, packed with flavor and nutrients.",
    name: "Fresh, Never Frozen",
    designation: "",
    src: "fresh-never-frozen.png",
  },
];

export default function Home() {
  return (
    <div className={`${dmSans.className} relative flex-col items-center justify-center w-full min-h-screen`}>
      <section className="flex flex-col items-center justify-center w-full min-h-screen aspect-video bg-light-beige">
        <div className="grid grid-cols-2 items-center w-full h-full">
          <motion.div
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", duration: 2.5, bounce: 0.3 }}
            className="container mx-auto flex flex-col pl-48"
          >
            <h1 className="text-6xl font-bold mb-4">Healthy Meals,</h1>
            <h1 className="text-6xl font-bold mb-4">Anytime, Anywhere</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = "/plans"}
              className="w-fit px-8 py-4 mt-4 rounded-lg bg-dark-green text-light-beige text-2xl font-semibold cursor-pointer"
            >
              Explore Plans
            </motion.button>
            <p className="mt-4 ml-1 italic">Skip or Cancel Anytime</p>
          </motion.div>
          <div className="relative w-full h-full min-h-screen flex items-center">
            <motion.img src="Hero.png" alt="Hero Photo"
              className="absolute z-20"
              initial={{ x: 1000, rotate: 130 }}
              animate={{ x: 0, rotate: 0 }}
              transition={{ type: "spring", duration: 2.5, bounce: 0.3 }}
              draggable="false"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full pt-24 lg:pt-16 bg-light-beige-2">
        <h1 className="text-4xl lg:text-5xl font-bold text-center border-b-2 pb-3 border-green">Crafted in the Kitchen, Delivered to You</h1>
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </section>
      <section>

      </section>
      <footer className="flex items-center justify-center w-full h-48 bg-gray-800 text-white">

      </footer>
    </div>
  );
}
