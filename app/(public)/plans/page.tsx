"use client";

import Footer from "@/components/ui/Footer";
import GetStarted from "@/components/ui/GetStarted";
import PlanCard from "@/components/ui/Cards";
import { motion } from "framer-motion";
import { DM_Sans } from "next/font/google";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";
import MealPlanContent from "@/components/ui/ModalContent";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

export default function Plans() {

  const { status } = useSession();
  const router = useRouter();

  const handleClick = (planName: string) => {
    if (status !== "authenticated") {
      toast.error("Please log in to book a meal plan.",{
        duration: 5000,
        action: {
          label: "Log In",
          onClick: () => router.push("/login"),
        },
      });
      return;
    }
    toast.success(`You have selected the ${planName}. Please proceed to checkout.`, {
      duration: 5000,
      action: {
        label: "Go to Checkout",
        onClick: () => router.push("/"),
      },
    }
    );
  };

  return (
    <div className={`${dmSans.className} relative flex-col items-center justify-center w-full min-h-screen`}>
      <section className="flex flex-col items-center justify-center w-full px-4 mx-auto bg-light-beige-2">
        <div className="container mx-auto flex flex-col items-center justify-center mb-8 mt-16 md:mt-24 py-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 p-3 pt-0 border-b-2 border-green">Meal Plans</h1>
          <p className="text-lg max-w-2xl md:max-w-full text-center">
            Choose a plan that suits your needs. We offer flexible options to help you get the most out of our services.
          </p>
          <div className="container mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 items-center justify-center justify-items-center gap-6">
            {mealPlans.map((plan, index) => (
                <Modal key={index}>
                <ModalTrigger >
                  <div>
                  <PlanCard
                    name={plan.name}
                    description={plan.short_desc}
                    image={plan.logo}
                    price={plan.price}
                  />
                  </div>
                </ModalTrigger>
                <ModalBody >
                  <ModalContent>
                    <MealPlanContent
                      name={plan.name}
                      description={plan.description}
                      image={plan.images}
                      price={plan.price}
                    />
                  </ModalContent>
                </ModalBody>
                </Modal>
            ))}
          </div>
        </div>
      </section>
      <GetStarted />
      <Footer />
    </div>
  )
}
