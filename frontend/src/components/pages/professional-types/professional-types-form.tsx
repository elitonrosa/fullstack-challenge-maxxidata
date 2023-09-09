"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/components/alert/alert";
import { useToast } from "@/components/ui/use-toast";
import { localFetch } from "@/functions/fetch-utils";
import { FetchStatus } from "@/enums/fetch-status";
import { professionalTypesFormSchema } from "@/validations/schemas/professional-types-form";
import { ProfessionalType } from "@/types/professional-types-types";
import { Card } from "@/components/ui/card";

type ProfessionalsFormProps = {
  mode: "create" | "update";
  entity?: ProfessionalType;
};

export default function ProfessionalTypesForm({ mode, entity }: ProfessionalsFormProps) {
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof professionalTypesFormSchema>>({
    resolver: zodResolver(professionalTypesFormSchema),
    defaultValues: {
      description: entity?.description || "",
      status: entity?.status || true,
    },
  });

  const newProfessionalType = async (values: z.infer<typeof professionalTypesFormSchema>) => {
    const { status } = await localFetch("/professionals/types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: values.description,
        status: values.status,
      }),
    });

    if (status === FetchStatus.SUCCESS) return setShowAlert(true);

    return toast({
      variant: "destructive",
      title: "Erro ao cadastrar profissão!",
      description: "Houve um erro ao cadastrar a profissão, tente novamente em alguns instantes",
    });
  };

  const updateProfessionalType = async (values: z.infer<typeof professionalTypesFormSchema>) => {
    const { status } = await localFetch(`/professionals/types/${entity?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: values.description,
        status: values.status,
      }),
    });

    if (status === FetchStatus.SUCCESS) {
      router.refresh();
      router.push("/professionals/types");
      return toast({
        variant: "default",
        title: "Profissão atualizada com sucesso!",
        description: "A profissão foi atualizado com sucesso",
        className: "bg-green-500 text-white",
      });
    }

    return toast({
      variant: "destructive",
      title: "Erro ao atualizar profissão!",
      description: "Houve um erro ao atualizar a profissão, tente novamente em alguns instantes",
    });
  };

  const handleSubmit = async (values: z.infer<typeof professionalTypesFormSchema>) => {
    if (mode === "update") return await updateProfessionalType(values);
    await newProfessionalType(values);
  };

  const handleRedirect = () => {
    setShowAlert(false);
    router.refresh();
    router.push("/professionals/types");
  };

  const handleFormReset = () => {
    form.reset();
    setShowAlert(false);
  };

  return (
    <>
      <Alert
        title="Profissão cadastrada com sucesso!"
        description="Deseja cadastrar outra profissão?"
        open={showAlert}
        confirmText="Sim"
        rejectText="Não"
        confirmFunc={handleFormReset}
        rejectFunc={handleRedirect}
      />

      <main className="flex h-full w-full flex-col items-center justify-center py-10">
        <Card className="flex h-[90%] w-1/2 flex-col items-center justify-center py-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full max-w-[500px] flex-col gap-3 px-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Descrição <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <Input placeholder="Auxiliar de Serviçoes Gerais" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <FormLabel>Profissão ativa?</FormLabel>

                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" variant="default" className="mt-4 py-5">
                {mode === "create" ? "Cadastrar" : "Salvar"}
              </Button>
            </form>
          </Form>
        </Card>
      </main>
    </>
  );
}
