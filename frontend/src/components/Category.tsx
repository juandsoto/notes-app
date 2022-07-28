import { CategorySchema } from "../types";
import moment from "moment";
import "moment/locale/es";

import { AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import { useAuth } from "../context/auth/index";
import { DotLoader } from "react-spinners";
import useDelete from "../hooks/useDelete";

moment.locale("es");
interface Props extends CategorySchema {
  index: number;
  refetchCategories: (message: string) => void;
  loadingCategories: boolean;
}

const Category = (props: Props) => {
  const { _id, name, createdAt, index, refetchCategories, loadingCategories } = props;
  const { user } = useAuth();
  const { loadingDelete, remove } = useDelete();

  const removeCategory = async () => {
    const data = await remove(`/categories/${_id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    refetchCategories(`Categoría eliminada`);
  };

  return (
    <motion.div className="flex flex-1 shadow-lg shadow-slate-500/50 p-3 rounded-md min-w-[250px] max-w-[500px] bg-slate-50">
      <motion.div className="flex flex-col w-full">
        <span className="text-lg capitalize text-left">{name}</span>
        <div className="flex justify-between items-center gap-4">
          <span className="text-sm">Creada {moment(createdAt).fromNow()}</span>
          <div className="flex gap-2">
            {loadingDelete || loadingCategories ? (
              <DotLoader size={20} color="#3b82f6" />
            ) : (
              <>
                <AiFillDelete
                  className="cursor-pointer"
                  size={20}
                  color="crimson"
                  onClick={e => {
                    removeCategory();
                  }}
                />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Category;
