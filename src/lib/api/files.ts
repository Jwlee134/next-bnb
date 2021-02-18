import axios from "src/pages/api";

export const uploadFileAPI = (file: FormData) =>
  axios.post("api/files/upload", file);

export const deleteFileAPI = (key: string) =>
  axios.delete("api/files/delete", {
    data: {
      key,
    },
  });
