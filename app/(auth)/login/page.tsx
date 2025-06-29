"use client";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import { AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});


type LoginSchema = {
  username: string;
  password: string;
}


export default function Login() {
  
  const router = useRouter();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  
  const signUpText = "Don't have an account?";
  
  const onSubmit = async (data: LoginSchema) => {

    if (!data.username) {
      setLoading(false);
      toast.error("Username is required", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    if (!data.password) {
      setLoading(false);
      toast.error("Password is required", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    const response = await signIn("credentials", {
      username: data.username.toLowerCase(),
      password: data.password,
      redirect: false,
    });
    
    if (response?.error) {
      setLoading(false);
      toast.error("Invalid username or password", {
        position: "top-center",
        duration: 3000,
      });
    } else {
      toast.success("Login successful", {
        position: "top-center",
        duration: 3000,
      });
      setTimeout(() => {
        setLoading(false);
        handleNavigation("/");
      }, 1000);
    }
  }

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-light-beige">
      {loading && (
        <AnimatePresence>
          <Spinner />
        </AnimatePresence>
      )}
      <div className="container mx-auto p-4">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault(); // prevent default form refresh
              setLoading(true);
              onSubmit({ username, password });
            }}
            className={`${dmSans.variable} flex flex-col items-center justify-center`}
          >
            <h1 className="text-2xl md:text-4xl font-bold mb-8">Log in</h1>
            <div className="flex flex-col items-start w-full mb-4">
              <p className="text-sm mb-1 font-semibold">Username</p>
              <Input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="flex flex-col items-start w-full mb-4">
              <p className="text-sm mb-1 font-semibold">Password</p>
              <Input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 rounded-lg bg-green text-light-beige sm:text-xl font-semibold shadow-md transition-colors duration-300 cursor-pointer"
            >
              Log in
            </button>
          </form>
            <div className="flex flex-row items-center mt-2 gap-1 w-full justify-center">
              <p className="text-sm">{signUpText}</p>
              <button className="text-sm text-green cursor-pointer" onClick={() => handleNavigation('/register')}>Sign Up</button>
            </div>
        </div>
      </div>
    </div>
  )
}
