import { motion } from "framer-motion";
import Image from "next/image";

type mealPlan = {
    name: string;
    description: string;
    image: string;
    price: number;
}

export default function PlanCard(plan: mealPlan) {
  return (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.0 }}
        className="bg-white max-w-md p-6 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-center text-center">
        <Image src={plan.image} alt={plan.name} width={240} height={160} draggable={false} />
        <h2 className="text-2xl md:text-3xl font-semibold mt-2">{plan.name}</h2>
        <p className="text-lg mt-2">{plan.description}</p>
    </motion.div>
  )
}
