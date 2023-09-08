import { usePathname, useRouter } from "next/navigation";
import { Professional } from "@/types/professionals-types";
import { ProfessionalType } from "@/types/profissional-types-types";
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
  const urlPath = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleRegistryDeletion = async () => {
    const { status } = await localFetch(`${urlPath}/${registry.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setShowAlert(false);

    if (status !== FetchStatus.SUCCESS) {
      return toast({
        variant: "destructive",
        title: "Erro ao deletar registro!",
        description: "Houve um erro ao deletar o profissional, tente novamente em alguns instantes",
      });
    }

    toast({
      variant: "default",
      title: "Registro deletado com sucesso!",
      description: "O registro foi deletado com sucesso",
      duration: 2000,
      className: "bg-green-500 text-white",
    });

    router.refresh();
  };

  const handleRegistryUpdate = async () => {
    router.push(`${urlPath}/update/${registry.id}`);
  };

  const handleShowAlert = async () => {
    setShowAlert(!showAlert);
  };

  return (
    <div className="text-right">
      <Alert
        open={showAlert}
        title={`Deseja deletar o profissional ${registry.name}?`}
        description="Essa ação não pode ser desfeita!"
        confirmFunc={handleRegistryDeletion}
        rejectFunc={handleShowAlert}
        confirmText="Sim"
        rejectText="Não"
        confimButtonVariant="destructive"
      />
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
  );
}
