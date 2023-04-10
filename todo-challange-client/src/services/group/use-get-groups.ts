import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { Group, IGroupDTO } from "../../models/group.model";
import { useAxios } from "../../providers/axios-provider";
import { backendUrl } from "../config";

export const useGetGroups = () => {
  const axios = useAxios();

  const queryFn = useCallback(async () => {
    const { data } = await axios.get<IGroupDTO[]>(`${backendUrl}group`);
    return data.map((item) => new Group(item));
  }, [axios]);

  return useQuery({
    queryKey: ['groups'],
    queryFn,
    enabled: !!axios
  })
}