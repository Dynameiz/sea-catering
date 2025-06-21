import { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/ui/Navbar";
import { Providers } from "../provider";
import { Toaster } from "@/components/ui/sonner";
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

  if (session?.user?.role === "ADMIN"){
    redirect("/dashboard");
  }

  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
