import axios from "axios";

export const api = axios.create({
  baseURL: "https://trabalho-douglas.onrender.com",
  timeout: 10000, // evita travar caso o servidor demore
});
