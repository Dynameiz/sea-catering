"use client";

import { DM_Sans } from "next/font/google";
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Card from "@/components/ui/Card";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const guides = [
  {
    title: "Choose Your Meals",
    description: "Select from a variety of healthy, delicious meals that fit your dietary preferences and lifestyle.",
    src: "step1.png",
  },
  {
    title: "Customize Your Plan",
    description: "Tailor your meal plan to suit your needs, whether it's for weight loss, muscle gain, or just healthy eating.",
    src: "step2.png",
  },
  {
    title: "Enjoy Fresh Deliveries",
    description: "Receive fresh, never frozen meals delivered right to your doorstep, ready to heat and enjoy.",
    src: "step3.png",
  },
];

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

const thisWeekMenu = [
  {
    name: "Sweet Madame",
    description: "",
    src: "",
  },
  {
    name: "Jueyun Chili Chicken",
    description: "",
    src: "",
  },
  {
    name: "Spicy Tuna Poke Bowl",
    description: "",
    src: "",
  },
  {
    name: "Ais Krim ABCD",
    description: "",
    src: "",
  },
  {
    name: "Fifi Feyfey",
    description: "",
    src: "",
  },
];

export default function Home() {

  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={`${dmSans.className} relative flex-col items-center justify-center w-full min-h-screen`}>
      <section className="flex flex-col items-center justify-center w-full bg-light-beige">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-full h-full mt-16">
          <motion.div
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", duration: 2.5, bounce: 0.3 }}
            className="container mx-auto flex flex-col px-4 py-12 text-center items-center justify-center lg:pl-48 lg:py-0"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Healthy Meals,</h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Anytime, Anywhere</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("/plans")}
              className="w-fit px-6 py-3 mt-4 rounded-lg bg-dark-green text-light-beige text-lg sm:text-xl lg:text-2xl font-semibold cursor-pointer"
            >
              Explore Plans
            </motion.button>
            <p className="mt-4 italic text-base sm:text-lg">Skip or Cancel Anytime</p>
          </motion.div>
          <div className="relative w-full h-64 sm:h-96 lg:h-full min-h-[300px] flex items-center justify-center">
            <motion.img
              src="Hero.png"
              alt="Hero Photo"
              className="relative z-20 w-full h-full object-contain max-h-80 sm:max-h-96 lg:max-h-[600px]"
              initial={{ x: 1000, rotate: 130 }}
              animate={{ x: 0, rotate: 0 }}
              transition={{ type: "spring", duration: 2.5, bounce: 0.3 }}
              draggable="false"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full py-24 lg:py-16 bg-light-beige-2">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl lg:text-5xl font-bold text-center border-b-2 pb-3 border-green"
        >
          How SEA Catering Works
        </motion.h1>
        <div className="container mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <img src={guide.src} alt={guide.title} className="w-32 h-32 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">{guide.title}</h2>
              <p className="text-lg">{guide.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavigation("/plans")}
          className="mt-8 px-6 py-3 rounded-lg bg-dark-green text-light-beige text-lg sm:text-xl lg:text-2xl font-semibold cursor-pointer"
        >
          Get Started
        </motion.button>
      </section>
      <section className="flex flex-col items-center justify-center w-full pt-24 lg:pt-16 bg-green">
        <h1 className="text-4xl lg:text-5xl font-bold text-center text-beige border-b-2 pb-3 border-light-beige z-50">Crafted in the Kitchen, Delivered to You</h1>
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </section>
      <section className="flex flex-col items-center justify-center w-full bg-light-beige">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-center border-b-2 pb-3 border-green">This Week's Menu</h1>
          <Carousel className="container mx-auto mt-8 w-full max-w-6xl">
            <CarouselContent className="flex flex-row justify-center gap-2 overflow-clip">
              {thisWeekMenu.map((menu, index) => (
                <CarouselItem className="basis-1/3">
                  <Card props={menu}/>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      <footer className="flex items-center justify-center w-full h-48 bg-dark-grey text-white">
        <div className="container mx-auto text-center">
          <p className="text-lg">© 2025 SEA Catering. All rights reserved.</p>
          <p className="text-sm mt-2">Made with ❤️ by SEA Catering Team</p>
        </div>
      </footer>
    </div>
  );
}
