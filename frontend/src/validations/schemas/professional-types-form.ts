import { z } from "zod";

export const professionalTypesFormSchema = z.object({
  description: z.string().min(3, "A descrição precisa ter ao menos 3 caracteres.").max(100).optional(),
  status: z.boolean(),
});
