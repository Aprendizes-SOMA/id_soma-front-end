import useFormatCPF from "@/hooks/useFormatCPF";
import { useState } from "react";

export default function useSearch() {
  const { formatCPF } = useFormatCPF();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const numericSearch = searchTerm.replace(/\D/g, "");
  const inputMaxLength = numericSearch && numericSearch.length <= 11 ? 14 : undefined;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const numeric = value.replace(/\D/g, "");
    if (numeric && numeric.length <= 11) {
      value = formatCPF(numeric);
    }
    setSearchTerm(value);
  };

  return {
    searchTerm,
    inputMaxLength,
    handleSearchChange
  }
}