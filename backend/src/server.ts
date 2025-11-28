import "dotenv/config";
import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks";

const app = express();

// Libera CORS para qualquer origem (localhost, Vercel, etc.)
app.use(
  cors({
    origin: "*",
  })
);

// Garante os headers de CORS em qualquer resposta
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Task Manager OK");
});

app.use("/tasks", tasksRouter);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
