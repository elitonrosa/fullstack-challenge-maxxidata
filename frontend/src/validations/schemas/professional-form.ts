import { z } from "zod";

export const professionalFormSchema = z.object({
  name: z.string().min(3, "O nome precisa ter ao menos 6 caracteres.").max(100).optional(),
  email: z.string().email("O email precisa ser válido.").optional().or(z.literal("")),
  phone: z
    .string()
    .min(14, "O número precisa ser válido.")
    .max(15, "O número precisa ser válido.")
    .optional()
    .or(z.literal("")),
  professionalTypeId: z
    .number({
      required_error: "Selecione uma profissão",
    })
    .min(1, "Selecione uma profissão"),
  status: z.boolean(),
});
