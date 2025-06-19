
import { motion } from "framer-motion";
import Image from "next/image";

type mealPlan = {
    name: string;
    description: string;
    image: string[];
    price: number;
}

export default function MealPlanContent(plan: mealPlan) {
  return (
    <div>
        <h1 className="text-2xl md:text-3xl text-black font-bold text-center mb-4">{plan.name}</h1>
        <div className="flex justify-center items-center">
            {plan.image.map((image, idx) => (
            <motion.div
                key={"images" + idx}
                style={{
                rotate: Math.random() * 20 - 10,
                }}
                whileHover={{
                scale: 1.1,
                rotate: 0,
                zIndex: 100,
                }}
                whileTap={{
                scale: 1.1,
                rotate: 0,
                zIndex: 100,
                }}
                className="rounded-xl -mr-4 mt-4 p-1 bg-white border border-neutral-100 shrink-0 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
                <Image
                src={image}
                alt={plan.name}
                width={500}
                height={500}
                draggable={false}
                className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
                />
            </motion.div>
            ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-6 mx-auto mt-8">
            <p className="text-lg">{plan.description}</p>
            <span className="flex flex-row justify-center items-center gap-2">
                <p className="text-3xl font-semibold">{`Rp ${plan.price.toLocaleString('id-ID')}`}</p>
                <p className="text-sm text-neutral-500">/ Meal</p>
            </span>
        </div>
    </div>
  )
}
