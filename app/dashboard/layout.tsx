import { Metadata } from "next";
import "@/app/globals.css";
import { Providers } from "../provider";
import { SidebarClient } from "@/components/ui/SidebarClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  title: "SEA Catering",
  description: "Healthy Meals, Anytime, Anywhere",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body
        className={`antialiased mx-auto flex w-full flex-1 flex-col bg-dark-green md:flex-row`}
      >
        <Providers>
          <SidebarClient />
          {children}
        </Providers>
      </body>
    </html>
  );
}
