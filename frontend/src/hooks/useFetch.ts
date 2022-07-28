import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { SERVER_URL } from "../constants";

interface Options {
  successMessage?: string;
}

interface Props {
  url: string;
  config?: RequestInit;
  options?: Options;
}

const useFetch = <T>({ url, config, options }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}${url}`, {
        method: "GET",
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

      if (response.status !== 200) {
        throw new Error(data.error);
      }

      toast.success(options?.successMessage || "Hecho");
      console.log({ data });
      setData(data);
    } catch (error: any) {
      toast.error(error.message as string);
      console.error(error);
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};

export default useFetch;
