"use client";

import Logo from '../assets/Logo';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DynaPuff, DM_Sans } from 'next/font/google';

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

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav 
        className={`${DM_SansFont.className} w-full flex items-center px-6 py-2 z-50 h-16 bg-background`}
      >
        <div className='container mx-auto flex flex-row items-center'>
          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              onClick={() => handleNavigation('/')}
              className='flex flex-row gap-3 items-center justify-center cursor-pointer'
          >
              <Logo width={48} height={48} />
              <h1 className={`${dynaPuff.className} text-2xl text-foreground`}>SEA Catering</h1>
          </motion.button>
          <div className='grow'>
            <div className='flex flex-row gap-8 items-center justify-center'> 
              {pages.map((page) => (
                <motion.button
                  key={page.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                  onClick={() => handleNavigation(page.link)}
                  className='text-lg text-foreground cursor-pointer'
                >
                  {page.name}
                </motion.button>
              ))
              }
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            onClick={() => handleNavigation('/login')}
            className=' px-4 py-2 text-foreground hover:bg-foreground hover:text-background border-2 border-foreground rounded-lg'
          >
            Log in
          </motion.button>

        </div>
            
      </nav>
  )
}