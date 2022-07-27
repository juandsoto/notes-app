import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/index";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center p-2 gap-y-10">
      <div className="flex gap-4 items-center">
        <div className="w-[40%] max-w-[100px]">
          <img className="h-full w-full" src="https://cdn.worldvectorlogo.com/logos/notek.svg" alt="logo" />
        </div>
        <h1 className="text-xl font-bold">Notek</h1>
      </div>
      <div className="text-lg uppercase">{user?.username}</div>
      <nav>
        <ul className="flex flex-col items-center gap-2">
          <li>
            <Link to="/notes">Notas</Link>
          </li>
          <li>
            <Link to="/categories">Categorias</Link>
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
