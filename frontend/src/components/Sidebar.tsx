import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { useAuth } from "../context/auth/index";
import { BsFillGearFill } from "react-icons/bs";

interface Link {
  to: string;
  title?: string;
  icon?: JSX.Element;
}

const links: Link[] = [
  { to: "/notes", title: "Notas" },
  { to: "/categories", title: "Categorías" },
  { to: "/archived", title: "Archivo" },
  { to: "/notes/add", title: "Agregar Nota" },
  { to: "/config", icon: <BsFillGearFill /> },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState<boolean>(false);
  const linkClassName = "bg-primary scale-110";
  return (
    <div className="relative flex sm:h-full sm:flex-col items-center justify-between sm:justify-start p-2 sm:gap-y-10  rounded-xl">
      <div className="flex gap-2 sm:gap-4 items-center">
        <div className="w-[20%] sm:w-[40%] max-w-[100px]">
          <img className="h-full w-full" src="https://cdn.worldvectorlogo.com/logos/notek.svg" alt="logo" />
        </div>
        <h1 className="hidden sm:block text-xl font-bold">Notek</h1>
        <h2 className="sm:hidden text-md text-center font-bold uppercase py-2 px-3 rounded-lg text-darkBlue">{user?.username}</h2>
      </div>
      <div className="hidden text-center sm:flex text-md md:text-lg uppercase bg-darkBlue py-2 px-3 rounded-lg text-slate-50">{user?.username}</div>
      {!open ? (
        <GiHamburgerMenu onClick={() => setOpen(true)} className="sm:hidden mr-2 cursor-pointer" size={30} color="#3b82f6" />
      ) : (
        <CgClose onClick={() => setOpen(false)} className="sm:hidden mr-2 cursor-pointer" size={30} color="#3b82f6" />
      )}
      <nav className="hidden flex-1 sm:flex justify-center">
        <ul className="flex flex-col sm:flex-col justify-center text-center sm:justify-start items-center gap-4">
          {links.map(({ to, title, icon }) => (
            <li key={title} className={["py-1 px-2 rounded-xl hover:scale-95 transition-all", pathname === to ? linkClassName : ""].join(" ")}>
              <Link to={to} className="flex gap-1 items-center">
                {icon}
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className="hidden sm:block text-sm sm:text-lg sm:mb-6 font-bold text-slate-50" onClick={logout}>
        <Link to="/" replace={true} className="bg-red-600 py-2 px-4 rounded-xl hover:bg-red-600/90 uppercase">
          Salir
        </Link>
      </button>
      {open && (
        <div className="sm:hidden text-sm flex flex-col gap-4 py-4 px-2 absolute right-0 bottom-[80%] bg-slate-50 rounded-lg">
          <nav className="justify-center">
            <ul className="flex flex-col justify-center sm:justify-start items-center gap-2">
              {links.map(({ to, title }) => (
                <li key={to} className={["py-1 px-2 rounded-xl hover:underline transition-all", pathname === to ? linkClassName : ""].join(" ")}>
                  <Link to={to}>{title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            onClick={logout}
            to="/"
            replace={true}
            className="text-center mb-4 font-bold text-slate-50 bg-red-600 py-2 px-4 rounded-xl hover: bg-red-600/90 uppercase"
          >
            Salir
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
