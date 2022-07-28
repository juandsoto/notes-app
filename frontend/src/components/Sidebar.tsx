import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/index";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="flex sm:flex-col items-center p-2 sm:gap-y-10 bg-slate-50 rounded-xl">
      <div className="flex gap-2 sm:gap-4 items-center">
        <div className="w-[40%] max-w-[100px]">
          <img className="h-full w-full" src="https://cdn.worldvectorlogo.com/logos/notek.svg" alt="logo" />
        </div>
        <h1 className="text-xl font-bold xs-hidden sm:block">Notek</h1>
      </div>
      <div className="hidden sm:block text-lg uppercase">{user?.username}</div>
      <nav className="flex-1 sm:flex-0">
        <ul className="flex sm:flex-col justify-center items-center gap-2">
          <li>
            <Link to="/notes">Notas</Link>
          </li>
          <li>
            <Link to="/categories">Categorias</Link>
          </li>
          <li>
            <Link to="/archived">Archivo</Link>
          </li>
          <li>
            <Link to="/">Inicio</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
