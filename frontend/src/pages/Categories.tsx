import { SERVER_URL } from "../constants";
import { useAuth } from "../context/auth/index";
import { CategorySchema } from "../types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Note from "../components/Note";
import Category from "../components/Category";

const Categories = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refetch, setRefetch] = useState<{ message: string }>({ message: "" });
  const [categories, setCategories] = useState<CategorySchema[]>([]);

  const refetchCategories = (message: string) => {
    setRefetch({ message });
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/categories`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.status !== 200) {
          throw new Error(data.error);
        }
        if (refetch.message) toast.success(refetch.message);
        setCategories(data);
        return;
      } catch (error: any) {
        toast.error(error.message as string);
        console.error(error);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [refetch]);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl uppercase font-bold text-primary mb-4 sm:mt-4 text-center sm:text-left">Tus Categorías</h2>
      <div className="">
        {isLoading && <span className="text-md">Cargando categorías</span>}
        {!categories.length && !isLoading && (
          <div className="flex flex-col gap-1">
            <span className="text-md">No tienes categorias</span>
            <span className="text-lg text-darkBlue">Las puedes crear al momento de crear tus notas</span>
          </div>
        )}
        <div className="flex justify-center sm:justify-start flex-wrap gap-6">
          {categories.map((category, i) => {
            return <Category key={category._id} {...category} index={i} {...{ refetchCategories }} loadingCategories={isLoading} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
