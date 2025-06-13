import { Metadata } from "next";
import "@/app/globals.css";

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
        {children}
      </body>
    </html>
  );
}
