import { Router } from "express";
import { prisma } from "../lib/prisma";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/taskSchema";

const router = Router();

router.get("/", async (req,res)=>{
  const { status, search, orderBy } = req.query;
  const tasks = await prisma.task.findMany({
    where:{
      status: status ? String(status).toUpperCase() : undefined,
      title: search ? { contains:String(search), mode:"insensitive"}:undefined
    },
    orderBy:{ createdAt: orderBy==="asc"?"asc":"desc"}
  });
  res.json(tasks);
});

router.post("/", async (req,res)=>{
  const parse = taskCreateSchema.safeParse(req.body);
  if(!parse.success) return res.status(400).json(parse.error.flatten());
  const data=parse.data;

  const task=await prisma.task.create({
    data:{
      title:data.title,
      description:data.description,
      status:data.status ?? "PENDENTE",
      priority:data.priority ?? "MEDIA",
      dueDate:data.dueDate? new Date(data.dueDate):null
    }
  });
  res.status(201).json(task);
});

router.put("/:id", async (req,res)=>{
  const { id } = req.params;
  const parse = taskUpdateSchema.safeParse(req.body);
  if(!parse.success) return res.status(400).json(parse.error.flatten());
  const data=parse.data;

  try{
    const task=await prisma.task.update({
      where:{ id },
      data:{...data, dueDate:data.dueDate? new Date(data.dueDate):undefined}
    });
    res.json(task);
  } catch {
    res.status(404).json({ message:"Tarefa não encontrada"});
  }
});

router.delete("/:id", async(req,res)=>{
  const {id}=req.params;
  try{
    await prisma.task.delete({ where:{id}});
    res.status(204).send();
  } catch {
    res.status(404).json({message:"Tarefa não encontrada"});
  }
});

export default router;