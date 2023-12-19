import axios from "axios";

const apiClient = axios.create({
  // ローカルで動かしたい時はこっち
  // baseURL: "http://localhost:8000/api",
  // 本番の時は下記を使う
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
