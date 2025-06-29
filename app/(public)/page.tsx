"use client";

import { DM_Sans } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useRouter } from "next/navigation";
import MenuContainer from "@/components/ui/MenuContainer";
import { useEffect, useState } from "react";
import Logo from "@/components/assets/Logo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { z } from "zod/v4";
import axios from "axios";
import Footer from "@/components/ui/Footer";
import GetStarted from "@/components/ui/GetStarted";
import Spinner from "@/components/ui/Spinner";
import { Testimonials } from "@/types/types";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const guides = [
  {
    title: "Choose Your Meals",
    description:
      "Select from a variety of healthy, delicious meals that fit your dietary preferences and lifestyle.",
    src: "/step1.png",
  },
  {
    title: "Customize Your Plan",
    description:
      "Tailor your meal plan to suit your needs, whether it's for weight loss, muscle gain, or just healthy eating.",
    src: "/step2.png",
  },
  {
    title: "Enjoy Fresh Deliveries",
    description:
      "Receive fresh, never frozen meals delivered right to your doorstep, ready to heat and enjoy.",
    src: "/step3.png",
  },
];

const keyFeatures = [
  {
    quote:
      "Pick meals that fit your lifestyle. Whether you're focused on fitness, managing your diet, or just want delicious, balanced meals — we offer flexible plans to meet your needs.",
    name: "Tailored to Your Taste",
    designation: "",
    src: "tailored-to-your-taste.jpg",
  },
  {
    quote:
      "From big cities to remote areas, we bring healthy meals right to your doorstep. With reliable nationwide delivery, eating well has never been more convenient.",
    name: "Nationwide Delivery",
    designation: "",
    src: "nationwide-delivery.png",
  },
  {
    quote:
      "Every dish is made fresh daily using quality, locally sourced ingredients. No freezing, no shortcuts — just real food, packed with flavor and nutrients.",
    name: "Fresh, Never Frozen",
    designation: "",
    src: "fresh-never-frozen.png",
  },
];

const thisWeekMenu = [
  {
    name: "Rendang",
    description: "",
    src: "/rendang.jpg",
  },
  {
    name: "Steak",
    description: "",
    src: "/steak.jpg",
  },
  {
    name: "Taco",
    description: "",
    src: "/taco.jpg",
  },
  {
    name: "Salad",
    description: "",
    src: "/salad.jpg",
  },
  {
    name: "Steve's Lava Chicken",
    description: "",
    src: "/cooked-chicken.webp",
  },
  {
    name: "Ichiraku Ramen",
    description: "",
    src: "/ichiraku-ramen.webp",
  },
  {
    name: "Fifi Fefe",
    description: "",
    src: "/fifi-fefe.jpg",
  },
  {
    name: "Ais Krim ABCD",
    description: "",
    src: "/abcd.png",
  },
];


const TestimonialSchema = z.object({
  customerName: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  message: z.string().min(1, "Review is required"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
});

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);

  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);

  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [highlight, setHighlight] = useState(0);
  const [starReview, setStarReview] = useState(0);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const resetRating = () => {
    setHighlight(0);
    setStarReview(0);
  };
  
  useEffect(() => {
    if (status === "authenticated") {
      setAuthenticated(true);
    }
  }, [status, router]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/api/testimonial");
        if (response.status === 200) {
          setTestimonials(response.data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        toast.error("Failed to load testimonials.", {
          position: "top-center",
          duration: 3000,
        });
      } finally {
        setLoadingTestimonials(false);
      }
    };
    
    setLoadingTestimonials(true);
    fetchTestimonials();
  }, [testimonials.length]);

  const onSubmit = async(data: z.infer<typeof TestimonialSchema>) => {
    try {
      const parsedData = TestimonialSchema.parse({
        customerName: data.customerName,
        message: data.message,
        rating: data.rating,
      });

      const response = await axios.post("/api/testimonial", {
        customerName: parsedData.customerName,
        message: parsedData.message,
        rating: parsedData.rating,
      });
      if (response.status === 201) {
        toast.success("Review submitted successfully!", {
          position: "top-center",
          duration: 3000,
        });
        setName("");
        setReview("");
        resetRating();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.message, {
          position: "top-center",
          duration: 3000,
        });
      } else if (axios.isAxiosError(error)) {
        toast.error("An error occurred while submitting your review.", {
          position: "top-center",
          duration: 3000,
        });
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.", {
          position: "top-center",
          duration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${dmSans.className} relative flex-col items-center justify-center w-full min-h-screen`}
    >
      {loading && (
        <AnimatePresence>
          <Spinner />
        </AnimatePresence>
      )}
      <section className="flex flex-col items-center justify-center w-full bg-light-beige">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center w-full h-full mt-16 overflow-hidden">
          <motion.div
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", duration: 2.5, bounce: 0.3 }}
            className="container mx-auto flex flex-col px-4 py-12 text-center items-center justify-center lg:pl-48 lg:py-0"
          >
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Healthy Meals,
            </h1>
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Anytime, Anywhere
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("/plans")}
              className="w-fit px-5 py-3 md:px-8 md:py-3 mt-2 md:mt-4 rounded-lg bg-green text-light-beige sm:text-xl font-semibold shadow-md cursor-pointer"
            >
              Explore Plans
            </motion.button>
            <p className="mt-2 md:mt-4 italic text-base sm:text-lg">
              Skip or Cancel Anytime
            </p>
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
      <section className="flex flex-col items-center justify-center w-full py-8 lg:py-16 bg-light-beige-2">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center border-b-2 pb-3 border-green"
        >
          How SEA Catering Works
        </motion.h1>
        <div className="container mx-auto mt-2 md:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {guides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <Image
              src={guide.src}
              alt={guide.title}
              width={128}
              height={128}
              className="w-32 h-32 md:mb-4 object-contain"
              draggable={false}
              />
              <h2 className="text-2xl font-semibold mb-2">{guide.title}</h2>
              <p className="md:text-lg max-w-sm">{guide.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavigation("/plans")}
          className="w-fit px-5 py-3 md:px-8 md:py-3 mt-6 md:mt-8 rounded-lg bg-green text-light-beige sm:text-xl font-semibold shadow-md cursor-pointer"
        >
          Get Started
        </motion.button>
      </section>
      <section className="flex flex-col items-center justify-center w-full py-8 lg:py-16 bg-green">
        <h1 className="text-3xl lg:text-5xl font-bold text-center text-beige border-b-2 pb-3 md:mb-4 border-light-beige z-50">
          Crafted in the Kitchen, Delivered to You
        </h1>
        <AnimatedTestimonials testimonials={keyFeatures} autoplay={true} />
      </section>
      <section className="flex flex-col items-center justify-center w-full bg-light-beige">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-center border-b-2 pb-3 border-green">
            Our Menu
          </h1>
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
                    <Image
                      src={item.src || "dummy.png"}
                      alt={item.name}
                      width={280}
                      height={280}
                      className="w-full aspect-square object-cover rounded-lg"
                      draggable={false}
                    />
                    <h2 className="text-xl font-semibold py-4">{item.name}</h2>
                    {item.description && (
                      <p className="text-sm text-gray-600">
                      {item.description}
                      </p>
                    )}
                    </motion.div>
                ))}
              </div>
            </MenuContainer>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation("/menu")}
            className="w-fit px-5 py-3 md:px-8 md:py-3 rounded-lg bg-green text-light-beige sm:text-xl font-semibold shadow-md cursor-pointer"
          >
            View Full Menu
          </motion.button>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full py-8 bg-green">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-light-beige">
          Have any Questions?
        </h1>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-beige">
          We have Answers!
        </h1>
        <div className="container mx-auto mt-4 md:mt-8 max-w-sm sm:max-w-xl md:max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg sm:text-2xl text-beige">Can you accommodate dietary restrictions and allergies?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p className="sm:text-lg text-light-beige">
                  Absolutely. We can tailor our menus to meet a range of dietary needs,
                  including vegetarian, vegan, gluten-free, dairy-free, nut-free, halal,
                  kosher, and more. Please inform us of any allergies or special requests
                  when placing your order so we can prepare accordingly.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg sm:text-2xl text-beige">Can I customize my menu?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p className="sm:text-lg text-light-beige">
                  Yes! One of our experienced catering coordinators will work
                  closely with you to create a personalized menu that reflects
                  your tastes, dietary needs, and event theme. We offer seasonal
                  specialties and global cuisine options to suit every palate.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg sm:text-2xl text-beige">What are your pricing options?</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p className="sm:text-lg text-light-beige">
                  Our pricing varies depending on the type of service, menu selections,
                  number of guests, and event location. We offer tiered packages and
                  customized quotes to fit different budgets. Contact us today for a
                  detailed proposal tailored to your event.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <section className="relative flex flex-col items-center justify-center w-full bg-light-beige overflow-hidden">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 mt-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center border-b-2 pb-3 border-green">
            Voices of Our Community
          </h1>
        </div>
          <div className="flex flex-col antialiased bg-grid-white/[0.05] mt-2 items-center justify-center w-full relative overflow-hidden">
            {loadingTestimonials ? (
              <div className="flex flex-col items-center justify-center w-full h-64">
                <div className="flex items-center justify-center animate-spin">
                  <Logo
                    width={64}
                    height={64}
                    color="#333333"
                  />
                </div>
                <p className="text-lg text-gray-600 mt-4">Loading testimonials...</p>
              </div>
            )
              : <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
                pauseOnHover={false}
              />
            }
          </div>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 lg:[&>*:first-child]:col-span-1 lg:[&>*:last-child]:col-span-2 mt-8 mb-12 bg-light-green rounded-2xl shadow-lg ">
            <div className="w-full h-full flex-col items-center justify-center bg-light-green hidden rounded-2xl lg:flex">
            <Image
              src="/review.webp"
              alt="review"
              width={600}
              height={600}
              className="w-full h-full object-cover rounded-l-2xl"
              draggable={false}
            />
            </div>
          <div className="w-full h-full flex flex-col items-center justify-center p-8 rounded-r-2xl bg-[#FFFFFF]">
            <h2 className="font-semibold text-2xl md:text-4xl border-b-2 pb-1 border-green">
              Leave us a Review
            </h2>
            <form className="w-full max-w-xl flex flex-col gap-4 mt-6">
              <label className="flex flex-col text-left font-medium sm:text-lg">
                Name
                <input
                  type="text"
                  name="name"
                  className="mt-1 px-3 py-2 border border-green rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="flex flex-col text-left font-medium sm:text-lg">
                Review
                <textarea
                  name="review"
                  className="mt-1 px-3 py-2 border border-green rounded-lg focus:outline-none focus:ring-2 focus:ring-green resize-none"
                  placeholder="Share your experience..."
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  
                />
              </label>
              <div className="flex items-center justify-around gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => setStarReview(1)}
                  onMouseEnter={() => setHighlight(1)}
                  onMouseLeave={() => setHighlight(0)}
                  type="button"
                >
                  <Logo
                    width={48}
                    height={48}
                    color={`${
                      highlight > 0 || starReview > 0 ? "#105E54" : "#333333"
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => setStarReview(2)}
                  onMouseEnter={() => setHighlight(2)}
                  onMouseLeave={() => setHighlight(0)}
                  type="button"
                >
                  <Logo
                    width={48}
                    height={48}
                    color={`${
                      highlight > 1 || starReview > 1 ? "#105E54" : "#333333"
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => setStarReview(3)}
                  onMouseEnter={() => setHighlight(3)}
                  onMouseLeave={() => setHighlight(0)}
                  type="button"
                >
                  <Logo
                    width={48}
                    height={48}
                    color={`${
                      highlight > 2 || starReview > 2 ? "#105E54" : "#333333"
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => setStarReview(4)}
                  onMouseEnter={() => setHighlight(4)}
                  onMouseLeave={() => setHighlight(0)}
                  type="button"
                >
                  <Logo
                    width={48}
                    height={48}
                    color={`${
                      highlight > 3 || starReview > 3 ? "#105E54" : "#333333"
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                  onClick={() => setStarReview(5)}
                  onMouseEnter={() => setHighlight(5)}
                  onMouseLeave={() => setHighlight(0)}
                  type="button"
                >
                  <Logo
                    width={48}
                    height={48}
                    color={`${
                      highlight > 4 || starReview > 4 ? "#105E54" : "#333333"
                    }`}
                  />
                </motion.button>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  if (!authenticated) {
                    toast.error("Please log in to submit a review.", {
                      position: "top-center",
                      duration: 3000,
                    });
                  }
                  else if (name !== "" && review !== "" && starReview > 0) {
                    setLoading(true);
                    const result = TestimonialSchema.safeParse({
                      customerName: name,
                      message: review,
                      rating: starReview,
                    });
                    if (result.success) {
                      onSubmit(result.data);
                    } else {
                      setLoading(false);
                      toast.error("An error occurred while submitting your review.", {
                        position: "top-center",
                        duration: 3000,
                      });
                    }
                  } else {
                    toast.error("Please fill in all fields and select a rating.", {
                      position: "top-center",
                      duration: 3000,
                    });
                  }
                }}
                className="px-6 py-3 rounded-lg bg-green text-light-beige shadow-md text sm:text-lg font-semibold cursor-pointer"
              >
                Submit Review
              </motion.button>
            </form>
          </div>
        </div>
      </section>
      <GetStarted />
      <Footer />
    </div>
  );
}
