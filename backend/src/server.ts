import "dotenv/config";
import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks";

const app = express();

// CORS bem simples: libera tudo
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Task Manager OK");
});

app.use("/tasks", tasksRouter);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
