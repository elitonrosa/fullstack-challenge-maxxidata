"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ProfessionalType } from "@/types/professional-types-types";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { professionalFormSchema } from "@/validations/schemas/professional-form";
import Alert from "@/components/alert/alert";
import { useToast } from "@/components/ui/use-toast";
import { Professional } from "@/types/professionals-types";
import { localFetch } from "@/functions/fetch-utils";
import { FetchStatus } from "@/enums/fetch-status";

type ProfessionalsFormProps = {
  mode: "create" | "update";
  data?: ProfessionalType[];
  entity?: Professional;
};

export default function ProfessionalsForm({ mode, data, entity }: ProfessionalsFormProps) {
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof professionalFormSchema>>({
    resolver: zodResolver(professionalFormSchema),
    defaultValues: {
      name: entity?.name || "",
      email: entity?.email || "",
      phone: entity?.phone || "",
      professionalTypeId: entity?.professionalType.id || 0,
      status: true,
    },
  });

  const newProfessional = async (values: z.infer<typeof professionalFormSchema>) => {
    const { status } = await localFetch("/professionals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        status: values.status,
        phone: values.phone || null,
        email: values.email || null,
        professionalTypeId: values.professionalTypeId,
      }),
    });

    if (status === FetchStatus.SUCCESS) return setShowAlert(true);

    return toast({
      variant: "destructive",
      title: "Erro ao cadastrar profissional!",
      description: "Houve um erro ao cadastrar o profissional, tente novamente em alguns instantes",
    });
  };

  const updateProfessional = async (values: z.infer<typeof professionalFormSchema>) => {
    const { status } = await localFetch(`/professionals/${entity?.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        phone: values.phone || null,
        email: values.email || null,
        professionalTypeId: values.professionalTypeId,
        status: values.status,
      }),
    });

    if (status === FetchStatus.SUCCESS) {
      router.refresh();
      router.push("/professionals");
      return toast({
        variant: "default",
        title: "Profissional atualizado com sucesso!",
        description: "O profissional foi atualizado com sucesso",
        className: "bg-green-500 text-white",
      });
    }

    return toast({
      variant: "destructive",
      title: "Erro ao atualizar profissional!",
      description: "Houve um erro ao atualizar o profissional, tente novamente em alguns instantes",
    });
  };

  const handleSubmit = async (values: z.infer<typeof professionalFormSchema>) => {
    if (mode === "update") return await updateProfessional(values);
    await newProfessional(values);
  };

  const handlePushToProfessionals = () => {
    setShowAlert(false);
    router.refresh();
    router.push("/professionals");
  };

  const handleFormReset = () => {
    form.reset();
    setShowAlert(false);
  };

  const handlePhoneMask = (target: any) => {
    let input = target.target;
    form.setValue("phone", phoneNumberMask(input.value));
    input.value = phoneNumberMask(input.value);
  };

  const phoneNumberMask = (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  const professionalTypes = useMemo(() => data?.map((type) => ({ label: type.description, value: type.id })), [data]);

  return (
    <>
      <Alert
        title="Profissional cadastrado com sucesso!"
        description="Deseja cadastrar outro profissional?"
        open={showAlert}
        confirmText="Sim"
        rejectText="Não"
        confirmFunc={handleFormReset}
        rejectFunc={handlePushToProfessionals}
      />

      <main className="flex h-full w-full flex-col items-center justify-center py-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-1/2 flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome Completo <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="João das Neves" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input placeholder="joaoneves@email.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>

                  <FormControl>
                    <Input maxLength={15} onKeyUp={handlePhoneMask} placeholder="(00) 00000-0000" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="professionalTypeId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className={form.getValues("professionalTypeId") !== 0 ? "text-black" : ""}>
                      Profissão <span className="text-red-500">*</span>
                    </FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-[250px] justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value
                              ? professionalTypes?.find((type) => type.value === field.value)?.label
                              : "Selecionar profissão"}

                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="h-60 w-[250px] p-0">
                        <Command>
                          <CommandInput placeholder="Selecione uma profissão..." className="h-9" />

                          <CommandEmpty>Nenhuma profissão encontrada.</CommandEmpty>

                          <CommandGroup className="overflow-y-scroll">
                            {professionalTypes?.map((type) => (
                              <CommandItem
                                value={type.label}
                                key={type.value}
                                onSelect={() => {
                                  form.setValue("professionalTypeId", type.value);
                                }}
                              >
                                {type.label}

                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    type.value === field.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage hidden={form.getValues("professionalTypeId") !== 0} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="mt-8">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <FormLabel>Profissional ativo?</FormLabel>

                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" variant="default" className="mt-4 py-5">
              {mode === "create" ? "Cadastrar" : "Salvar"}
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
}
