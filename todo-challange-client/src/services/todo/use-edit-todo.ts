import { UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAxios } from "../../providers/axios-provider";
import { backendUrl } from "../config";

export interface EditTodoPayload {
  id: string;
  todo: string;
  executionDate: Date;
  groupIds?: string[] | undefined;
}

export const useEditTodo = (mutationOptions: UseMutationOptions<void, unknown, EditTodoPayload> = {}) => {
  const {onSuccess, onError, ...options} = mutationOptions;
  const axios = useAxios();
  const queryClient = useQueryClient();

  const mutationFn = useCallback(async (payload:EditTodoPayload) => {
    await axios.put(`${backendUrl}todo/${payload.id}`, payload );
  }, [axios]);

  return useMutation({
    mutationFn,
    ...options,
    onSuccess(...args){
      queryClient.invalidateQueries(['todos'])
      onSuccess?.(...args);
    },
    onError(...args){
      onError?.(...args);
    }
  })
}