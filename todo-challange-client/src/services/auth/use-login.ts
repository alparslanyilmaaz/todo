import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from 'axios';
import { backendUrl } from "../config";

export interface PayloadLogin {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const useLogin = (mutationOptions: UseMutationOptions<void, unknown, PayloadLogin> = {})  => {
  const {onSuccess, onError , ...options} = mutationOptions;

  const mutationFn = async (payload: PayloadLogin) => {
    const {data} = await axios.post<LoginResponse>(`${backendUrl}users/login`, payload);
    if(data?.token){
      localStorage.setItem('token', data.token);
    }
  }

  return useMutation({
    mutationFn,
    ...options,
    onSuccess(...args){
      onSuccess?.(...args);
    },
    onError(...args) {
      onError?.(...args);
    },
  })
}