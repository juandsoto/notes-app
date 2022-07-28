import { useState } from "react";
import { toast } from "react-hot-toast";
import { SERVER_URL } from "../constants";
const useDelete = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const remove = async (url: string, config?: RequestInit) => {
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...config?.headers,
        },
        ...config,
      });
      const data = await response.json();

      console.log({ status: response.status });

      if (response.status === 500) {
        throw new Error("No pudimos eliminar tu nota, intenta de nuevo");
      }
      if (response.status !== 200) {
        throw new Error(data.error);
      }

      return {
        data,
      };
    } catch (error: any) {
      toast.error(error.message as string);
      console.error(error);
      return;
    } finally {
      setLoading(false);
    }
  };

  return {
    remove,
    loadingDelete: loading,
  };
};

export default useDelete;
