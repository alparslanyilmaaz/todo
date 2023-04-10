import { UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { ITodoDTO, Todo } from "../../models/todo.model";
import { useAxios } from "../../providers/axios-provider";
import { backendUrl } from "../config";
import { useGetTodos } from "./use-get-todo";

export interface PostGroupPayload {
  todo: string;
  executionDate: Date;
  groupIds?: string[] | undefined;
}

export const useCreateTodo = (mutationOptions: UseMutationOptions<Todo, unknown, PostGroupPayload> = {}) => {
  const {onSuccess, onError, ...options} = mutationOptions;
  const axios = useAxios();
  const {data: todos} = useGetTodos();
  const queryClient = useQueryClient();

  const mutationFn = useCallback(async (payload: PostGroupPayload) => {
    const { data } = await axios.post<ITodoDTO>(`${backendUrl}todo`, payload);
    return new Todo(data);
  }, [axios]);

  return useMutation({
    mutationFn,
    ...options,
    onSuccess(...args){
      // Add created data to cache instead making Get request for todos.
      queryClient.setQueryData(['todos'], todos?.length ? [...todos, args[0]]: [args[0]]);
      onSuccess?.(...args);
    },
    onError(...args){
      onError?.(...args);
    }
  })
}