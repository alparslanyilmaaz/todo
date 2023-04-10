import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { ITodoDTO, Todo } from "../../models/todo.model";
import { useAxios } from "../../providers/axios-provider";
import { backendUrl } from "../config";

export const useGetTodos = () => {
  const axios = useAxios();

  const queryFn = useCallback(async () => {
    const { data } = await axios.get<ITodoDTO[]>(`${backendUrl}todo`);
    return data.map((item) => new Todo(item));
  }, [axios]);

  return useQuery({
    queryKey: ['todos'],
    queryFn,
    enabled: !!axios
  })
}