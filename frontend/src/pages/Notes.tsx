import { SERVER_URL } from "../constants";
import { useAuth } from "../context/auth/index";
import { NoteSchema } from "../types";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import Note from "../components/Note";
import { FcPlus } from "react-icons/fc";
import { AnimatePresence } from "framer-motion";
import NoteDetail from "../components/NoteDetail";
import { Link } from "react-router-dom";

const Notes = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [refetch, setRefetch] = useState<{ message: string }>({ message: "" });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notes, setNotes] = useState<NoteSchema[]>([]);

  const filteredNotes: NoteSchema[] = useMemo(
    () => notes?.filter(n => n.categories.some(c => c.name === category || category === "")).filter(note => note.title.toLowerCase().startsWith(search)),
    [notes, search, category]
  );
  const categories: string[] = useMemo(() => [...new Set(notes?.map(n => n.categories.map(c => c.name)).flat())], [notes]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase());

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
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-4 sm:mt-4 gap-2">
        <h2 className="text-2xl uppercase font-bold text-primary text-center sm:text-left">Tus Notas</h2>
        <button>
          <Link to={`/notes/add`} className="flex gap-1 items-center px-2 py-1 rounded-md">
            <span className="text-green-700 text-md font-semibold">Agregar</span>
            <FcPlus size={30} />
          </Link>
        </button>
      </div>
      <div className="flex items-center justify-end sm:justify-end mb-4 gap-2 flex-wrap">
        <input
          className="border-none bg-transparent border-l-2 border-darkBlue"
          type="text"
          onChange={debounce(onChangeSearch, 300)}
          placeholder="Filtra por nombre"
          aria-label="controlled"
        />
        <select className="bg-primary text-white cursor-pointer" onChange={e => setCategory(e.target.value)} name="category" id="category">
          <option className="cursor-pointer" value="">
            Todas
          </option>
          {categories.map((c, i) => (
            <option className="cursor-pointer capitalize" key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="text-center text-md sm:text-left">
          {isLoading && <span>Cargando notas</span>}
          {!filteredNotes.length && !isLoading && <span>No tienes notas</span>}
        </div>
        <div className="flex justify-center flex-wrap gap-6">
          {filteredNotes.map((note, i) => {
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
