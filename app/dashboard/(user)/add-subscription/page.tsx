"use client";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap',
});

export default function AddSubscription() {
  return (
    <div className={`${dmSans.className} flex flex-1`}>
        <div className="grid grid-cols-1 grid-rows-[repeat(5,minmax(0,1fr))] gap-6 w-full p-4 md:p-10 bg-light-beige-2 rounded-tl-2xl
            md:grid-cols-3 md:grid-rows-3">
        </div>
    </div>
  )
}
