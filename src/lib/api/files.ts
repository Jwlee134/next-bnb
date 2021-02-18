import axios from "src/pages/api";

export const uploadFileAPI = (file: FormData) =>
  axios.post("api/files/upload", file);
