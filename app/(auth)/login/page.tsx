"use client";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod/v4";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});


const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});


export default function Login() {
  
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const signUpText = "Don't have an account?";
  
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const response = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    
    if (response?.error) {
      alert(response.error);
    } else {
      handleNavigation("/");
    }
  }

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-light-beige">
      <div className="container mx-auto p-4">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault(); // prevent default form refresh
              const result = loginSchema.safeParse({ username, password });
              if (result.success) {
                onSubmit(result.data);
              } else {
                // alert(result.error.errors.map((e) => e.message).join(", "));
              }
            }}
            className={`${dmSans.variable} flex flex-col items-center justify-center`}
          >
            <h1 className="text-4xl font-bold mb-8">Log in</h1>
            <div className="flex flex-col items-start w-full mb-4">
              <p className="text-sm mb-1 font-semibold">Username</p>
              <Input type="text" placeholder="Enter Username / Phone Number" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="flex flex-col items-start w-full mb-4">
              <p className="text-sm mb-1 font-semibold">Password</p>
              <Input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 rounded-lg bg-green text-light-beige text-lg sm:text-xl font-semibold shadow-md transition-colors duration-300 cursor-pointer"
            >
              Log in
            </button>
            <div className="flex flex-row items-center mt-2 gap-1">
              <p className="text-sm">{signUpText}</p>
              <button className="text-sm text-green cursor-pointer" onClick={() => handleNavigation('/register')}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
