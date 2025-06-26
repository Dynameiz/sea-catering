import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { useState } from "react";
import Tag from "./Tag";
import { Button } from "./button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { ModalTrigger } from "./animated-modal";
import { Input } from "./input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Subscription } from "@/types/types";
import { IconCancel, IconInfoCircle, IconPlayerPauseFilled, IconPlayerPlayFilled, IconReload } from "@tabler/icons-react";

type TableProps = {
  data: Subscription[];
  handleUpdateStatus: (subscription: Subscription) => void;
  setSelectedSubscription: (subscription: Subscription | null) => void;
}

export function DataTable(props : TableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})

  const changeStatus = (subscription: Subscription) => {
    props.handleUpdateStatus(subscription);
  }
  
  const columns: ColumnDef<Subscription>[] = [
    {
      id: "rowNumber",
      header: () => (<div className="text-center">No.</div>),
      cell: ({ row }) => (
        <div className="text-center">
          {row.index + 1}
        </div>
      ),
    },
    {
      accessorKey: "mealPlan",
      header: "Meal Plan",
      cell: ({ row }) => <div>{row.getValue("mealPlan")}</div>,
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
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
                    <DropdownMenuItem className="py-2 cursor-pointer"
                      disabled={status === "CANCELLED"}
                      onClick={() => {
                        const selected = row.original;
                        const status = row.getValue("status");

                        if (status === "ACTIVE") {
                          selected.status = "PAUSED";
                        } else if (status === "PAUSED") {
                          selected.status = "ACTIVE";
                        }
                        
                        changeStatus(selected);
                      }}
                    >
                    {status === "PAUSED" ? (
                        <div className="flex flex-row items-center gap-2">
                          <IconPlayerPlayFilled className="h-4 w-4" />
                          Continue Subscription
                        </div>
                      ) : (
                        <div className="flex flex-row items-center gap-2">
                          <IconPlayerPauseFilled className="h-4 w-4" />
                          Pause Subscription
                        </div>
                      )
                    }
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2 cursor-pointer" 
                    onClick={() => {
                        const selected = row.original;
                        const status = row.getValue("status");

                        if (status === "ACTIVE" || status === "PAUSED") {
                          selected.status = "CANCELLED";
                        } else if (status === "CANCELLED") {
                          selected.status = "ACTIVE";
                        }
                        
                        changeStatus(selected);
                      }}
                  >
                    {status === "CANCELLED" ? (
                        <div className="flex flex-row items-center gap-2">
                          <IconReload className="h-4 w-4" />
                          Reactivate Subscription
                        </div>
                      ) : (
                        <div className="flex flex-row items-center gap-2 text-red-700">
                          <IconCancel className="h-4 w-4 text-red-700" />
                          Cancel Subscription
                        </div>
                      )
                    }
                  </DropdownMenuItem>
                <ModalTrigger>
                  <DropdownMenuItem className="py-2 cursor-pointer" onClick={() => {props.setSelectedSubscription(row.original)}}>
                    <div className="flex flex-row items-center gap-2">
                      <IconInfoCircle className="h-4 w-4" />
                      View Detail
                    </div>
                  </DropdownMenuItem>
                </ModalTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable<Subscription>({
    data: props.data,
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