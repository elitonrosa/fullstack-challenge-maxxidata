import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

type DataTableVisibilityButtonProps<TData> = {
  table: Table<TData>;
};

export function DataTableVisibilityButton<TData, TValue>({ table }: DataTableVisibilityButtonProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="mr-3">
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          <p className="hidden md:block">Ocultar colunas</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map(
            (column) =>
              column.id !== "actions" && (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ),
          )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
