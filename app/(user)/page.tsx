"use client";

import { DM_Sans } from "next/font/google";
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useRouter } from "next/navigation";
import MenuContainer from "@/components/ui/MenuContainer";
import { IconBrandGithub, IconBrandInstagram, IconBrandTiktok, IconBrandX, IconBrandYoutube } from "@tabler/icons-react";

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
    name: "Rendang",
    description: "",
    src: "rendang.jpg",
  },
  {
    name: "Steak",
    description: "",
    src: "steak.jpg",
  },
  {
    name: "Taco",
    description: "",
    src: "taco.jpg",
  },
  {
    name: "Chicken Lava",
    description: "",
    src: "cooked-chicken.webp",
  },
  {
    name: "Ichiraku Ramen",
    description: "",
    src: "ichiraku-ramen.webp",
  },
  {
    name: "Fifi Fefe",
    description: "",
    src: "fifi-fefe.jpg",
  },
  {
    name: "Ais Krim ABCD",
    description: "",
    src: "abcd.png",
  },
];

const socialMediaLinks = [
  {
    name: "Instagram",
    icon: <IconBrandInstagram color="#333333" size={28}/>,
    link: "https://www.instagram.com/not_hanz/"
  },
  {
    name: "X",
    icon: <IconBrandX color="#333333" size={28}/>,
    link: "https://x.com/COMPFEST"
  },
  {
    name: "TikTok",
    icon: <IconBrandTiktok color="#333333" size={28}/>,
    link: "https://www.tiktok.com/@compfest"
  },
  {
    name: "YouTube",
    icon: <IconBrandYoutube color="#333333" size={28}/>,
    link: "https://www.youtube.com/@COMPFESTUI"
  },
  {
    name: "GitHub",
    icon: <IconBrandGithub color="#333333" size={28}/>,
    link: "https://github.com/Dynameiz/sea-catering"
  },
]

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
          <div className="w-full mt-8">
            <MenuContainer>
              <div className="flex gap-6 pb-4">
                {thisWeekMenu.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    className="max-w-[280px] min-w-[280px] bg-white rounded-xl shadow-md flex flex-col items-center cursor-pointer flex-shrink-0"
                  >
                    <img
                      src={item.src || "dummy.png"}
                      alt={item.name}
                      className="w-full aspect-square object-cover rounded-lg"
                      draggable="false"
                    />
                    <h2 className="text-xl font-semibold py-4">{item.name}</h2>
                    {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                  </motion.div>
                ))}
              </div>
            </MenuContainer>
          </div>
        </div>
      </section>
      <footer className="flex flex-col items-center justify-center w-full h-48 bg-dark-grey text-white">
        <div className="flex flex-row items-center justify-center gap-6 mb-4">
          {socialMediaLinks.map((link, index) => (
            <motion.a href={link.link} target="_blank" rel="noopener noreferrer" key={index} className="text-2xl bg-white p-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
        <h3 className="text-2xl font-semibold mb-4">Brian - 08123456789</h3>
        <p className="absolute bottom-0 w-full mb-4 text-lg text-center">© 2025 SEA Catering. All rights reserved.</p>
      </footer>
    </div>
  );
}
