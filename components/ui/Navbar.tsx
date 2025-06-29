"use client";

import Logo from '../assets/Logo';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DynaPuff, DM_Sans } from 'next/font/google';
import { useState } from 'react';
import Hamburger from '../assets/Hamburger';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarImage } from './avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './dropdown-menu';
import { LogOutIcon, LucideUserRound } from 'lucide-react';

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
    name: 'About Us',
    link: '/about',
  },
  {
    name: 'Meal Plans',
    link: '/plans',
  },
  {
    name: 'Subscription',
    link: '/subscription'
  },
  {
    name: 'Contact',
    link: '/contact',
  },
]

export default function Navbar() {

  const { data: session, status } = useSession(); 

  const router = useRouter();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav className={`${DM_SansFont.className} fixed w-full flex items-center px-6 py-2 z-55 h-18 bg-dark-green`}>
        <div className='container mx-auto flex flex-row items-center justify-between'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            onClick={() => setHamburgerOpen(true)}
            className='lg:hidden flex items-center justify-center p-2 rounded-md text-beige cursor-pointer w-12 h-12 sm:w-14 sm:h-14'
          >
            <Hamburger width={40} height={40} />
          </motion.button>
          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              onClick={() => handleNavigation('/')}
              className='flex flex-row gap-3 items-center justify-center cursor-pointer'
          >
              <div className='flex flex-row w-8 h-8 sm:w-12 sm:h-12 items-center justify-center'>
                <Logo width={48} height={48} />
              </div>
              <h1 className={`${dynaPuff.className} text-xl sm:text-2xl text-beige`}>SEA Catering</h1>
          </motion.button>
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
          {
            status === 'authenticated' ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 1 }}
                      className='p-2 cursor-pointer'
                    >
                      <Avatar className='w-10 h-10 rounded-full'>
                        <AvatarImage src={'/default-avatar.png'} alt={session.user?.name || 'User Avatar'} title={session.user?.name || 'Profile'} />
                      </Avatar>
                    </motion.button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-light-beige border-beige" align="end">
                  <DropdownMenuItem className='flex items-center cursor-pointer text-lg focus:bg-beige transition-colors duration-300' onClick={() => handleNavigation('/dashboard')}>
                    <LucideUserRound className='text-dark-grey' />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='flex items-center cursor-pointer text-lg focus:bg-beige transition-colors duration-300' onClick={() => signOut({ callbackUrl: '/' })}>
                    <LogOutIcon className='text-dark-grey' />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                onClick={() => handleNavigation('/login')}
                className='px-3 py-1.5 sm:px-4 sm:py-2 text-sm text-beige hover:bg-beige hover:text-dark-green border-2 border-beige cursor-pointer rounded-lg font-semibold'
              >
                Log in
              </motion.button>
          )}
        </div>
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
                    onClick={() => { handleNavigation(page.link); setHamburgerOpen(false); }}
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