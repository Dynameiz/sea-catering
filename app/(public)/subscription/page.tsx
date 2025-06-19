"use client";

import Footer from "@/components/ui/Footer";
import GetStarted from "@/components/ui/GetStarted";
import { useSession } from "next-auth/react";
import { DM_Sans } from "next/font/google";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";
import Image from "next/image";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const mealPlans = [
  {
    name: "Diet Plan",
    short_desc: "Clean, low-calorie meals to help you stay fit and energized.",
    description: "A lighter, low-calorie meal plan designed to help you eat clean and feel energized. Perfect for those looking to manage weight or simply maintain a healthy lifestyle without sacrificing flavor.",
    logo: "/diet-plan.png",
    images: ["/salad.jpg", "/diet-food.jpg", "/diet-food2.webp", "/diet-food3.jpg"],
    price: 30000,
  },
  {
    name: "Protein Plan",
    short_desc: "High-protein meals built to fuel strength and recovery.",
    description: "Packed with lean meats, eggs, legumes, and healthy grains, this plan is built to fuel your workouts, support muscle growth, and keep you full longer. Ideal for active lifestyles and fitness goals.",
    logo: "/protein-plan.png",
    images: ["/cooked-chicken.webp", "/protein-food.jpg", "/protein-food2.webp", "/protein-food3.webp"],
    price: 40000,
  },
  {
    name: "Royal Plan",
    short_desc: "Premium, chef-crafted meals for a complete gourmet experience.",
    description: "Our most complete and indulgent option — featuring a balanced variety of premium ingredients, chef-curated menus, and delicious extras. For those who want the full SEA Catering experience with zero compromises.",
    logo: "/royal-plan.png",
    images: ["/steak.jpg", "/royal-food.jpeg", "/royal-food2.jpg", "/royal-food3.jpg"],
    price: 60000,
  },
];

export default function Subscription() {

  const { status } = useSession();
  const router = useRouter();

  return (
    <div className={`${dmSans.className} relative flex-col items-center justify-center w-full min-h-screen`}>
      <section className="flex flex-col items-center justify-center w-full px-4 py-8 mx-auto bg-light-beige-2">
        <div className="container mx-auto mt-24 flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold pb-2 px-3 border-b-2 border-green">Build Your Perfect Meal Plan</h1>
          <div className="flex flex-col items-center justify-center w-full p-6 bg-white rounded-lg shadow-md mt-8">
            <form action="">
              <div className="grid grid-cols-2">
                <div className="flex flex-col p-4 gap-y-2">
                  <h2 className="text-2xl md:text-3xl font-semibold">Meal Plans</h2>
                  {mealPlans.map((plan) => (
                    <Toggle key={plan.name} className="grid grid-cols-3 w-full items-center">
                      <div className="col-span-1 flex justify-center items-center">
                        <Image src={plan.logo} alt={plan.name} width={144} height={144} />
                      </div>
                      <div className="col-span-2 flex flex-col items-start text-start">
                        <h3 className="text-2xl font-semibold">{plan.name}</h3>
                        <p className="text-md max-w-sm">{plan.short_desc}</p>
                      </div>
                    </Toggle>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <GetStarted />
      <Footer />
    </div>
  )
}
