import { DM_Sans } from "next/font/google";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent } from "@/components/ui/animated-modal";
import { DataTable } from "@/components/ui/DataTable";
import { Subscription } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Tag from "@/components/ui/Tag";


const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export default function UserDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/subscription');
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscriptions();
  }, [subscriptions.length]);

  const updateSubscription = async (selectedSubscription : Subscription) => {
    try {
      const response = await axios.put('/api/subscription', {
        subscriptionId: selectedSubscription.id,
        status: selectedSubscription.status,
      });
      
      if (response.status === 200) {
        toast.success("Subscription updated successfully!");
        const refreshed = await axios.get('/api/subscription');
        setSubscriptions(refreshed.data);
      } else {
        toast.error("Failed to update subscription.");
      }

    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  }

  return (
    <div className={`${dmSans.className} flex flex-1`}>
      <Modal>
      <div className="grid grid-cols-1 grid-rows-[repeat(3,minmax(0,1fr))] gap-y-6 lg:gap-6 w-full p-4 md:p-10 bg-light-beige-2 rounded-tl-2xl
        lg:grid-cols-3 lg:grid-rows-3">
        <div className="row-span-1 flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-8
          lg:row-span-2 lg:col-span-1">
          <Image src={"/default-avatar.png"} alt="User Avatar" width={160} height={160} className="h-48 w-48 rounded-full" draggable={false} />
          <h1 className="text-2xl font-bold mt-4">{`@${session?.user.username}` || "User"}</h1>
          <p className="text-gray-600 mt-1 text-sm">{session?.user.phoneNumber || "Phone Number"}</p>
          <div className="mt-6 w-full flex flex-col items-center">
            <button className="w-full bg-white border border-border hover:bg-border text-dark-grey font-semibold py-2 px-4 rounded transition mb-3 cursor-pointer" onClick={() => router.push("/dashboard/profile")}>
              Edit Profile
            </button>
            <button className="w-full bg-green hover:bg-dark-green-2 text-beige font-medium py-2 px-4 rounded transition cursor-pointer">
              Change Password
            </button>
            <div className="mt-6 text-center">
              <span className="block text-xs text-gray-400">Member since</span>
              <span className="block text-sm font-medium text-gray-700">
                {session?.user.createdAt ? new Date(session.user.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
        </div>
        <div className="row-span-1 lg:col-span-2 lg:row-span-3 bg-white rounded-xl shadow-md flex flex-col p-4 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-start">My Subscription</h1>
            <hr className="border-t-2 border-gray-200 my-4" />
            <div className="flex flex-col items-center justify-start h-full">
              <DataTable data={subscriptions} handleUpdateStatus={updateSubscription} setSelectedSubscription={setSelectedSubscription} loading={loading} setLoading={setLoading} />
            </div>
        </div>
      </div>
          <ModalBody>
        <ModalContent>
            <ViewSubscription subscription={selectedSubscription} />
        </ModalContent>
          </ModalBody>
      </Modal>
    </div>
  );
}

function ViewSubscription({ subscription }: { subscription: Subscription | null }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Details</h2>
      <form className="space-y-6 bg-background rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Meal Plan</label>
            <Input disabled value={subscription?.mealPlan || ""} className="bg-muted" />
          </div>
            <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Created At</label>
            <Input
              disabled
              value={
              subscription?.createdAt
                ? new Date(subscription.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : ""
              }
              className="bg-muted"
            />
            </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Allergies</label>
            <Input disabled value={subscription?.allergies || "None"} className="bg-muted" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Meal Type</label>
            <div className="flex flex-wrap gap-2">
              {subscription?.mealType?.length
                ? subscription.mealType.map((type: string) => (
                    <Tag key={type} name={type} variant="default" />
                  ))
                : <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">-</span>
              }
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Delivery Days</label>
            <div className="flex flex-wrap gap-1">
              {subscription?.deliveryDays?.length
                ? subscription.deliveryDays.map((day: string) => (
                    <Tag key={day} name={day} variant="default" />
                  ))
                : <span className="px-2 py-1 rounded bg-accent text-accent-foreground text-xs font-medium">-</span>
              }
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Status</label>
            <Tag name={subscription?.status || "-"} variant="active" />
          </div>
            <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1">Price</label>
            <Input
              disabled
              value={
              subscription?.price
                ? subscription.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })
                : ""
              }
              className="bg-muted"
            />
            </div>
        </div>
      </form>
    </div>
  );
}