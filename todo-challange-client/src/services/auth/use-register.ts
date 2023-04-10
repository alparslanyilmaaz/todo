import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";
import { backendUrl } from "../config";

interface PayloadUseRegister {
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
}

export const useRegister = (mutationOptions: UseMutationOptions<void, unknown, PayloadUseRegister> = {}) => {
const {onSuccess, onError, ...options} = mutationOptions;

  const mutationFn = useCallback( async (payload: PayloadUseRegister) => {
    const {data} = await axios.post<RegisterResponse>(`${backendUrl}users/register`, payload);
    if(data?.token){
      localStorage.setItem('token', data.token);
    }
  }, []);

  return useMutation({
    mutationFn,
    ...options,
    onSuccess(...args){
      onSuccess?.(...args);
    },
    onError(...args) {
      onError?.(...args);
    },
  });

}