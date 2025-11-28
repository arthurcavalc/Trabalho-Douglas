import React, { useEffect, useState } from "react";
import { api } from "./services/api";
import { taskFormSchema, TaskFormData } from "./schemas/taskSchema";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";
  priority: "BAIXA" | "MEDIA" | "ALTA";
  dueDate?: string | null;
  createdAt: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<TaskFormData>({
    title: "",
    description: "",
    status: "PENDENTE",
    priority: "MEDIA",
    dueDate: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const fetchTasks = async () => {
    const res = await api.get<Task[]>("/tasks", {
      params: {
        search,
        status: statusFilter || undefined,
        orderBy: "desc",
      },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [search, statusFilter]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parse = taskFormSchema.safeParse(form);
    if (!parse.success) {
      const fieldErrors: Record<string, string> = {};
      parse.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, form);
      } else {
        await api.post("/tasks", form);
      }

      setForm({
        title: "",
        description: "",
        status: "PENDENTE",
        priority: "MEDIA",
        dueDate: "",
      });
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      alert("Erro ao salvar tarefa");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const total = tasks.length;
  const concluidas = tasks.filter((t) => t.status === "CONCLUIDA").length;
  const pendentes = tasks.filter((t) => t.status === "PENDENTE").length;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h1>Gerenciador de Tarefas</h1>

      <section style={{ marginBottom: 16 }}>
        <p>
          Total: {total} | Pendentes: {pendentes} | Concluídas: {concluidas}
        </p>
      </section>

      <section
        style={{
          marginBottom: 16,
          display: "flex",
          gap
