import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { AiFillCloseCircle, AiFillTag } from "react-icons/ai";
import moment from "moment";
import { NoteSchema } from "../types";
import { FirstLetterToUppercase } from "../utils";

interface Props {
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
  note: NoteSchema;
}

const NoteDetail = (props: Props) => {
  const { selectedId, setSelectedId, note } = props;
  return (
    <motion.div
      className="flex flex-col gap-2 min-w-[90%] sm:min-w-[70%] lg:min-w-[60%] max-w-[90%] bg-main min-h-[50vh] z-10 shadow-md shadow-slate-500/50 dark:shadow-slate-900/50 rounded-xl p-4"
      layoutId={selectedId}
    >
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-start py-2 border-b border-darkBlue/20">
          <motion.h1 className="text-xl font-bold text-primary">{FirstLetterToUppercase(note.title)}</motion.h1>
          <AiFillCloseCircle className="cursor-pointer min-w-[30px]" onClick={() => setSelectedId(null)} size={30} color="#164ca3" />
        </div>
        <motion.p>{note.content || "Sin descripción"}</motion.p>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg capitalize text-darkBlue">categorías</h2>
          <div className="flex flex-wrap gap-2">
            {!note.categories.length ? (
              <span className="text-md">No está categorizada</span>
            ) : (
              note.categories.map((category, i) => {
                return (
                  <div key={category._id} className="flex items-center gap-2 border border-darkBlue px-1 rounded-md">
                    <AiFillTag size={20} color="#3b82f6" />
                    <span className="text-md capitalize">{category.name}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div>
          <span>¿Está archivado? {note.archived ? "Si" : "No"}</span>
        </div>
      </div>
      <div className="flex items-end justify-end sm:justify-between">
        <span className="text-primary/70 break-words hidden sm:block">{note._id}</span>
        <div className="flex flex-col self-end text-right whitespace-nowrap">
          <span>Actualizado {moment(note.updatedAt).fromNow()}</span>
          <span>Creado {moment(note.createdAt).fromNow()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteDetail;
