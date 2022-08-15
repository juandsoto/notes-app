import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SERVER_URL } from "../constants";
import { useAuth } from "../context/auth/index";

const useDelete = <Body>(path: string) => {
  const queryClient = useQueryClient();
  const {
    user: { token },
  } = useAuth();
  const mutation = useMutation(
    (body: Body) => {
      return remove(path, token);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["notes"]);
      },
    }
  );

  return mutation;
};

export const remove = async <Response>(path: string, token: string): Promise<Response> => {
  return axios
    .delete(`${SERVER_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data);
};

export default useDelete;
