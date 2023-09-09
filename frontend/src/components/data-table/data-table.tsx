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
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableVisibilityButton } from "@/components/data-table/data-table-visibility-button";
import { DataTableActions } from "@/components/data-table/data-table-actions";
import { Registry } from "@/types/data-table-types";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchColumn: string;
};

export default function DataTable<TData, TValue>({ columns, data, searchColumn }: DataTableProps<TData, TValue>) {
  const [columnSorting, setColumnSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setColumnSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting: columnSorting,
      columnFilters,
      columnVisibility,
    },
  });

  const path = usePathname();

  return (
    <main className="px-10 py-6 pl-24">
      <div className="flex items-center justify-between pb-4">
        <Input
          placeholder={`Buscar ${searchColumn === "Nome" ? "profissional" : "profissão"}`}
          value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(searchColumn)?.setFilterValue(event.target.value)}
          className="flex w-1/2 min-w-[250px] items-center py-4"
        />

        <div className="flex items-center justify-center gap-4">
          <Link href={`${path}/new`}>
            <Button className="bg-green-600 hover:bg-green-600/90">
              <PlusCircledIcon className="mr-2 h-5 w-5" />
              <span>{path === "/professionals" ? "Novo profissional" : "Nova profissão"}</span>
            </Button>
          </Link>

          <DataTableVisibilityButton table={table} />
        </div>
      </div>

      <div className="rounded-md border px-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.columnDef.cell === "actions"
                        ? flexRender(<DataTableActions registry={cell.row.original as Registry} />, cell.getContext())
                        : flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem registros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <p className="ml-2 text-sm font-medium text-muted-foreground">{`${data.length} registros`}</p>

        <DataTablePagination table={table} />
      </div>
    </main>
  );
}
