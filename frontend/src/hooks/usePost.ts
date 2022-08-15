import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SERVER_URL } from "../constants";
import { useAuth } from "../context/auth";

const usePost = <Body>(path: string) => {
  const queryClient = useQueryClient();
  const {
    user: { token },
  } = useAuth();
  const mutation = useMutation(
    (body: Body) => {
      return post(path, body, token);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["notes"]);
      },
    }
  );

  return mutation;
};

export const post = async <Body>(path: string, body: Body, token: string): Promise<any> => {
  const headers: { Authotization: string } | {} = token.length ? { Authorization: `Bearer ${token}` } : {};

  return axios
    .post(`${SERVER_URL}${path}`, body, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    })
    .then(res => res.data);
};

export default usePost;
