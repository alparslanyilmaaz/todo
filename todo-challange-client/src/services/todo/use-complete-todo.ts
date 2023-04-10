import { UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAxios } from "../../providers/axios-provider";
import { backendUrl } from "../config";
import { useGetTodos } from "./use-get-todo";

export interface CompleteTodoPayload {
  id: string;
  isCompleted: boolean;
}

export const useCompleteTodo = (mutationOptions: UseMutationOptions<void, unknown, CompleteTodoPayload> = {}) => {
  const {onSuccess, onError, ...options} = mutationOptions;
  const {data: todos} = useGetTodos();
  const axios = useAxios();
  const queryClient = useQueryClient();

  const mutationFn = useCallback(async (payload:CompleteTodoPayload ) => {
    await axios.put(`${backendUrl}todo/toggle-complete/${payload.id}`, payload );
  }, [axios]);

  return useMutation({
    mutationFn,
    ...options,
    onSuccess(...args){
      //Get existing todo from cache
      const editedTodo = todos?.find((item) => item.id === args[1].id);
      // If that does not exists on cache, invalidate cache and call backend
      if(!editedTodo) {
        queryClient.invalidateQueries(['todos']);
      } else {
        // If todo exists on cache, simply change the data and set to cache again
        editedTodo.isCompleted = args[1].isCompleted;
        queryClient.setQueryData(['todos'], todos);
      }
      onSuccess?.(...args);
    },
    onError(...args){
      onError?.(...args);
    }
  })
}