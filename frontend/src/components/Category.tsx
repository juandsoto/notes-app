import moment from "moment";
import "moment/locale/es";
import { motion } from "framer-motion";
import { DotLoader } from "react-spinners";
import { AiFillDelete } from "react-icons/ai";

import { CategorySchema } from "../types";
import useDelete from "../hooks/useDelete";
import toast from "react-hot-toast";
import { Tooltip } from "react-tippy";

moment.locale("es");
interface Props extends CategorySchema {
  index: number;
  loadingCategories: boolean;
}

const Category = (props: Props) => {
  const { _id, name, createdAt, loadingCategories } = props;
  const { mutate: remove, isLoading: isLoadingRemove } = useDelete(`/categories/${_id}`);

  return (
    <motion.div className="flex flex-1 shadow-md shadow-slate-500/50 dark:shadow-slate-900/50 p-3 rounded-md min-w-[250px] max-w-[500px] bg-main">
      <motion.div className="flex flex-col w-full">
        <span className="text-lg capitalize text-left">{name}</span>
        <div className="flex justify-between items-center gap-4">
          <span className="text-sm">Creada {moment(createdAt).fromNow()}</span>
          <div className="flex gap-2">
            {isLoadingRemove || loadingCategories ? (
              <DotLoader size={20} color="#3b82f6" />
            ) : (
              /* @ts-ignore */
              <Tooltip title="Eliminar" position="right-start">
                <AiFillDelete
                  className="cursor-pointer"
                  size={20}
                  color="crimson"
                  onClick={e => {
                    remove(
                      {},
                      {
                        onSuccess: () => {
                          toast.success("Categoría eliminada");
                        },
                      }
                    );
                  }}
                />
              </Tooltip>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Category;
