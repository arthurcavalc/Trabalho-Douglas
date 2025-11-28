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
          gap: 8,
          alignItems: "center",
        }}
      >
        <input
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="PENDENTE">Pendentes</option>
          <option value="EM_ANDAMENTO">Em andamento</option>
          <option value="CONCLUIDA">Concluídas</option>
        </select>
      </section>

      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <h2>{editingId ? "Editar tarefa" : "Nova tarefa"}</h2>

        <div>
          <label>Título</label>
          <input name="title" value={form.title} onChange={handleChange} />
          {errors.title && (
            <span style={{ color: "red", display: "block" }}>
              {errors.title}
            </span>
          )}
        </div>

        <div>
          <label>Descrição</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span style={{ color: "red", display: "block" }}>
              {errors.description}
            </span>
          )}
        </div>

        <div>
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="PENDENTE">Pendente</option>
            <option value="EM_ANDAMENTO">Em andamento</option>
            <option value="CONCLUIDA">Concluída</option>
          </select>
        </div>

        <div>
          <label>Prioridade</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="BAIXA">Baixa</option>
            <option value="MEDIA">Média</option>
            <option value="ALTA">Alta</option>
          </select>
        </div>

        <div>
          <label>Data limite</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate ?? ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          {editingId ? "Salvar alterações" : "Criar tarefa"}
        </button>
      </form>

      <section>
        <h2>Lista de tarefas</h2>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              padding: 8,
              marginBottom: 8,
            }}
          >
            <strong>{task.title}</strong> ({task.status} - {task.priority})
            <p>{task.description}</p>
            {task.dueDate && <p>Prazo: {task.dueDate.slice(0, 10)}</p>}
            <button onClick={() => handleEdit(task)}>Editar</button>
            <button onClick={() => handleDelete(task.id)}>Excluir</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
