import Logo from "@/components/assets/Logo";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { AdminDashboardData, Testimonials } from "@/types/types";
import axios from "axios";
import { DM_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import { DateRange, OnSelectHandler } from "react-day-picker";

const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export default function AdminDashboard() {

  const [data, setData] = useState<AdminDashboardData>();
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);

  const [range, setRange] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date()
  })

  const handleSelect: OnSelectHandler<DateRange | undefined> = (
    selected,
  ) => {
    setRange(selected ?? { from: undefined, to: undefined });
  }

  const fetchData = async (startDate?: string, endDate?: string) => {
    try {
      const response = await axios.post('/api/admin', {
        startDate,
        endDate,
      });
      setData(response.data);
      console.log("Admin Dashboard Data:", response.data);
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("/api/testimonial");
      if (response.status === 200) {
        setTestimonials(response.data);
      }
      console.log("Testimonials Data:", response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    if (range?.from && range?.to) {
      fetchData(range.from.toISOString(), range.to.toISOString());
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const applyFilter = () => {
    if (range?.from && range?.to) {
      fetchData(range.from.toISOString(), range.to.toISOString());
      console.log("Filter applied for range:", range);
    }
  };

  return (
    <div className={`${dmSans.className} flex flex-1`}>

      <div className="grid grid-rows-[auto_1fr] gap-6 w-full p-4 md:p-10 bg-light-beige-2 rounded-tl-2xl h-full">
        <div className="flex flex-wrap gap-6 w-full bg-light-beige-2 rounded-tl-2xl">
          <div className="flex flex-col bg-white rounded-xl shadow-md p-6 w-fit justify-between">
        <h1 className="text-2xl font-bold">Date Picker</h1>
        <hr className="border-border" />
        <Calendar
          mode="range"
          selected={range}
          onSelect={handleSelect}
          disabled={{ after: new Date() }}
          animate={true}
          className="border border-border shadow-sm rounded-lg mt-2 overflow-hidden"
        />
        <Button className="w-full mt-2 cursor-pointer" variant="default" onClick={applyFilter}>
          Filter Data
        </Button>
          </div>
          <div className="flex flex-col bg-white rounded-xl shadow-md p-6 flex-1">
        <h1 className="text-2xl font-bold">Subscription Summary</h1>
        <hr className="my-2 border-border" />
        {data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full h-full">
            <div className="flex flex-col items-start">
          <span className="text-sm text-dark-grey">New Subscriptions</span>
          <span className="text-2xl font-bold">{data.newSubscriptions ? data.newSubscriptions : '-'}</span>
            </div>
            <div className="flex flex-col items-start">
          <span className="text-sm text-dark-grey">Monthly Recurring Revenue</span>
          <span className="text-2xl font-bold">{data.mrr ? data.mrr.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : '-'}</span>
            </div>
            <div className="flex flex-col items-start">
          <span className="text-sm text-dark-grey">Reactivations</span>
          <span className="text-2xl font-bold">{data.reactivations ? data.reactivations : '-'}</span>
            </div>
            <div className="flex flex-col items-start">
          <span className="text-sm text-dark-grey">Subscription Growth</span>
          <span className="text-2xl font-bold">{data.activeSubscriptions ? data.activeSubscriptions : '-'}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
            <div className="flex items-center justify-center w-32 h-32 animate-spin">
          <Logo color="#333333" />
            </div>
            <span className="text-dark-grey text-lg">Fetching Data...</span>
          </div>
        )}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <hr className="my-2 border-gray-300" />
          <div className="grid grid-cols-2 mt-2 mb-4 gap-4">
            <div className="col-span-1 flex flex-col items-start">
              <span className="text-sm text-dark-grey">Total</span>
              <span className="text-2xl font-bold">{testimonials.length ? testimonials.length : '-'}</span>
            </div>
            <div className="col-span-1 flex flex-col items-start">
              <span className="text-sm text-dark-grey">Average Rating</span>
              <span className="text-2xl font-bold">
                {testimonials.length > 0
                  ? `${(testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length).toFixed(1)} / 5`
                  : '-'}
              </span>
            </div>
          </div>
          {testimonials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto max-h-72 rounded-lg">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-light-beige-2 p-4 gap-4 rounded-lg shadow-sm">
              <p className="text-dark-grey text-sm">{testimonial.message}</p>
              <span className="flex flex-row gap-2 mt-2 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Logo
                    key={i}
                    width={24}
                    height={24}
                    color={i < testimonial.rating ? "#105E54" : "#333333"}
                  />
                ))}
              </span>
              <span className="text-dark-grey text-xs">- {testimonial.customerName}</span>
            </div>
          ))}
        </div>
          ) : (
        <div className="flex items-center justify-center w-full h-full">
          <span className="text-dark-grey text-lg">No testimonials available</span>
        </div>
          )}
        </div>
      </div>
    </div>
  )
}
