"use client";

import { DM_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent } from "@/components/ui/animated-modal";
import { DataTable, ViewSubscription } from "@/components/ui/DataTable";
import { Subscription } from "@/types/types";
import axios from "axios";
import { toast } from "sonner";

const dmSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap',
});

export default function MySubscription() {
  
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);


  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('/api/subscription');
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
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
        <div className="w-full rounded-tl-2xl mx-auto flex items-center justify-center min-h-screen bg-light-beige-2 p-4 md:p-10">
          <div className="flex flex-col bg-white rounded-xl shadow-lg p-6 md:p-10 w-full h-full">
            <h1 className="text-2xl md:text-3xl font-bold text-start">My Subscription</h1>
            <hr className="border-t-2 border-gray-200 my-4" />
            <div className="flex flex-col items-center justify-start h-full">
              <DataTable data={subscriptions} handleUpdateStatus={updateSubscription}  />
            </div>
          </div>
        </div>
        <ModalBody>
          <ModalContent>
            <ViewSubscription />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  )
}

