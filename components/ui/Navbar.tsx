"use client";

import Logo from '../assets/Logo';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DynaPuff, DM_Sans } from 'next/font/google';
import { useState } from 'react';
import Hamburger from '../assets/Hamburger';

const dynaPuff = DynaPuff({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-dyna-puff',
  display: 'swap',
});

const DM_SansFont = DM_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const pages = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Meal Plans',
    link: '/plans',
  },
  {
    name: 'About Us',
    link: '/about',
  },
  {
    name: 'Contact',
    link: '/contact',
  },
  {
    name: 'Subscription',
    link: '/subscription'
  }
]

export default function Navbar() {

  const router = useRouter();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav className={`${DM_SansFont.className} fixed w-full flex items-center px-6 py-2 z-50 h-24 bg-dark-green`}>
        <div className='container mx-auto flex flex-row items-center justify-between'>

          {/* Hamburger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            onClick={() => setHamburgerOpen(true)}
            className='lg:hidden flex items-center justify-center p-2 rounded-md text-beige cursor-pointer'
          >
            <Hamburger width={40} height={40} />
          </motion.button>

          {/* Logo SEA Catering - Route to go back to homepage */}
          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              onClick={() => handleNavigation('/')}
              className='flex flex-row gap-3 items-center justify-center cursor-pointer'
          >
              <Logo width={48} height={48} />
              <h1 className={`${dynaPuff.className} text-2xl text-beige`}>SEA Catering</h1>
          </motion.button>

          {/* For the navigation */}
          <div className='grow hidden lg:block'>
            <div className='flex flex-row xl:gap-8 lg:gap-4 items-center justify-center'> 
              {pages.map((page) => (
                <motion.button
                  key={page.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                  onClick={() => handleNavigation(page.link)}
                  className='text-lg text-beige cursor-pointer'
                >
                  {page.name}
                </motion.button>
              ))
              }
            </div>
          </div>

          {/* Login button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            onClick={() => handleNavigation('/login')}
            className=' px-4 py-2 text-beige hover:bg-beige hover:text-dark-green border-2 border-beige cursor-pointer rounded-lg'
          >
            Log in
          </motion.button>

        </div>

        {/* Hamburger Menu for mobile view */}
        <AnimatePresence>
          {hamburgerOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='absolute top-0 left-0 w-full min-h-screen z-40 flex flex-col items-center justify-start'
              onClick={() => setHamburgerOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className='absolute top-0 left-0 w-full bg-dark-green z-45 p-4 flex flex-col items-center gap-4 lg:hidden'
                onClick={(e) => e.stopPropagation()}
              >
                {pages.map((page) => (
                  <motion.button
                    key={page.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    onClick={() => { handleNavigation(page.link)}}
                    className='text-lg text-beige cursor-pointer'
                  >
                    {page.name}
                  </motion.button>
                ))
                }
              </motion.div>
              <div className="absolute w-full h-full bg-black/30 backdrop-blur-sm z-40" />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
  )
}