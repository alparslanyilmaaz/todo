import { UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAxios } from "../../providers/axios-provider";
import { backendUrl } from "../config";

export const useDeleteTodo = (mutationOptions: UseMutationOptions<void, unknown, {}> = {}) => {
  const {onSuccess, onError, ...options} = mutationOptions;

  const axios = useAxios();
  const queryClient = useQueryClient();

  const mutationFn = useCallback(async (id: string) => {
    await axios.delete(`${backendUrl}todo/${id}`);
  }, [axios]);

  return useMutation({
    mutationFn,
    ...options,
    onSuccess(...args){
      queryClient.invalidateQueries(['todos']);
      onSuccess?.(...args);
    },
    onError(...args){
      onError?.(...args);
    }
  })
}