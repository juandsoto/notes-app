import { Dispatch, SetStateAction } from "react";
import { BsArchiveFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import moment from "moment";
import "moment/locale/es";
import { AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { NoteSchema } from "../types";
import usePatch from "../hooks/usePatch";
import useDelete from "../hooks/useDelete";
import { FirstLetterToUppercase } from "../utils";
import { Tooltip } from "react-tippy";

moment.locale("es");
interface Props extends NoteSchema {
  index: number;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
  loadingNotes: boolean;
}

const Note = (props: Props) => {
  const { _id, title, categories, content, archived, updatedAt, setSelectedId, loadingNotes } = props;
  const navigate = useNavigate();
  const { mutate: toggleArchived, isLoading: isLoadingToggleArchived } = usePatch(`/notes/${_id}`);
  const { mutate: remove, isLoading: isLoadingRemove } = useDelete(`/notes/${_id}`);

  return (
    <motion.button
      disabled={isLoadingToggleArchived || isLoadingRemove || loadingNotes}
      layoutId={_id}
      className="flex flex-1 shadow-lg shadow-slate-500/50 p-3 rounded-md min-w-[270px] sm:min-w-[300px] max-w-[500px] bg-slate-50"
      onClick={() => setSelectedId(_id)}
    >
      <motion.div className="flex flex-col w-full">
        <span className="text-lg text-left">{FirstLetterToUppercase(title)}</span>
        <div className="flex justify-between items-center gap-4">
          <span className="text-sm text-left">Actualizada {moment(updatedAt).fromNow()}</span>
          <div className="flex gap-2 justify-center items-center">
            {isLoadingToggleArchived || isLoadingRemove || loadingNotes ? (
              <DotLoader size={20} color="#3b82f6" />
            ) : (
              <>
                {/* @ts-ignore */}
                <Tooltip title={archived ? "Desarchivar" : "Archivar"} position="right-start">
                  <BsArchiveFill
                    onClick={e => {
                      e.stopPropagation();
                      toggleArchived(
                        { archived: !archived },
                        {
                          onSuccess: () => {
                            toast.success(`Nota ${archived ? "desarchivada" : "archivada"}`);
                          },
                        }
                      );
                    }}
                    size={20}
                    className="cursor-pointer"
                    color="green"
                  />
                </Tooltip>
                {/* @ts-ignore */}
                <Tooltip title="Editar" position="right-start">
                  <FaEdit
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/notes/edit/${_id}`, { state: { title, categories, content } });
                    }}
                    className="cursor-pointer ml-1"
                    size={20}
                    color="#3b82f6"
                  />
                </Tooltip>
                {/* @ts-ignore */}
                <Tooltip title="Eliminar" position="right-start">
                  <AiFillDelete
                    size={20}
                    color="crimson"
                    className="cursor-pointer"
                    onClick={e => {
                      e.stopPropagation();
                      remove(
                        { a: 1 },
                        {
                          onSuccess: () => {
                            toast.success(`Nota eliminada`);
                          },
                        }
                      );
                    }}
                  />
                </Tooltip>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.button>
  );
};

export default Note;
