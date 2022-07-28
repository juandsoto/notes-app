import React, { Dispatch, SetStateAction } from "react";
import { NoteSchema } from "../types";
import { BsArchiveFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import moment from "moment";
import "moment/locale/es";

import { AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import usePatch from "../hooks/usePatch";
import { useAuth } from "../context/auth/index";
import { DotLoader } from "react-spinners";
import useDelete from "../hooks/useDelete";
import { Link, useNavigate } from "react-router-dom";
moment.locale("es");
interface Props extends NoteSchema {
  index: number;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
  refetchNotes: (message: string) => void;
  loadingNotes: boolean;
}

const Note = (props: Props) => {
  const { _id, title, categories, content, archived, updatedAt, index, setSelectedId, refetchNotes, loadingNotes } = props;
  const { user } = useAuth();
  const navigate = useNavigate();
  const { loadingPatch, patch } = usePatch();
  const { loadingDelete, remove } = useDelete();
  const toggleArchived = async () => {
    const data = await patch(`/notes/${_id}`, {
      body: JSON.stringify({ archived: !archived }),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    refetchNotes(`Nota ${archived ? "desarchivada" : "archivada"}`);
  };

  const removeNote = async () => {
    const data = await remove(`/notes/${_id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    refetchNotes(`Nota eliminada`);
  };

  return (
    <motion.button
      disabled={loadingPatch || loadingDelete || loadingNotes}
      layoutId={_id}
      className="flex flex-1 shadow-lg shadow-slate-500/50 p-3 rounded-md min-w-[300px] max-w-[500px] bg-slate-50"
      onClick={() => setSelectedId(_id)}
    >
      <motion.div className="flex flex-col w-full">
        <span className="text-lg capitalize text-left">{title}</span>
        <div className="flex justify-between items-center gap-4">
          <span className="text-sm text-left">Actualizada {moment(updatedAt).fromNow()}</span>
          <div className="flex gap-2">
            {loadingPatch || loadingDelete || loadingNotes ? (
              <DotLoader size={20} color="#3b82f6" />
            ) : (
              <>
                <BsArchiveFill
                  onClick={e => {
                    e.stopPropagation();
                    toggleArchived();
                  }}
                  size={20}
                  className="cursor-pointer"
                  color="green"
                />
                <FaEdit
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/notes/edit/${_id}`, { state: { title, categories, content } });
                  }}
                  className="cursor-pointer"
                  size={20}
                  color="#3b82f6"
                />
                <AiFillDelete
                  size={20}
                  color="crimson"
                  className="cursor-pointer"
                  onClick={e => {
                    e.stopPropagation();
                    removeNote();
                  }}
                />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.button>
  );
};

export default Note;
