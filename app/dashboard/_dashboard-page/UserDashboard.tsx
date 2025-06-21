import { DM_Sans } from "next/font/google";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export default function UserDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className={`${dmSans.className} flex flex-1`}>
      <div className="grid grid-cols-1 grid-rows-[repeat(5,minmax(0,1fr))] gap-6 w-full p-4 md:p-10 bg-light-beige-2 rounded-tl-2xl
        lg:grid-cols-3 lg:grid-rows-3">
        <div className="row-span-2 flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-8
          lg:row-span-3 lg:col-span-1">
          <Image src={"/default-avatar.png"} alt="User Avatar" width={160} height={160} className="h-48 w-48 rounded-full" draggable={false} />
          <h1 className="text-2xl font-bold mt-4">{`@${session?.user.username}` || "User"}</h1>
          <p className="text-gray-600 mt-1 text-sm">{session?.user.phoneNumber || "Phone Number"}</p>
          <div className="mt-6 w-full flex flex-col items-center">
            <button className="w-full bg-white border border-border hover:bg-border text-dark-grey font-semibold py-2 px-4 rounded transition mb-3 cursor-pointer" onClick={() => router.push("/dashboard/profile")}>
              Edit Profile
            </button>
            <button className="w-full bg-green hover:bg-dark-green-2 text-beige font-medium py-2 px-4 rounded transition cursor-pointer">
              Change Password
            </button>
            <div className="mt-6 text-center">
              <span className="block text-xs text-gray-400">Member since</span>
              <span className="block text-sm font-medium text-gray-700">
                {session?.user.createdAt ? new Date(session.user.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1 row-span-1 bg-white rounded-xl shadow-md flex items-center justify-center p-6">
          <span className="text-lg font-semibold text-gray-700">Active Subscription</span>
        </div>
        <div className="col-span-1 row-span-1 bg-white rounded-xl shadow-md flex items-center justify-center p-6">
          <span className="text-lg font-semibold text-gray-700">Bento Box 3</span>
        </div>
        <div className="col-span-1 row-span-2 bg-white rounded-xl shadow-md flex items-center justify-center p-6
          lg:col-span-2 lg:row-span-2">
          <span className="text-lg font-semibold text-gray-700">All Subscription</span>
        </div>
      </div>
    </div>
  )
}
