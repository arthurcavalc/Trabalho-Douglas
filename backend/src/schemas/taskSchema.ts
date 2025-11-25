import { z } from "zod";
export const taskCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  status: z.enum(["PENDENTE","EM_ANDAMENTO","CONCLUIDA"]).optional(),
  priority: z.enum(["BAIXA","MEDIA","ALTA"]).optional(),
  dueDate: z.string().datetime().optional()
});
export const taskUpdateSchema = taskCreateSchema.partial();