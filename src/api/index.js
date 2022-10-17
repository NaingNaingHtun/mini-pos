import axios from "axios";

const api = axios.create({
  baseURL: "https://klink-minipos.herokuapp.com/api",
});

export default api;
