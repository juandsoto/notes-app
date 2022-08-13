import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { AiFillCloseCircle, AiFillTag } from "react-icons/ai";
import { NoteSchema } from "../types";
import moment from "moment";
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
      className="flex flex-col gap-2 min-w-[90vw] sm:min-w-[70vw] lg:min-w-[60vw] 2xl:min-w-[40vw] min-h-[50vh] z-10 bg-slate-50 shadow-xl shadow-slate-500/50 rounded-xl p-4"
      layoutId={selectedId}
    >
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-center py-2 border-b border-darkBlue/20">
          <motion.h1 className="text-xl font-bold text-primary">{FirstLetterToUppercase(note.title)}</motion.h1>
          <AiFillCloseCircle className="cursor-pointer" onClick={() => setSelectedId(null)} size={30} color="#164ca3" />
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
