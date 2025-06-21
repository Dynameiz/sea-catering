import { DM_Sans } from "next/font/google";


const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export default function AdminDashboard() {

  return (
    <div className={`${dmSans.className} flex flex-1`}>
      <div className="grid grid-cols-1 grid-rows-[repeat(5,minmax(0,1fr))] gap-6 w-full p-4 md:p-10 bg-light-beige-2 rounded-tl-2xl
        md:grid-cols-3 md:grid-rows-3">
        <div className="animate-pulse row-span-2 flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-8
          md:row-span-3 md:col-span-1">
        </div>
        <div className="animate-pulse col-span-1 row-span-1 bg-white rounded-xl shadow-md flex items-center justify-center p-6">
        </div>
        <div className="animate-pulse col-span-1 row-span-1 bg-white rounded-xl shadow-md flex items-center justify-center p-6">
        </div>
        <div className="animate-pulse col-span-1 row-span-2 bg-white rounded-xl shadow-md flex items-center justify-center p-6
          md:col-span-2 md:row-span-2">
        </div>
      </div>
    </div>
  )
}
