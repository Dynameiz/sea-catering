"use client";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/Spinner";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { DM_Sans } from "next/font/google";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod/v4";

const dmSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap',
});

const UpdateUserSchema = z.object({
    id: z.number(),
    fullName: z.string().min(1, "Full Name is required").max(100, "Full name must be less than 100 characters").optional(),
    username: z.string().min(1, "Username is required").max(50, "Username must be less than 50 characters").optional(),
    phoneNumber: z.string().min(1, "Phone number is required").max(15, "Phone number must be less than 15 characters").optional(),
});

export default function Profile() {

  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState<z.infer<typeof UpdateUserSchema>>({
    id: session?.user.id ? parseInt(session.user.id, 10) : 0,
    fullName: session?.user.fullName || "",
    username: session?.user.username || "",
    phoneNumber: session?.user.phoneNumber || "",
  });

  const validateForm = () => {

    if ((userData.fullName ?? "") === session?.user.fullName &&
        (userData.username ?? "") === session?.user.username &&
        (userData.phoneNumber ?? "") === session?.user.phoneNumber) {
      toast.info("No changes made to the profile", {
        position: "top-center",
        duration: 3000,
      });
      return false;
    }
    if ((userData.fullName ?? "").length < 1 || (userData.fullName ?? "").length > 50) {
      toast.error("Full name must be between 1 and 50 characters", {
        position: "top-center",
        duration: 3000,
      });
      return false;
    }
    if ((userData.username ?? "").length < 1 || (userData.username ?? "").length > 50) {
      toast.error("Username must be between 1 and 50 characters", {
        position: "top-center",
        duration: 3000,
      });
      return false;
    }
    if (!/^[a-zA-Z0-9._]+$/.test(userData.username ?? "")) {
      toast.error(
        "Username can only contain letters, numbers, dots (.) and underscores (_)",
        {
          position: "top-center",
          duration: 3000,
        }
      );
      return false;
    }
    if (!(userData.phoneNumber ?? "").startsWith("08")) {
      toast.error("Phone number must start with 08", {
        position: "top-center",
        duration: 3000,
      });
      return false;
    }
    if ((userData.phoneNumber ?? "").length < 10 || (userData.phoneNumber ?? "").length > 15) {
      toast.error("Phone number must be between 10 and 15 characters", {
        position: "top-center",
        duration: 3000,
      });
      return false;
    }
    if (!/^\d+$/.test(userData.phoneNumber ?? "")) {
      toast.error("Phone number must contain only digits", {
        position: "top-center",
        duration: 3000,
      });
      return false;
    }
    return true;
  };

  const [modalType, setModalType] = useState<"submit" | "changePassword" | null>(null);

  const handleUpdateUser = async () => {
    setLoading(true);
    const userId = userData.id;

    if (!userId) {
      setLoading(false);
      toast.error("Not Logged in", {
        position: "top-center",
        duration: 3000,
      });
      redirect("/login");
    }

    try {
      const parsedData = UpdateUserSchema.safeParse(userData);

      if (!parsedData.success) {
        setLoading(false);
        console.error("Invalid data:", parsedData.error);
        return;
      }

      const response = await axios.put('/api/user', parsedData.data);

      if (response.status === 200) {
        toast.success("Profile updated successfully", {
          position: "top-center",
          duration: 3000,
        });
        setModalType(null);
      } else {
        toast.error("Failed to update profile", {
          position: "top-center",
          duration: 3000,
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.message, {
          position: "top-center",
          duration: 3000,
        });
      } else {
        console.error("Server error:", error);
        toast.error("Internal server error", {
          position: "top-center",
          duration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${dmSans.className} flex flex-1`}>
      {loading && (
        <AnimatePresence>
          <Spinner />
        </AnimatePresence>
      )}
      <Modal>
        
      <div className="flex items-center justify-center w-full p-4 md:p-10 bg-light-beige-2 rounded-tl-2xl ">

        <div className="grid grid-cols-1 gap-y-6 lg:gap-6 lg:grid-cols-3 w-full max-w-7xl">
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-8 lg:col-span-1">
            <Image src={"/default-avatar.png"} alt="User Avatar" width={160} height={160} className="h-48 w-48 rounded-full" draggable={false} />
            <h1 className="text-2xl font-bold mt-4">{`@${session?.user.username}` || "User"}</h1>
            <p className="text-gray-600 mt-1 text-sm">{session?.user.phoneNumber || "Phone Number"}</p>
            <div className="mt-6 w-full flex flex-col items-center">
          <p className="font-bold text-lg">{session?.user.fullName}</p>
          <div className="mt-6 text-center">
            <span className="block text-xs text-gray-400">Member since</span>
            <span className="block text-sm font-medium text-gray-700">
              {session?.user.createdAt ? new Date(session.user.createdAt).toLocaleDateString() : "N/A"}
            </span>
          </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col gap-4 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form className="flex flex-col gap-4" onSubmit={(e) => {e.preventDefault()}}>


            <div>
            <p className="block text-sm font-medium text-gray-700 mb-1">Full Name</p>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={userData.fullName}
              className="w-full"
              onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
            />
            </div>
            <div>
            <p className="block text-sm font-medium text-gray-700 mb-1">Username</p>
            <Input
              id="username"
              name="username"
              type="text"
              value={userData.username}
              className="w-full"
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
            </div>
            <div>
            <p className="block text-sm font-medium text-gray-700 mb-1">Phone Number</p>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              value={userData.phoneNumber}
              className="w-full"
              onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
            />
            </div>
            <ModalTrigger className="flex flex-col gap-3 w-full justify-between items-center">
              <div className="w-full bg-white border border-border hover:bg-border text-dark-grey font-semibold py-2 px-4 rounded transition cursor-pointer" onClick={() => setModalType("changePassword")}>
                Change Password
              </div>
                <div
                className="w-full bg-green hover:bg-dark-green-2 text-beige font-medium py-2 px-4 rounded transition cursor-pointer"
                onClick={(e) => {
                  // Prevent ModalTrigger from opening modal if validateForm is false
                  if (!validateForm()) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                  }
                  setModalType("submit");
                }}
                >
                Save Changes
                </div>
            </ModalTrigger>
            </form>
          </div>
        </div>
      </div>
      <ModalBody className="h-fit">
        <ModalContent>
          {modalType === "changePassword" && <ChangePassword user={session} />}
          {modalType === "submit" && <SubmitChanges user={session} updatedData={userData} />}
        </ModalContent>
        <ModalFooter>
          {modalType === "submit" && (
          <Button
            type="button"
            className="bg-green hover:bg-dark-green-2 text-beige"
            onClick={() => {
              handleUpdateUser();
            }}
          >
            Confirm
          </Button>
        )}
        </ModalFooter>
      </ModalBody>
      </Modal>
    </div>
  )
}

function SubmitChanges({ user, updatedData }: { user: Session | null, updatedData?: z.infer<typeof UpdateUserSchema> }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Confirm Changes</h2>
      <p className="mb-6 text-gray-700">Are you sure you want to save the changes to your profile?</p>
      <div className="space-y-4">
        <div>
          <span className="block font-medium text-gray-600 mb-1">Full Name</span>
            <div className="flex gap-2">
            <Input
              value={user?.user.fullName ?? "N/A"}
              disabled
              className="w-1/2 disabled:bg-red-200"
              aria-label="Previous Full Name"
            />
            <Input
              value={updatedData?.fullName ?? user?.user.fullName ?? "N/A"}
              disabled
              className="w-1/2 disabled:bg-green-200"
              aria-label="Updated Full Name"
            />
            </div>
        </div>
        <div>
          <span className="block font-medium text-gray-600 mb-1">Username</span>
          <div className="flex gap-2">
        <Input
          value={user?.user.username ?? "N/A"}
          disabled
          className="w-1/2 disabled:bg-red-200"
          aria-label="Previous Username"
        />
        <Input
          value={updatedData?.username ?? user?.user.username ?? "N/A"}
          disabled
          className="w-1/2 disabled:bg-green-200"
          aria-label="Updated Username"
        />
          </div>
        </div>
        <div>
          <span className="block font-medium text-gray-600 mb-1">Phone Number</span>
          <div className="flex gap-2">
        <Input
          value={user?.user.phoneNumber ?? "N/A"}
          disabled
          className="w-1/2 disabled:bg-red-200"
          aria-label="Previous Phone Number"
        />
        <Input
          value={updatedData?.phoneNumber ?? user?.user.phoneNumber ?? "N/A"}
          disabled
          className="w-1/2 disabled:bg-green-200"
          aria-label="Updated Phone Number"
        />
          </div>
        </div>
      </div>
    </div>
  )
}

function ChangePassword({ user }: { user: Session | null }) {

  const ChangePasswordSchema = z.object({
      userId: z.number().min(1, "User ID is required"),
      currentPassword: z.string().min(1, "Current password is required").max(100, "Current password must be less than 100 characters"),
      newPassword: z.string().min(8, "New password must have more than 8 characters").max(100, "New password must be less than 100 characters"),
  });

  const [ loading, setLoading ] = useState(false);
  const [ currentPassword, setCurrentPassword ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");
  const [ confirmNewPassword, setConfirmNewPassword ] = useState("");
  const [ showCurrentPassword, setShowCurrentPassword ] = useState(false);
  const [ showNewPassword, setShowNewPassword ] = useState(false);
  const [ showConfirmNewPassword, setShowConfirmNewPassword ] = useState(false);

  const handleChangePassword = async() => {
    setLoading(true);
    const userId = user?.user.id ? parseInt(user.user.id, 10) : undefined;

    if (!userId) {
      setLoading(false);
      toast.error("Not Logged in",{
          position: "top-center",
          duration: 3000,
        }
      );
      redirect("/login");
    }

    if(!currentPassword) {
      setLoading(false);
      toast.error("Current password is required", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    if (!newPassword) {
      setLoading(false);
      toast.error("New password is required", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 100) {
      setLoading(false);
      toast.error("Password must be between 8 and 100 characters", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (!/(?=.*[a-z])/.test(newPassword)) {
      setLoading(false);
      toast.error("Password must contain at least one lowercase letter", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (!/(?=.*[A-Z])/.test(newPassword)) {
      setLoading(false);
      toast.error("Password must contain at least one uppercase letter", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    if (!/(?=.*\d)/.test(newPassword)) {
      setLoading(false);
      toast.error(
        "Password must contain at least one number", {
          position: "top-center",
          duration: 3000,
        }
      );
      return;
    }
    if (!/(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?`~])/.test(newPassword)) {
      setLoading(false);
      toast.error("Password must contain at least one unique symbol", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    if (!confirmNewPassword) {
      setLoading(false);
      toast.error("Please confirm your new password", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setLoading(false);
      toast.error("New password and confirmation do not match", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    if(currentPassword === newPassword) {
      setLoading(false);
      toast.error("New password cannot be the same as current password", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }
    
    try {
      const parsedData = ChangePasswordSchema.safeParse({
        userId,
        currentPassword,
        newPassword,
      });
  
      if (!parsedData.success) {
        setLoading(false);
        console.error("Invalid data:", parsedData.error);
        return;
      }

      const response = await axios.put('/api/user/change-password', {
        userId: parsedData.data.userId,
        currentPassword: parsedData.data.currentPassword,
        newPassword: parsedData.data.newPassword,
      });

      if (response.status === 200) {
        toast.success("Password changed successfully", {
          position: "top-center",
          duration: 3000,
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        toast.error("Failed to change password", {
          position: "top-center",
          duration: 3000,
        });
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.message, {
          position: "top-center",
          duration: 3000,
        });
      } else {
        console.error("Server error:", error);
        toast.error("Internal server error", {
          position: "top-center",
          duration: 3000,
        });
      }
      return;
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div>
      {loading && (
        <AnimatePresence>
          <Spinner />
        </AnimatePresence>
      )}
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form className="space-y-6 bg-background rounded-lg shadow p-6" onSubmit={(e) => {e.preventDefault(); handleChangePassword()}}>
        <div>
          <p className="block text-xs font-semibold text-muted-foreground mb-1">Current Password</p>
          <div className="flex items-center w-full relative">
            <Input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              autoComplete="current-password"
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-0 mr-3 md:mr-4 text-green cursor-pointer"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              tabIndex={-1}
            >
              {showCurrentPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>  
        </div>
        <div>
          <p className="block text-xs font-semibold text-muted-foreground mb-1">New Password</p>
          <div className="flex items-center w-full relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              placeholder="Enter new password"
              className="bg-muted pr-10"
              onChange={(e) => setNewPassword(e.target.value)}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-0 mr-3 md:mr-4 text-green cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
              tabIndex={-1}
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <div>
          <p className="block text-xs font-semibold text-muted-foreground mb-1">Confirm New Password</p>
          <div className="flex items-center w-full relative">
            <Input
              type={showConfirmNewPassword ? "text" : "password"}
              value={confirmNewPassword}
              placeholder="Confirm new password"
              className="bg-muted pr-10"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-0 mr-3 md:mr-4 text-green cursor-pointer"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              tabIndex={-1}
            >
              {showConfirmNewPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <Button type="submit" className="w-full bg-green hover:bg-dark-green-2 text-beige font-medium py-2 px-4 rounded transition cursor-pointer">
          Change Password
        </Button>
      </form>
    </div>
  )
}