
import { IconBrandGithub, IconBrandInstagram, IconBrandTiktok, IconBrandX, IconBrandYoutube } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const socialMediaLinks = [
  {
    name: "Instagram",
    icon: <IconBrandInstagram color="#333333" size={28} />,
    link: "https://www.instagram.com/not_hanz/",
    tooltip: "@not_hanz",
  },
  {
    name: "X",
    icon: <IconBrandX color="#333333" size={28} />,
    link: "https://x.com/COMPFEST",
    tooltip: "@COMPFEST",
  },
  {
    name: "TikTok",
    icon: <IconBrandTiktok color="#333333" size={28} />,
    link: "https://www.tiktok.com/@compfest",
    tooltip: "@compfest",
  },
  {
    name: "YouTube",
    icon: <IconBrandYoutube color="#333333" size={28} />,
    link: "https://www.youtube.com/@COMPFESTUI",
    tooltip: "@COMPFESTUI",
  },
  {
    name: "GitHub",
    icon: <IconBrandGithub color="#333333" size={28} />,
    link: "https://github.com/Dynameiz/sea-catering",
    tooltip: "Dynameiz",
  },
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-48 bg-dark-grey text-white">
    <div className="flex flex-row items-center justify-center gap-6 mb-4">
        {socialMediaLinks.map((link, index) => (
            <motion.a
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="text-2xl bg-white p-2 shadow-md rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={link.tooltip}
            >
            {link.icon}
            </motion.a>
        ))}
    </div>
    <h3 className="text-2xl font-semibold mb-4">Brian - 08123456789</h3>
    <p className="absolute bottom-0 w-full mb-4 text-lg text-center">
        © 2025 SEA Catering. All rights reserved.
    </p>
    </footer>
  )
}
