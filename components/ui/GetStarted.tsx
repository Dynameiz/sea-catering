import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Logo from '../assets/Logo';
import { useSession } from 'next-auth/react';

export default function GetStarted() {

    const { status } = useSession();
    const router = useRouter();

    const handleClick = () => {
        if (status === 'authenticated') {
            router.push('/subscription');
        } else {
            router.push('/login');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full px-4 py-8 mx-auto bg-green">
            <div className="container mx-auto flex flex-col items-center justify-center text-center">
                <Logo width={96} height={96} />
                <h1 className="text-3xl lg:text-4xl font-bold text-beige mt-4">Ready to Eat Better, Feel Better?</h1>
                <p className="mt-4 max-w-4xl text-light-beige text-lg text-center leading-loose">
                    Join the SEA Catering family today and enjoy nutritious, home-cooked meals made just for you — delivered with care to your doorstep anywhere in Indonesia.
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.0 }}
                    className="mt-4 px-6 py-3 bg-beige text-dark-green font-semibold rounded-lg cursor-pointer"
                    onClick={handleClick}
                >
                    Get Started
                </motion.button>
            </div>
        </div>
    )
}
