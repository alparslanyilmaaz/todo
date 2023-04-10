import { UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Group, IGroupDTO } from "../../models/group.model";
import { useAxios } from "../../providers/axios-provider";
import { backendUrl } from "../config";
import { useGetGroups } from "./use-get-groups";

export interface PostGroupPayload {
  color: string;
  name: string;
}

export const usePostGroup = (mutationOptions: UseMutationOptions<Group, unknown, PostGroupPayload> = {}) => {
  const {onSuccess, onError, ...options} = mutationOptions;
  const axios = useAxios();
  const {data: groups} = useGetGroups();
  const queryClient = useQueryClient();

  const mutationFn = useCallback(async (payload: PostGroupPayload) => {
    const {data} = await axios.post<IGroupDTO>(`${backendUrl}group`, payload);
    return new Group(data);
  }, [axios]);

  return useMutation({
    mutationFn,
    ...options,
    onSuccess(...args){
      // Set cache by adding new group
      queryClient.setQueryData(['groups'], groups?.length ? [...groups, args[0]]: [args[0]]);
      onSuccess?.(...args);
    },
    onError(...args){
      onError?.(...args);
    }
  })
}