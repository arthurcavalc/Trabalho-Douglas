import "dotenv/config";
import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks";

const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>res.send("API Task Manager OK"));
app.use("/tasks",tasksRouter);

app.listen(process.env.PORT||3333);