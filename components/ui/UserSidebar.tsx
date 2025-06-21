"use client";

import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";
import {
  IconArrowBackUp,
  IconBrandTabler,
  IconLogout2,
  IconSquareRoundedPlus,
  IconToolsKitchen3,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DynaPuff } from "next/font/google";
import { motion } from "framer-motion";
import Logo from "../assets/Logo";

const dynaPuff = DynaPuff({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-dyna-puff",
  display: "swap",
});

const userSidebarContent = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <IconBrandTabler className="h-6 w-6 shrink-0 text-beige" />,
  },
  {
    label: "My Subscription",
    href: "/dashboard/my-subscription",
    icon: <IconToolsKitchen3 className="h-6 w-6 shrink-0 text-beige" />,
  },
  {
    label: "Add Subscription",
    href: "/dashboard/add-subscription",
    icon: <IconSquareRoundedPlus className="h-6 w-6 shrink-0 text-beige" />,
  },
  {
    label: "Back to Homepage",
    href: "/",
    icon: <IconArrowBackUp className="h-6 w-6 shrink-0 text-beige" />,
  },
];

export default function UserSidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 h-screen">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          >
            {open ? (
              <div
                className={`flex flex-row items-center justify-start gap-2 ${dynaPuff.className}`}
              >
                <Logo width={30} height={30} />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium whitespace-pre text-beige text-lg"
                >
                  SEA Catering
                </motion.span>
              </div>
            ) : (
              <Logo width={30} height={30} />
            )}
          </button>
          <div className="mt-8 flex flex-col gap-2">
            {userSidebarContent.map((link, idx) => (
              <button
                key={idx}
                type="button"
                className="text-left"
                onClick={() => router.push(link.href)}
              >
                <SidebarLink link={link} />
              </button>
            ))}
            <button
              type="button"
              className="text-left"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <SidebarLink
                link={{
                  label: "Logout",
                  href: "/",
                  icon: <IconLogout2 className="h-6 w-6 shrink-0 text-beige" />,
                }}
              />
            </button>
          </div>
        </div>
        <button type="button" onClick={() => router.push("/dashboard/profile")}>
          <SidebarLink
            link={{
              label: `@${session?.user?.username}` || "@guest",
              href: "/profile",
              icon: (
                <Image
                  src="/default-avatar.png"
                  className="h-7 w-7 shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt={`@${session?.user?.username}` || "@guest"}
                />
              ),
            }}
          />
        </button>
      </SidebarBody>
    </Sidebar>
  );
}
