export default function useAddOrEdit() {
  const handleAddOrEdit = async <T extends { id?: number }>(
    data: T,
    existingItem: T | null,
    addFunction: (data: T) => Promise<T>,
    updateFunction: (id: number, data: T) => Promise<T>,
    setItems: React.Dispatch<React.SetStateAction<T[]>>,
    setEditingItem: React.Dispatch<React.SetStateAction<T | null>>,
    setFormData: React.Dispatch<React.SetStateAction<T>>,
    extraFields?: Partial<T>
  ) => {
    try {
      if (
        !data ||
        Object.values(data).some((value: unknown) => {
          if (typeof value === "string") {
            return value.trim() === "";
          }
          if (typeof value === "number") {
            return isNaN(value);
          }
          return value === undefined || value === null;
        })
      ) {
        alert("Preencha todos os campos antes de salvar.");
        return;
      }

      let updatedItem: T;

      if (existingItem) {
        updatedItem = await updateFunction(existingItem.id!, { ...data });
        setItems((prev) => prev.map((item) => (item.id === existingItem.id ? updatedItem : item)));
      } else {
        updatedItem = await addFunction({ ...data, ...extraFields });
        setItems((prev) => [...prev, updatedItem]);
      }

      setFormData({} as T);
      setEditingItem(null);
    } catch (error: any) {
      console.error("Erro ao salvar item:", error);
      alert(`Erro ao salvar. Detalhes: ${error.response?.data?.message || error.message}`);
    }
  };

  return {
    handleAddOrEdit,
  };
}
