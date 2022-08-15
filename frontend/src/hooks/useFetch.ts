import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "../constants";
import { useAuth } from "../context/auth/index";

const useFetch = <Response>(key: string[], path: string) => {
  const {
    user: { token },
  } = useAuth();
  return useQuery(key, () => get<Response>(path, token));
};

export const get = async <Response>(path: string, token: string): Promise<Response> => {
  return axios
    .get(`${SERVER_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data);
};

export default useFetch;
