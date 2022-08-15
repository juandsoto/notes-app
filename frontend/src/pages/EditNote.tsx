import * as Yup from "yup";
import { useFormik } from "formik";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { AiFillTag } from "react-icons/ai";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/auth/index";
import usePatch from "../hooks/usePatch";
import { NoteSchema } from "../types";
import useDelete from "../hooks/useDelete";

const EditNote = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const note = state as Pick<NoteSchema, "title" | "categories" | "content">;
  const [category, setCategory] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const { mutate: updateNote, isLoading: isLoadingUpdateNote } = usePatch(`/notes/${id}`);
  // const { loadingDelete, remove } = useDelete();

  // const removeCategory = async (name: string) => {
  //   if (!note.categories.map(c => c.name).includes(name)) return;

  //   const id = note.categories.find(c => c.name === name)?.noteCategories._id;

  //   const data = await remove(
  //     `/noteCategories/${id}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //         "Content-Type": "application/json",
  //       },
  //     },
  //     { successMessage: "Categoría eliminada" }
  //   );
  // };

  const formik = useFormik({
    initialValues: { title: note.title, content: note.content, categories: note.categories.map(c => c.name) },
    onSubmit: values =>
      updateNote(values, {
        onSuccess: () => {
          formik.setValues({ title: "", content: "", categories: [] });
          setCategory("");
          toast.success("Nota actualizada");
          navigate(-1);
        },
      }),
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Requerido").min(3, "Requiere mas de 3 caractéres").max(40, "Requiere menos de 40 caractéres"),
      content: Yup.string(),
      categories: Yup.array(Yup.string()),
    }),
  });
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="bg-slate-50 min-w-[90%] md:min-w-[80%] lg:min-w-[70%] 2xl:min-w-[60%] max-w-[700px] min-h-[60%] px-4 py-6 sm:px-8 sm:py-12 rounded-lg shadow-xl shadow-slate-500/50">
        <div className="flex-1 flex flex-col items-center justify-start gap-8">
          <h1 className="text-2xl">!Edita tu nota!</h1>
          <form className="flex flex-col gap-4 min-w-[100%] sm:min-w-[80%]" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Titulo</label>
              <input type="text" name="title" placeholder="Mi nota" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.title} />
              {formik.touched.title && formik.errors.title && <span className="text-red-600">{formik.errors.title}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="content">Descripción</label>
              <textarea placeholder="opcional" name="content" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.content} />
              {formik.touched.content && formik.errors.content && <span className="text-red-600">{formik.errors.content}</span>}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="category">Categorías</label>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <input placeholder="software" name="category" onBlur={formik.handleBlur} onChange={e => setCategory(e.target.value)} value={category} />
                    <button
                      className="bg-darkBlue py-1 px-2 text-slate-50"
                      type="button"
                      onClick={() => {
                        if (formik.values.categories.includes(category)) {
                          setCategoryError("Ya está incluida");
                          return;
                        }

                        if (category.length <= 2) {
                          setCategoryError("Requiere mas de 2 caractéres");
                          return;
                        }

                        formik.values.categories.push(category.toLowerCase());
                        setCategory("");
                        setCategoryError("");
                      }}
                    >
                      Agregar
                    </button>
                  </div>
                  {categoryError && <span className="text-red-600">{categoryError}</span>}
                </div>
                <div className="flex gap-1 flex-wrap">
                  {formik.values.categories?.map(category => {
                    return (
                      <div key={category} className="flex items-center gap-2 border border-darkBlue px-1 rounded-md">
                        <AiFillTag size={20} color="#3b82f6" />
                        <button
                          type="button"
                          onClick={e => {
                            formik.setValues(prev => ({
                              ...prev,
                              categories: prev.categories.filter(c => c !== e.currentTarget.innerText.toLowerCase()),
                            }));
                            // removeCategory(e.currentTarget.innerText.toLowerCase());
                          }}
                          className="text-md capitalize hover:text-red-600 cursor-pointer"
                        >
                          {category}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <button
              className="text-lg mt-2 border border-blue-500 bg-blue-500 py-2 px-4 hover:bg-opacity-90 transition-colors"
              type="submit"
              disabled={isLoadingUpdateNote}
            >
              {isLoadingUpdateNote ? <BeatLoader size={10} color="#164ca3" /> : "Actualizar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
