import { usePathname, useRouter } from "next/navigation";
import { Professional } from "@/types/professionals-types";
import { ProfessionalType } from "@/types/professional-types-types";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { localFetch } from "@/functions/fetch-utils";
import Alert from "@/components/alert/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { FetchStatus } from "@/enums/fetch-status";

type DataTableActionsProps = {
  registry: Professional & ProfessionalType;
};

export function DataTableActions({ registry }: DataTableActionsProps) {
  const [showAlert, setShowAlert] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleRegistryDeletion = async () => {
    const { status } = await localFetch(`${path}/${registry.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setShowAlert(false);

    if (status === FetchStatus.UNPROCESSABLE_ENTITY) {
      return toast({
        variant: "destructive",
        title: "Erro ao deletar registro!",
        description: "Não é possível deletar uma profissão que está relacionada a um profissional.",
      });
    }

    if (status !== FetchStatus.SUCCESS) {
      return toast({
        variant: "destructive",
        title: "Erro ao deletar registro!",
        description: "Houve um erro ao deletar o registro, tente novamente em alguns instantes.",
      });
    }

    toast({
      variant: "default",
      title: "Registro deletado com sucesso!",
      description: "O registro foi deletado com sucesso.",
      duration: 2000,
      className: "bg-green-500 text-white",
    });

    router.refresh();
  };

  const handleRegistryUpdate = async () => {
    router.push(`${path}/update/${registry.id}`);
  };

  const handleShowAlert = async () => {
    setShowAlert(!showAlert);
  };

  return (
    <>
      <Alert
        open={showAlert}
        title={`Deseja deletar o registro ${path === "/professionals" ? registry.name : registry.description}?`}
        description="Essa ação não pode ser desfeita!"
        confirmFunc={handleRegistryDeletion}
        rejectFunc={handleShowAlert}
        confirmText="Sim"
        rejectText="Não"
        confimButtonVariant="destructive"
      />

      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-6 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mr-8">
            <DropdownMenuItem className="cursor-pointer" onClick={handleRegistryUpdate}>
              Editar
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleShowAlert} className="cursor-pointer">
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
