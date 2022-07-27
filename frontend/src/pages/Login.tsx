import { useFormik } from "formik";
import * as Yup from "yup";
import { BeatLoader } from "react-spinners";
import { LoginType } from "../types";
import { SERVER_URL } from "../constants";
import { useAuth } from "../context/auth/index";
import { Link, useNavigate } from "react-router-dom";
import Wave from "../assets/images/wave.svg";
import { BsArrowLeftShort } from "react-icons/bs";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const login = async (user: LoginType) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.error);
      }
      setUser(data);
      navigate("/notes", { replace: true });
      return;
    } catch (error: any) {
      toast.error(error.message as string);
      console.error(error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<LoginType>({
    initialValues: { email: "", password: "" },
    onSubmit: values => login(values),
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Email inválido").required("Requerido"),
      password: Yup.string().required("Requerido").min(6, "Requiere mas de 6 caractéres"),
    }),
  });

  return (
    <main
      className="relative flex items-center justify-center h-[100vh] w-[100vw]"
      style={{ backgroundImage: `url(${Wave})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "bottom" }}
    >
      <div className="relative flex bg-slate-50 min-w-[90%] md:min-w-[70%] lg:min-w-[50%] 2xl:min-w-[40%] min-h-[60%] px-8 py-12 rounded-lg shadow-xl shadow-slate-500/50">
        <div className="absolute top-[-20px] left-[50%] translate-y-[-50%] translate-x-[-50%]  max-w-[100px]">
          <img className="h-full w-full" src="https://cdn.worldvectorlogo.com/logos/notek.svg" alt="logo" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-start gap-8">
          <h1 className="text-2xl font-bol">¡Ingresa Ahora!</h1>
          <form className="flex flex-col gap-4 min-w-[80%]" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="test@test.com"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && <span className="text-red-600">{formik.errors.email}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
              {formik.touched.password && formik.errors.password && <span className="text-red-600">{formik.errors.password}</span>}
            </div>
            <button
              className="text-lg mt-2 border border-blue-500 bg-blue-500 py-2 px-4 hover:bg-opacity-90 transition-colors"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {isLoading ? <BeatLoader size={10} color="#164ca3" /> : "Entrar"}
            </button>
          </form>
        </div>
      </div>
      <button className="fixed top-2 left-2 rounded-md bg-blue-500">
        <Link to="/" className="flex items-center py-1 px-2">
          <BsArrowLeftShort size={25} />
          <span>Volver</span>
        </Link>
      </button>
    </main>
  );
};

export default Login;
