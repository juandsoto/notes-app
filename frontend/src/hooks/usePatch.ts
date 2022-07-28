import { useState } from "react";
import { toast } from "react-hot-toast";
import { SERVER_URL } from "../constants";
interface Options {
  successMessage: string;
  onSuccess: () => void;
}

const usePatch = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const patch = async (url: string, config: RequestInit, options: Options) => {
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}${url}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...config?.headers,
        },
        ...config,
      });
      const data = await response.json();

      if (response.status === 500) {
        throw new Error("No pudimos archivar tu nota, intenta de nuevo");
      }
      if (response.status !== 200) {
        throw new Error(data.error);
      }
      if (options.successMessage.length) toast.success(options.successMessage);
      options.onSuccess();
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
    patch,
    loadingPatch: loading,
  };
};

export default usePatch;
