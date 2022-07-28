import { SERVER_URL } from "../constants";
import { useAuth } from "../context/auth/index";
import { NoteSchema } from "../types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Note from "../components/Note";
import { FcPlus } from "react-icons/fc";
import { AnimatePresence } from "framer-motion";
import NoteDetail from "../components/NoteDetail";
import { Link } from "react-router-dom";

const Notes = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refetch, setRefetch] = useState<{ message: string }>({ message: "" });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notes, setNotes] = useState<NoteSchema[]>([]);

  const refetchNotes = (message: string) => {
    setRefetch({ message });
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/notes`, {
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
        setNotes(data);
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl uppercase my-4 font-bold text-primary">Tus Notas</h2>
        <button>
          <Link to={`/notes/add`} className="flex gap-1 items-center px-2 py-1 rounded-md">
            <span className="text-green-700 text-md font-semibold">Agregar</span>
            <FcPlus size={30} />
          </Link>
        </button>
      </div>
      <div className="flex">
        {isLoading && <span className="text-md">Cargando notas</span>}
        {!notes.length && !isLoading && <span className="text-md">No tienes notas</span>}
        <div className="flex justify-center flex-wrap gap-6">
          {notes.map((note, i) => {
            return <Note key={note._id} {...note} index={i} {...{ setSelectedId, refetchNotes }} loadingNotes={isLoading} />;
          })}
        </div>
      </div>
      <AnimatePresence>
        {selectedId && (
          <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0">
            <NoteDetail {...{ selectedId, setSelectedId }} note={notes.find(note => note._id === selectedId) || ({} as NoteSchema)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notes;
