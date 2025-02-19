import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { listCollaborators, addCollaborator, updateCollaborator, deleteCollaborator } from "../app/api/collaborator/collaborators";
import { logoutAdmin } from "../app/api/admin/auth";
import axiosInstance from "../app/api/axiosInstance";

export function useCollaborators() {
  const router = useRouter();
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDependentsModalOpen, setIsDependentsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [formData, setFormData] = useState<Collaborator>({
    id: 0,
    name: "",
    cpf: "",
    role: "",
    matricula: "",
    dependents: [],
  });
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const data = await listCollaborators();
        setCollaborators(data);
      } catch (err) {
        console.error("Erro ao buscar colaboradores:", err);
      }
    };
    fetchCollaborators();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      router.push("/loginAdmin");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleSaveDependents = async (updatedDependents: DependentProps[]) => {
    if (!selectedCollaborator) return;
  
    try {
      const promises = updatedDependents.map((dependent) => {
        if (dependent.id) {
          return axiosInstance.put(`/dependents/${dependent.id}`, {
            name: dependent.name,
            parentesco: dependent.parentesco,
          });
        } else {
          return axiosInstance.post(`/dependents`, {
            name: dependent.name,
            parentesco: dependent.parentesco,
            collaboratorId: selectedCollaborator.id,
            adminId: 3,
          });
        }
      });

      const results = await Promise.all(promises);
  
      setCollaborators((prev) =>
        prev.map((collaborator) =>
          collaborator.id === selectedCollaborator.id
            ? { ...collaborator, dependents: results.map((res) => res.data) }
            : collaborator
        )
      );
  
    } catch (error) {
      console.error("Erro ao salvar dependentes:", error);
      alert("Erro ao salvar dependentes. Por favor, tente novamente.");
    } finally {
      setIsDependentsModalOpen(false);
    }
  };

  const handleAddCollaborator = async (data: { name: string; cpf: string; role: string; matricula: string }) => {
    try {
      setLoading(true);
      const newCollaborator = await addCollaborator({
        name: data.name,
        cpf: data.cpf,
        role: data.role,
        matricula: data.matricula,
        adminId: 3,
      });

      setCollaborators((prev) => [...prev, { ...newCollaborator, dependents: [] }]);
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Erro ao adicionar colaborador:", error);
      alert(error.response?.data?.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCollaborator = async (data: { name: string; cpf: string; role: string; matricula: string }) => {
    if (!selectedCollaborator) return;
    setLoading(true);
    try {
      const updatedCollaborator = await updateCollaborator(selectedCollaborator.id, {
        name: data.name,
        cpf: data.cpf,
        role: data.role,
        matricula: data.matricula
      });

      setCollaborators((prev) =>
        prev.map((collaborator) =>
          collaborator.id === selectedCollaborator.id ? updatedCollaborator : collaborator
        )
      );

      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Erro ao editar colaborador:", error);
      alert(error.response?.data?.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setIsDeleteModalOpen(true);
  };  

  const handleConfirmDelete = async (collaborator: Collaborator) => {
    if (!collaborator) return;
    try {
      await deleteCollaborator(collaborator.id);
      setCollaborators((prev) => prev.filter((c) => c.id !== collaborator.id));
      setSelectedCollaborator(null);
    } catch (error: any) {
      console.error("Erro ao excluir colaborador:", error);
      alert(error.response?.data?.error || "Erro desconhecido.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };  

  const handleAddClick = () => {
    setModalTitle("Adicionar Colaborador");
    setFormData({ id: 0, name: "", cpf: "", role: "", matricula: "", dependents: [] });
    setEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (collaborator: Collaborator) => {
    setModalTitle("Editar Colaborador");
    setFormData({
      id: collaborator.id,
      name: collaborator.name || "",
      cpf: collaborator.cpf || "",
      role: collaborator.role || "",
      matricula: collaborator.matricula || "",
      dependents: collaborator.dependents || [],
    });

    setSelectedCollaborator(collaborator);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleManageDependents = async (collaborator: Collaborator) => {
    try {
      setSelectedCollaborator(collaborator);
      setIsDependentsModalOpen(true);
  
      const response = await axiosInstance.get(`/dependents`, {
        params: { collaboratorId: collaborator.id },
      });
  
      setSelectedCollaborator((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          dependents: response.data,
        };
      });
    } catch (error) {
      console.error("Erro ao buscar dependentes:", error);
      alert("Erro ao carregar dependentes. Por favor, tente novamente.");
    }
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert("Selecione pelo menos um colaborador para excluir.");
      return;
    }
    if (confirm("Tem certeza que deseja excluir os colaboradores selecionados?")) {
      selectedIds.forEach((id) => handleConfirmDelete({ id } as any));
      setSelectedIds([]);
    }
  };

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6)
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9)
      return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
  };  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const numeric = value.replace(/\D/g, "");
    if (numeric && numeric.length <= 11) {
      value = formatCPF(numeric);
    }
    setSearchTerm(value);
  };
  
  return {
    collaborators,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    isDependentsModalOpen,
    setIsDependentsModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    modalTitle,
    formData,
    selectedCollaborator,
    editMode,
    loading,
    handleLogout,
    handleAddCollaborator,
    handleEditCollaborator,
    handleConfirmDelete,
    handleAddClick,
    handleEditClick,
    handleSaveDependents,
    handleManageDependents,
    handleDeleteClick,
    handleToggleSelect,
    handleDeleteSelected,
    handleSearchChange,
    setSelectedIds,
    selectedIds,
    formatCPF
  };
}
