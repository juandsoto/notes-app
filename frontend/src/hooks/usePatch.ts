import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SERVER_URL } from "../constants";
import { useAuth } from "../context/auth/index";

const usePatch = <Body>(path: string) => {
  const queryClient = useQueryClient();
  const {
    user: { token },
  } = useAuth();
  const mutation = useMutation(
    (body: Body) => {
      return patch(path, body, token);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["notes"]);
      },
    }
  );

  return mutation;
};

export const patch = async <Body>(path: string, body: Body, token: string): Promise<any> => {
  return axios
    .patch(`${SERVER_URL}${path}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => res.data);
};

export default usePatch;
