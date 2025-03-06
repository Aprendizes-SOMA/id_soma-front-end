import { useState } from "react";

export default function useSelected() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleConfirmDelete = async <T extends { id: number }>(
    item: T,
    deleteFunction: (id: number) => Promise<void>,
    setItems: React.Dispatch<React.SetStateAction<T[]>>,
    setSelectedItem: React.Dispatch<React.SetStateAction<T | null>>
  ) => {
    if (!item) return;
    try {
      await deleteFunction(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      setSelectedItem(null);
    } catch (error: any) {
      console.error("Erro ao excluir item:", error);
      alert(error.response?.data?.error || "Erro desconhecido.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  }; 

  const handleDeleteSelected = (
    deleteFunction: (id: number) => Promise<void>,
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
    setSelectedItem: React.Dispatch<React.SetStateAction<any | null>>
  ) => {
    if (selectedIds.length === 0) {
      alert("Selecione pelo menos um colaborador para excluir.");
      return;
    }
  
    if (confirm("Tem certeza que deseja excluir os dados selecionados?")) {
      selectedIds.forEach((id) => 
        handleConfirmDelete({ id } as any, deleteFunction, setItems, setSelectedItem)
      );
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };
  
  return {
    selectedIds,
    setSelectedIds,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleConfirmDelete,
    handleDeleteSelected,
    handleToggleSelect
  }
}
