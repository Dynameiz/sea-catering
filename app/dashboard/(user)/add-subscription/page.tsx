"use client";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import axios from "axios";
import { useSession } from "next-auth/react";
import { DM_Sans } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod/v4";

const dmSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap',
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

const SubscriptionSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100, "Full name must be less than 100 characters"),
  phoneNumber: z.string().min(10, "Phone number is required").max(15, "Phone number must be less than 15 characters").regex(/^\d+$/, "Phone number must contain only digits"),
  allergies: z.string().optional(),
  selectedDays: z.array(z.string()).min(1, "At least one delivery day must be selected"),
  selectedMealType: z.array(z.string()).min(1, "At least one meal type must be selected"),
  selectedPlan: z.string().min(1, "Please select a meal plan"),
});

export default function AddSubscription() {

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  
  const [fullName, setFullName] = useState(session?.user?.fullName ?? "");
  const [phoneNumber, setPhoneNumber] = useState(session?.user?.phoneNumber ?? "");
  const [allergies, setAllergies] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedMealType, setSelectedMealType] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<{ index: number; name: string }>({ index: -1, name: "" });
  const [price, setPrice] = useState(0);

  const onSubmit = async (data: z.infer<typeof SubscriptionSchema>) => {
    if (data.fullName.length < 1 || data.fullName.length > 100) {
      setLoading(false);
      toast.error("Full name must be between 1 and 100 characters.", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (!data.phoneNumber.startsWith("08")) {
      setLoading(false);
      toast.error("Phone number must start with 08", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (data.phoneNumber.length < 10 || data.phoneNumber.length > 15) {
      setLoading(false);
      toast.error("Phone number must be between 10 and 15 characters", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (!/^\d+$/.test(data.phoneNumber)) {
      setLoading(false);
      toast.error("Phone number must contain only digits", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (data.selectedDays.length < 1) {
      setLoading(false);
      toast.error("Please select at least one delivery day", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (data.selectedMealType.length < 1) {
      setLoading(false);
      toast.error("Please select at least one meal type", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (data.selectedPlan.length < 1) {
      setLoading(false);
      toast.error("Please select a meal plan", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    try {
      const parsedData = SubscriptionSchema.parse({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        allergies: data.allergies,
        selectedDays: data.selectedDays,
        selectedMealType: data.selectedMealType,
        selectedPlan: data.selectedPlan,
      });

      const response = await axios.post("/api/subscription", {
        fullName: parsedData.fullName,
        phoneNumber: parsedData.phoneNumber,
        allergies: parsedData.allergies,
        selectedDays: parsedData.selectedDays,
        selectedMealType: parsedData.selectedMealType,
        selectedPlan: parsedData.selectedPlan,
        price: price,
        userId: session?.user?.id ? parseInt(session.user.id, 10) : undefined,
      });

      if (response.status === 201) {
        toast.success("Subscription successful! We will contact you soon.", {
          position: "top-center",
          duration: 3000,
        });
      } else {
        toast.error("Failed to subscribe. Please try again later.", {
          position: "top-center",
          duration: 3000,
        });
      }

    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${dmSans.className} flex flex-1`}>
        <div className="w-full rounded-tl-2xl mx-auto flex items-center justify-center min-h-screen bg-light-beige-2 p-4 md:p-10">
          <div className="container flex flex-col items-center justify-center w-full max-w-7xl p-2 sm:p-4 md:p-6 bg-[#FFFFFF] rounded-xl shadow-md mt-4 sm:mt-6 md:mt-8">
            <form 
              onSubmit={(e) => {
              e.preventDefault();
              
              setLoading(true);
              const result = SubscriptionSchema.safeParse({
                fullName: fullName,
                phoneNumber: phoneNumber,
                allergies: allergies,
                selectedDays: selectedDays,
                selectedMealType: selectedMealType,
                selectedPlan: selectedPlan.name,
              });
              if (result.success) {
                onSubmit(result.data);
              } else {
                setLoading(false);
                toast.error("Please fill in all fields correctly.", {
                  position: "top-center",
                  duration: 3000,
                });
              }
            }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-2 md:gap-12">
                <div className="flex flex-col gap-y-2 justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold">Meal Plans <span className="text-red-700">*</span></h2>
                    {mealPlans.map((plan, idx) => (
                    <Toggle
                      key={plan.name}
                      className="grid grid-cols-3 w-full py-4 items-center cursor-pointer"
                      pressed={selectedPlan.index === idx}
                      onPressedChange={() => { setSelectedPlan({ index: idx, name: plan.name }); setPrice(plan.price); }}
                    >
                      <div className="col-span-1 flex justify-center items-center">
                        <Image src={plan.logo} alt={plan.name} width={144} height={96} />
                      </div>
                      <div className="col-span-2 flex flex-col items-start text-start">
                        <h3 className="text-2xl font-semibold">{plan.name}</h3>
                        <p className="text-md max-w-sm">{plan.short_desc}</p>
                      </div>
                    </Toggle>
                    ))}
                </div>
                <div className="flex flex-col gap-y-2 justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold">Credentials</h2>
                  <div className="grid grid-cols-1 gap-2 w-full">
                    <div className="flex flex-col items-start w-full">
                      <h4 className="text-sm mb-1 font-semibold">Name <span className="text-red-700">*</span></h4>
                      <Input
                        type="text"
                        placeholder="Stardenburdenhardenbart"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <h4 className="text-sm mb-1 font-semibold">Active Phone Number <span className="text-red-700">*</span></h4>
                      <Input
                        type="text"
                        placeholder="08XXXXXXXXXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <h4 className="text-sm mb-1 font-semibold">Allergies</h4>
                      <Input
                        type="text"
                        placeholder="e.g: Peanuts"
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-center w-full mt-2">
                      <h4 className="w-full md:w-1/4 text-sm lg:text-md xl:text-lg font-semibold">Delivery Days <span className="text-red-700">*</span></h4>
                      <ToggleGroup
                        type="multiple"
                        className="flex-1 grid grid-cols-7 gap-0.5 w-full"
                        value={selectedDays}
                        onValueChange={setSelectedDays}
                      >
                        <ToggleGroupItem value="mon" className="w-full h-10 cursor-pointer">
                          Mon
                        </ToggleGroupItem>
                        <ToggleGroupItem value="tue" className="w-full h-10 cursor-pointer">
                          Tue
                        </ToggleGroupItem>
                        <ToggleGroupItem value="wed" className="w-full h-10 cursor-pointer">
                          Wed
                        </ToggleGroupItem>
                        <ToggleGroupItem value="thu" className="w-full h-10 cursor-pointer">
                          Thu
                        </ToggleGroupItem>
                        <ToggleGroupItem value="fri" className="w-full h-10 cursor-pointer">
                          Fri
                        </ToggleGroupItem>
                        <ToggleGroupItem value="sat" className="w-full h-10 cursor-pointer">
                          Sat
                        </ToggleGroupItem>
                        <ToggleGroupItem value="sun" className="w-full h-10 cursor-pointer">
                          Sun
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                    <div className="flex flex-col md:flex-row items-center w-full mb-2">
                      <h4 className="w-full md:w-1/4 text-sm lg:text-md xl:text-lg font-semibold">Meal Type <span className="text-red-700">*</span></h4>
                      <ToggleGroup
                        type="multiple"
                        className="flex-1 grid grid-cols-3 gap-0.5 w-full"
                        value={selectedMealType}
                        onValueChange={setSelectedMealType}
                      >
                        <ToggleGroupItem value="bre" className="w-full h-10 cursor-pointer">
                          Breakfast
                        </ToggleGroupItem>
                        <ToggleGroupItem value="lun" className="w-full h-10 cursor-pointer">
                          Lunch
                        </ToggleGroupItem>
                        <ToggleGroupItem value="din" className="w-full h-10 cursor-pointer">
                          Dinner
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                    <div className="flex flex-row items-start justify-between w-full mt-4">
                      <h3 className="text-lg mb-1 font-semibold">Total</h3>
                      <h4 className="text-lg mb-1">{(price * (selectedMealType.length === 0 ? 1 : selectedMealType.length) * (selectedDays.length === 0 ? 1 : selectedDays.length) * 4.3).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</h4>
                    </div>
                    <button
                      type="submit"
                      className="w-full h-12 bg-green hover:bg-dark-green-2 text-beige font-semibold rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center cursor-pointer"
                    >
                      Select This Plan
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}
