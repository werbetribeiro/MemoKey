import { z } from "zod";

export const keySchema = z.object({
  id: z.string().optional(),
  key: z
    .array(z.string().min(1, "A chave não pode estar vazia"))
    .min(1, "É necessário pelo menos uma chave"),
  value: z.string().min(1, "O valor é obrigatório"),
  secret: z.boolean().optional().default(false),
});

export type KeyFormData = z.infer<typeof keySchema>;
