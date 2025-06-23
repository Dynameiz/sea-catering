"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DM_Sans } from "next/font/google";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, View } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Tag from "@/components/ui/Tag";
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";

const dmSans = DM_Sans({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    variable: '--font-dm-sans',
    display: 'swap',
});

export default function MySubscription() {
  
  const [modalType, setModalType] = useState<"edit" | "view" | "">("");

  return (
    <div className={`${dmSans.className} flex flex-1`}>
      <Modal>
        <div className="w-full rounded-tl-2xl mx-auto flex items-center justify-center min-h-screen bg-light-beige-2 p-4 md:p-10">
          <div className="flex flex-col bg-white rounded-xl shadow-lg p-6 md:p-10 w-full h-full">
            <h1 className="text-2xl md:text-3xl font-bold text-start">My Subscription</h1>
            <hr className="border-t-2 border-gray-200 my-4" />
            <div className="flex flex-col items-center justify-start h-full">
              <DataTable setModalType={setModalType} />
            </div>
          </div>
        </div>
        <ModalBody>
          <ModalContent>
            {modalType === "edit" ? <EditSubscription /> : <ViewSubscription />}
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  )
}

const dummyData: Subscription[] = [
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
  {
    allergies: "Nuts, Dairy",
    createdAt: "2023-10-01T12:00:00Z",
    price: 1720000,
    mealPlan: "Protein Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    status: "ACTIVE",
  },
  {
    allergies: "-",
    createdAt: "2023-10-02T12:00:00Z",
    price: 1500000,
    mealPlan: "Diet Plan",
    mealType: ["bre", "lun", "din"],
    deliveryDays: ["mon", "tue", "wed", "thu", "fri"],
    status: "PAUSED",
  },
  {
    allergies: "Gluten",
    createdAt: "2023-10-03T12:00:00Z",
    price: 1800000,
    mealPlan: "Royal Plan",
    mealType: ["bre", "lun"],
    deliveryDays: ["mon", "wed", "fri"],
    status: "CANCELLED",
  },
]

type Subscription = {
  mealPlan: string;
  allergies?: string | "-";
  createdAt: string;
  price: number;
  mealType: string[];
  deliveryDays: string[];
  status: "ACTIVE" | "PAUSED" | "CANCELLED";
};

export function DataTable({ setModalType }: { setModalType: (type: "edit" | "view" | "") => void }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  // Add columns based on Subscription type
  const columns: ColumnDef<Subscription>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "mealPlan",
      header: "Meal Plan",
      cell: ({ row }) => <div>{row.getValue("mealPlan")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt") as string)
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      accessorKey: "allergies",
      header: "Allergies",
      cell: ({ row }) => <div>{row.getValue("allergies")}</div>,
    },
    {
      accessorKey: "mealType",
      header: "Meal Type",
      cell: ({ row }) => (
        <div>
          {(row.getValue("mealType") as string[]).map((type: string) => (
            <Tag key={type} name={type} variant="default" />
          ))}
        </div>
      ),
    },
    
    {
      accessorKey: "deliveryDays",
      header: "Delivery Days",
      cell: ({ row }) => (
        <div>
          {(row.getValue("deliveryDays") as string[]).map((day: string) => (
            <Tag key={day} name={day} variant="default" />
          ))}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Tag name={row.getValue("status")} variant={
          row.getValue("status") === "ACTIVE"
            ? "active"
            : row.getValue("status") === "PAUSED"
            ? "paused"
            : "canceled"
          }
        />
      )
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const price = row.getValue("price") as number;
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(price);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
                <ModalTrigger>
                  <DropdownMenuItem onClick={() => setModalType('edit')}>Edit Subscription</DropdownMenuItem>
                </ModalTrigger>
                <ModalTrigger>
                  <DropdownMenuItem onClick={() => setModalType('view')}>View Detail</DropdownMenuItem>
                </ModalTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable<Subscription>({
    data: dummyData,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter meal plan..."
          value={(table.getColumn("mealPlan")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("mealPlan")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


function EditSubscription() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Subscription</h2>
      <form>
        
      </form>
    </div>
  );
}

function ViewSubscription() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">View Subscription</h2>
      
    </div>
  );
} 