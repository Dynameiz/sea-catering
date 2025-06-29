"use client";

import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import GetStarted from "@/components/ui/GetStarted";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { DM_Sans } from "next/font/google";
import Image from "next/image";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export default function Contact() {
  return (
    <div className={`${dmSans.className} relative flex-col items-center justify-center w-full min-h-screen`}>
      <section className="flex flex-col items-center justify-center w-full px-4 py-8 mx-auto bg-light-beige-2">
        <div className="container flex flex-col items-center justify-center mx-auto mt-24 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 p-3 pt-0 border-b-2 border-green">Get in Touch</h1>
            <p className="text-lg mb-8">
            Have questions or need assistance? We are here to help! Reach out to us through our WhatsApp community or contact our manager directly.
            </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-7xl">
            <div className="flex flex-col justify-around items-center bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 p-1.5 pt-0 border-b-2 border-green">Join Our Community</h2>
              <p className="mb-4 max-w-md text-center text-gray-500">
                Connect with us and other members by joining our WhatsApp group community.
              </p>
              <Image src={"/WAG-QR.png"} alt="WAG QR Code" width={256} height={256} className="rounded-lg border-border shadow-md mb-4" />
                <Button
                asChild
                variant={"default"}
                className="w-full max-w-3xs cursor-pointer hover:scale-105 transition-transform duration-200"
                >
                <a
                  href="https://chat.whatsapp.com/Idf2KvLibXhCDXuOBLreyd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Now
                </a>
                </Button>
            </div>
            <div className="flex flex-col justify-around items-center bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 p-1.5 pt-0 border-b-2 border-green">Contact the Manager</h2>
              <p className="mb-4 max-w-md text-center text-gray-500">
                Reach out directly to our manager, Brian, for any inquiries or assistance.
              </p>
              <IconBrandWhatsapp size={192} className="text-green" />
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4">
                  <span className="font-semibold text-lg">Brian</span>
                    <Button
                    asChild
                    variant="link"
                    className="p-0 h-auto text-green text-lg"
                    >
                    <a
                      href="tel:08123456789"
                      className="flex items-center gap-2"
                    >
                      <IconBrandWhatsapp size={20} className="inline" />
                      0812-3456-789
                    </a>
                    </Button>
                </div>
                <Button
                  asChild
                  variant="default"
                  className="w-full max-w-3xs cursor-pointer hover:scale-105 transition-transform duration-200"
                >
                  <a href="tel:08123456789">
                    Contact Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GetStarted />
      <Footer />
    </div>
  )
}
