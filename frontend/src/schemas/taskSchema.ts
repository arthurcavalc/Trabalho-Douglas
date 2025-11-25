import { z } from "zod";
export const taskFormSchema=z.object({
  title:z.string().min(3),
  description:z.string().min(5),
  status:z.enum(["PENDENTE","EM_ANDAMENTO","CONCLUIDA"]),
  priority:z.enum(["BAIXA","MEDIA","ALTA"]),
  dueDate:z.string().optional()
});
export type TaskFormData = z.infer<typeof taskFormSchema>;