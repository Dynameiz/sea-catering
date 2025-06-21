"use client";

import { useSession } from "next-auth/react";
import UserSidebar from "./UserSidebar";
import AdminSidebar from "./AdminSidebar";

export function SidebarClient() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return session.user.role === "ADMIN" ? <AdminSidebar /> : <UserSidebar />;
}
