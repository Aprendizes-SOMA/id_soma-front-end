import axiosInstance from "../axiosInstance";

export const importCSV = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post("/api/import-csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao importar CSV:", error);
    throw error;
  }
};
