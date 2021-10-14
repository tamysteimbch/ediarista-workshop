import { useState, useMemo } from "react";
import { UserShortInterface } from "data/@types/UserInterface";
import { ValidationService } from "data/services/ValidationService";
import { ApiService } from "data/services/ApiService";

export default function useIndex() {
  const [cep, setCep] = useState(""),
    validCep = useMemo(() => {
      return ValidationService.cep(cep);
    }, [cep]),
    [error, setError] = useState(""),
    [doneSearch, setDoneSearch] = useState(false),
    [loading, setLoading] = useState(false),
    [professionals, setProfessionals] = useState([] as UserShortInterface[]),
    [moreProfessionals, setMoreProfessionals] = useState(0);

  async function searchProfessionals(cep: string) {
    setDoneSearch(false);
    setLoading(true);
    setError("");

    try {
      const { data } = await ApiService.get<{
        diaristas: UserShortInterface[];
        quantidade_diaristas: number;
      }>("/api/diaristas-cidade?cep=" + cep.replace(/\D/g, ""));
      setProfessionals(data.diaristas);
      setMoreProfessionals(data.quantidade_diaristas);
      setDoneSearch(true);
      setLoading(false);
    } catch (error) {
      setError("CEP não encontrado");
      setLoading(false);
    }
  }

  return {
    cep,
    setCep,
    validCep,
    searchProfessionals,
    error,
    professionals,
    doneSearch,
    loading,
    moreProfessionals,
  };
}
