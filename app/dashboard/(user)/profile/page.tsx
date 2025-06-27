"use client";
import { Input } from "@/components/ui/input";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap',
});

export default function Profile() {
  return (
    <div className={`${dmSans.className} flex flex-1`}>
      <div className=" w-full p-4 md:p-10 bg-light-beige-2 rounded-tl-2xl">

        <form className="w-full max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
          Username
              </label>
              <Input id="username" name="username" placeholder="Username" />
            </div>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">
          Full Name
              </label>
              <Input id="fullName" name="fullName" placeholder="Full Name" />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
          Phone Number
              </label>
              <Input id="phoneNumber" name="phoneNumber" type="tel" placeholder="Phone Number" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-green text-white rounded "
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
