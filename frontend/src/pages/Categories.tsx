import { PulseLoader } from "react-spinners";
import Category from "../components/Category";
import useFetch from "../hooks/useFetch";
import { CategorySchema } from "../types";

const Categories = () => {
  const { data: categories = [], isLoading } = useFetch<CategorySchema[]>(["categories"], "/categories");

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl uppercase font-bold text-primary mb-4 sm:mt-4 text-center sm:text-left">Tus Categorías</h2>
      <div className="">
        <div className="text-center text-md sm:text-left">
          {isLoading && (
            <div className="flex gap-2 items-center text-sm">
              <span>Cargando</span>
              <PulseLoader className="pt-1" color="#3b82f6" size={8} />
            </div>
          )}
          {!categories.length && !isLoading && (
            <div className="flex flex-col gap-1">
              <span>No tienes categorias</span>
              <span className="text-lg text-darkBlue">Las puedes crear al momento de crear tus notas</span>
            </div>
          )}
        </div>
        <div className="flex justify-center flex-wrap gap-6">
          {categories.map((category, i) => {
            return <Category key={category._id} {...category} index={i} loadingCategories={isLoading} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
