import { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/ui/Navbar";
import { Providers } from "../provider";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "SEA Catering",
  description: "Healthy Meals, Anytime, Anywhere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
