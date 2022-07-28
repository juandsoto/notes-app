import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { SERVER_URL } from "../constants";

interface Options {
  successMessage?: string;
}

const usePost = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const post = async (url: string, config?: RequestInit, options?: Options) => {
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...config?.headers,
        },
        ...config,
      });
      const data = await response.json();

      if (response.status === 500) {
        throw new Error("No pudimos guardar tu nota, intenta de nuevo");
      }

      if (response.status !== 201) {
        throw new Error(data.error);
      }

      toast.success(options?.successMessage || "Hecho");

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
    post,
    loading,
  };
};

export default usePost;
