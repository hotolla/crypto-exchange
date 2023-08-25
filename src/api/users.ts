import { AxiosRequestConfig } from 'axios';
import { api } from './api';
import {ILoginData} from "@/api/auth";

export const fetchUsers = (config?: AxiosRequestConfig) => {
  api.post('/login', config).then(({ data }) => {
    return data;
  });
};