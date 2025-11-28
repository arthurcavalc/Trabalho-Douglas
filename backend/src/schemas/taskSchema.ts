import { z } from "zod";

export const taskCreateSchema = z.object({
  title: z.string().min(3, "Título deve ter ao menos 3 caracteres"),
  description: z.string().min(5, "Descrição deve ter ao menos 5 caracteres"),
  status: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA"]).optional(),
  priority: z.enum(["BAIXA", "MEDIA", "ALTA"]).optional(),
  // aceita string simples de data
  dueDate: z.string().optional(),
});

export const taskUpdateSchema = taskCreateSchema.partial();
