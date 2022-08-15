import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { NoteSchema } from "../types";
import Note from "../components/Note";
import NoteDetail from "../components/NoteDetail";
import { debounce } from "lodash";
import useFetch from "../hooks/useFetch";

const ArchivedNotes = () => {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: notes = [], isLoading } = useFetch<NoteSchema[]>(["archivedNotes"], "/notes/archived");

  const filteredNotes: NoteSchema[] = useMemo(
    () => notes?.filter(n => n.categories.some(c => c.name === category || category === "")).filter(note => note.title.toLowerCase().includes(search)),
    [notes, search, category]
  );
  const categories: string[] = useMemo(
    () => [
      ...new Set(
        notes
          ?.map(n => n.categories.map(c => c.name))
          .flat()
          .sort((a, b) => 0 - (a > b ? -1 : 1))
      ),
    ],
    [notes]
  );

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase());

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl uppercase font-bold text-primary mb-4 sm:mt-4 text-center sm:text-left">Tus Notas Archivadas</h2>
      <div className="flex items-center justify-end sm:justify-end mb-4 gap-2 flex-wrap">
        <input
          className="border-none bg-transparent border-l-2 border-darkBlue"
          type="text"
          onChange={debounce(onChangeSearch, 300)}
          placeholder="Filtra por nombre"
          aria-label="controlled"
        />
        <select className="bg-primary text-white cursor-pointer" onChange={e => setCategory(e.target.value)} name="category" id="category">
          <option className=" cursor-pointer" value="">
            Todas
          </option>
          {categories.map((c, i) => (
            <option className="capitalize cursor-pointer" key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <div className="text-center text-md sm:text-left">
          {isLoading && <span>Cargando notas archivadas</span>}
          {!filteredNotes.length && !isLoading && <span>No tienes notas archivadas</span>}
        </div>
        <div className="flex justify-center flex-wrap gap-6">
          {filteredNotes.map((note, i) => {
            return <Note key={note._id} {...note} index={i} {...{ setSelectedId }} loadingNotes={isLoading} />;
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

export default ArchivedNotes;
