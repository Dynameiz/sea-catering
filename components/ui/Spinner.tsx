import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from '../assets/Logo'
import { DM_Sans } from 'next/font/google'

const loadingTexts = [
    'Preparing your meal...',
    'Cooking with love...',
    'Serving healthy goodness...',
    'Crafting your perfect dish...',
    'Bringing flavors to life...'
]

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-dm-sans'
});

export default function Spinner() {
    const [loadingText, setLoadingText] = useState(loadingTexts[2]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * loadingTexts.length);
            setLoadingText(loadingTexts[randomIndex]);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

  return (
    <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-grey/50 bg-opacity-70"
        style={{ pointerEvents: 'auto' }}
    >
        <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            transition={{
                opacity: { duration: 0.5, ease: 'easeInOut' },
                scale: { duration: 0.5, ease: 'easeInOut' },
                rotate: { repeat: Infinity, duration: 2, ease: 'linear' }
            }}
            exit={{ opacity: 0, scale: 0.5 }}
        >
            <Logo width={180} height={180} />
        </motion.div>
        <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-2xl font-semibold text-white mt-4 ${dmSans.variable}`}
            exit={{ opacity: 0, scale: 0.5 }}
        >
            {loadingText}
        </motion.h1>
    </div>
  )
}
