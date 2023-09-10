"use client";

import { ColumnDef }        from "@tanstack/react-table";
import { Button }           from "@/components/ui/button";
import { ProfessionalType } from "@/types/professional-types-types";
import { Professional }     from "@/types/professionals-types";
import { CaretSortIcon }    from "@radix-ui/react-icons";


export const professionalsColumns: ColumnDef<Professional>[] = [
  {
    accessorKey: "id",
    id: "ID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-none hover:text-accent-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    id: "Nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-none hover:text-accent-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    id: "Telefone",
    header: "Telefone",
    cell: ({ row }) => row.getValue("Telefone") ?? <div>---</div>,
  },
  {
    accessorKey: "email",
    id: "Email",
    header: "Email",
    cell: ({ row }) => row.getValue("Email") ?? <div>---</div>,
  },
  {
    accessorKey: "professionalType",
    id: "Profissão",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-none hover:text-accent-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profissão
          <CaretSortIcon className="ml-2 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    id: "Status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-none hover:text-accent-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("Status") ? "Ativo" : "Inativo"}</div>,
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-right">Editar/Deletar</div>,
    id: "actions",
    cell: "actions",
  },
];

export const professionalTypesColumns: ColumnDef<ProfessionalType>[] = [
  {
    accessorKey: "id",
    id: "ID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-none hover:text-accent-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    id: "Descrição",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-none hover:text-accent-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    id: "Status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-none hover:text-accent-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("Status") ? "Ativo" : "Inativo"}</div>,
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-right">Editar/Deletar</div>,
    id: "actions",
    cell: "actions",
  },
];
