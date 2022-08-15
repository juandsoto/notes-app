import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { FcPlus } from "react-icons/fc";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { NoteSchema } from "../types";
import Note from "../components/Note";
import NoteDetail from "../components/NoteDetail";
import useFetch from "../hooks/useFetch";

const Notes = () => {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: notes = [], isLoading } = useFetch<NoteSchema[]>(["notes"], "/notes");

  const filteredNotes: NoteSchema[] = useMemo(
    () => notes?.filter(n => n?.categories?.some(c => c.name === category || category === "")).filter(note => note?.title?.toLowerCase().includes(search)),
    [notes, search, category]
  );
  const categories: string[] = useMemo(
    () => [
      ...new Set(
        notes
          ?.map(n => n?.categories?.map(c => c.name))
          .flat()
          .sort((a, b) => 0 - (a > b ? -1 : 1))
      ),
    ],
    [notes]
  );

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase());

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
      {isLoading && (
        <div className="flex gap-2 items-center text-sm">
          <span>Cargando</span>
          <PulseLoader className="pt-1" color="#3b82f6" size={8} />
        </div>
      )}
      {!filteredNotes.length && !isLoading && (
        <div className="text-center text-md sm:text-left">
          <span>No tienes notas</span>
          <div className="flex gap-2 items-center">
            <Link to="/notes/add">
              <span className="text-lg text-darkBlue underline">¡Comienza creando una!</span>
            </Link>
          </div>
        </div>
      )}
      <div className="flex justify-center flex-wrap gap-6">
        {filteredNotes.map((note, i) => {
          return <Note key={note._id} {...note} index={i} {...{ setSelectedId }} loadingNotes={isLoading} />;
        })}
      </div>
      <AnimatePresence>
        {selectedId && (
          <div className="flex items-center justify-center fixed top-0 bottom-0 left-0 sm:left-[20%] right-0">
            <NoteDetail {...{ selectedId, setSelectedId }} note={notes.find(note => note._id === selectedId) || ({} as NoteSchema)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notes;
