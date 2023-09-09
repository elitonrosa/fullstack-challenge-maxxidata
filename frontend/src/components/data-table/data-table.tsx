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
    <main className="px-4 py-6 sm:px-10 sm:pl-24">
      <div className="flex flex-col items-center justify-between gap-4 pb-4 md:flex-row md:gap-0">
        <Input
          placeholder={`Buscar ${searchColumn === "Nome" ? "profissional" : "profissão"}`}
          value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(searchColumn)?.setFilterValue(event.target.value)}
          className="flex w-full min-w-[200px] items-center py-4 md:w-[60%]"
        />

        <div className="flex w-full items-center justify-between gap-2 sm:gap-4 md:justify-end">
          <Link href={`${path}/new`}>
            <Button>
              <PlusCircledIcon className="mr-2 h-5 w-5 max-[374px]:mr-0" />
              <span className="max-[374px]:hidden">
                {path === "/professionals" ? "Novo profissional" : "Nova profissão"}
              </span>
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

      <div className="flex flex-col items-center justify-between gap-4 space-x-2 py-4 md:flex-row md:items-center">
        <p className="ml-2 text-sm font-medium text-muted-foreground">{`${data.length} registros`}</p>

        <DataTablePagination table={table} />
      </div>
    </main>
  );
}
