"use client";

import { Input } from "@/components/ui/input";
import { DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod/v4";
import { toast } from "sonner";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Spinner from "@/components/ui/Spinner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const UserSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  username: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username must be less than 50 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone number is required")
    .max(15, "Phone number must be less than 15 characters")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters")
    .max(100, "Password must be less than 100 characters"),
  confirmPassword: z
    .string()
    .min(1, "Confirm password is required")
    .max(100, "Confirm password must be less than 100 characters"),
});

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (data: z.infer<typeof UserSchema>) => {
    if (data.firstName.length < 1 || data.firstName.length > 50) {
      setLoading(false);
      toast.error("First name must be between 1 and 50 characters", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (data.lastName.length < 1 || data.lastName.length > 50) {
      setLoading(false);
      toast.error("Last name must be between 1 and 50 characters", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (data.username.length < 1 || data.username.length > 50) {
      setLoading(false);
      toast.error("Username must be between 1 and 50 characters", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (!/^[a-zA-Z0-9._]+$/.test(data.username)) {
      setLoading(false);
      toast.error(
        "Username can only contain letters, numbers, dots (.) and underscores (_)",
        {
          position: "top-center",
          duration: 3000,
        }
      );
      return;
    }
    if (!data.phoneNumber.startsWith("08")) {
      setLoading(false);
      toast.error("Phone number must start with 08", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (data.phoneNumber.length < 10 || data.phoneNumber.length > 15) {
      setLoading(false);
      toast.error("Phone number must be between 10 and 15 characters", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (!/^\d+$/.test(data.phoneNumber)) {
      setLoading(false);
      toast.error("Phone number must contain only digits", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (data.password.length < 8 || data.password.length > 100) {
      setLoading(false);
      toast.error("Password must be between 8 and 100 characters", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (!/(?=.*[a-z])/.test(data.password)) {
      setLoading(false);
      toast.error("Password must contain at least one lowercase letter", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (!/(?=.*[A-Z])/.test(data.password)) {
      setLoading(false);
      toast.error("Password must contain at least one uppercase letter", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (!/(?=.*\d)/.test(data.password)) {
      setLoading(false);
      toast.error(
        "Password must contain at least one number", {
          position: "top-center",
          duration: 3000,
        }
      );
      return;
    }
    if (!/(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?`~])/.test(data.password)) {
      setLoading(false);
      toast.error("Password must contain at least one unique symbol", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    
    if (data.password !== data.confirmPassword) {
      setLoading(false);
      toast.error("Passwords do not match", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    try {
      const parsedData = UserSchema.parse({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username.toLowerCase(),
        phoneNumber: data.phoneNumber,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      const response = await axios.post("/api/user", {
        username: parsedData.username,
        fullName: `${parsedData.firstName} ${parsedData.lastName}`,
        phoneNumber: parsedData.phoneNumber,
        password: parsedData.password,
      });

      if (response.status === 201) {
        toast.success("Registration successful! You can now log in.", {
          position: "top-center",
          duration: 3000,
        });
        handleNavigation("/login");
      } else if (response.status === 400) {
        toast.error("Username or phone number already exists.", {
          position: "top-center",
          duration: 3000,
        });
      } else {
        toast.error("An unexpected error occurred. Please try again later.", {
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred. Please try again later.", {
        position: "top-center",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

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
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault(); // prevent default form refresh
                onSubmit({
                  firstName,
                  lastName,
                  username,
                  phoneNumber,
                  password,
                  confirmPassword
                });
                setLoading(false);
            }}
            className={`${dmSans.variable} flex flex-col items-center justify-center`}
          >
            <h1 className="text-4xl font-bold mb-8">Register</h1>
            <div className="grid grid-cols-2 gap-4 w-full mb-4">
              <div className="flex flex-col items-start w-full">
                <p className="text-sm mb-1 font-semibold">First Name <span className="text-red-700">*</span></p>
                <Input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="text-sm mb-1 font-semibold">Last Name <span className="text-red-700">*</span></p>
                <Input
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col items-start w-full mb-4">
              <p className="text-sm mb-1 font-semibold">Username <span className="text-red-700">*</span></p>
              <Input
                type="text"
                placeholder="COMPFEST"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start w-full mb-4">
              <p className="text-sm mb-1 font-semibold">Phone Number <span className="text-red-700">*</span></p>
              <Input
                type="text"
                placeholder="087812345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start w-full mb-4">
              <p className="text-sm mb-1 font-semibold">Password <span className="text-red-700">*</span></p>
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start w-full mb-4">
              <p className="text-sm mb-1 font-semibold">Confirm Password <span className="text-red-700">*</span></p>
              <Input
                type="password"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 rounded-lg bg-green text-light-beige text-lg sm:text-xl font-semibold shadow-md transition-colors duration-300 cursor-pointer"
            >
              Register
            </button>
          </form>
          <div className="flex flex-row items-center justify-center mt-2 gap-1">
            <p className="text-sm">Already have an account?</p>
            <button
              className="text-sm text-green cursor-pointer"
              onClick={() => handleNavigation("/login")}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
