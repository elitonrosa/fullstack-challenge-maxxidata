import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type AlertProps = {
  title: string;
  description: string;
  open: boolean;
  confirmText?: string;
  rejectText?: string;
  confirmFunc?: () => void;
  rejectFunc?: () => void;
  confimButtonVariant?: "default" | "destructive";
};

export default function Alert({
  title,
  description,
  confirmFunc,
  open,
  confimButtonVariant,
  rejectFunc,
  rejectText,
  confirmText,
}: AlertProps) {
  const handleReject = () => {
    rejectFunc && rejectFunc();
  };

  const handleConfirm = () => {
    confirmFunc && confirmFunc();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleReject}>{rejectText ?? "Cancelar"}</AlertDialogCancel>

          <AlertDialogAction
            type="button"
            className={
              confimButtonVariant === "destructive"
                ? "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                : ""
            }
            onClick={handleConfirm}
          >
            {confirmText ?? "Continuar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
