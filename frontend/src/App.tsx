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
    <div className="app-root">
      <div className="card">
        <header className="app-header">
          <h1>Gerenciador de Tarefas</h1>
          <p className="summary">
            Total: {total} | Pendentes: {pendentes} | Concluídas: {concluidas}
          </p>
        </header>

        <section className="filters">
          <input
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

        <section>
          <h2 className="section-title">
            {editingId ? "Editar tarefa" : "Nova tarefa"}
          </h2>

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-row form-row-full">
              <label className="label">Título</label>
              <input
                name="title"
                className="input"
                value={form.title}
                onChange={handleChange}
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </div>

            <div className="form-row form-row-full">
              <label className="label">Descrição</label>
              <textarea
                name="description"
                className="textarea"
                value={form.description}
                onChange={handleChange}
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>

            <div className="form-row">
              <label className="label">Status</label>
              <select
                name="status"
                className="select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="PENDENTE">Pendente</option>
                <option value="EM_ANDAMENTO">Em andamento</option>
                <option value="CONCLUIDA">Concluída</option>
              </select>
            </div>

            <div className="form-row">
              <label className="label">Prioridade</label>
              <select
                name="priority"
                className="select"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>

            <div className="form-row">
              <label className="label">Data limite</label>
              <input
                type="date"
                name="dueDate"
                className="date"
                value={form.dueDate ?? ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <button type="submit" className="button-primary">
                {editingId ? "Salvar alterações" : "Criar tarefa"}
              </button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="section-title">Lista de tarefas</h2>

          <div className="tasks-list">
            {tasks.map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-header">
                  <span className="task-title">{task.title}</span>
                  <div className="task-badges">
                    <span className={`badge status-${task.status}`}>
                      {task.status.replace("_", " ")}
                    </span>
                    <span className={`badge priority-${task.priority}`}>
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className="badge">
                        Prazo: {task.dueDate.slice(0, 10)}
                      </span>
                    )}
                  </div>
                </div>

                <p>{task.description}</p>

                <div className="task-actions">
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => handleEdit(task)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="button-danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}

            {tasks.length === 0 && <p>Nenhuma tarefa cadastrada ainda.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
