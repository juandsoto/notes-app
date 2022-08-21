import { Link } from "react-router-dom";
import Wave from "../assets/images/wave.svg";

const Welcome = () => {
  return (
    <main
      className="flex items-center justify-center h-[100vh] w-[100vw]"
      style={{ backgroundImage: `url(${Wave})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "bottom" }}
    >
      <div className="relative flex bg-main min-w-[90%] max-w-[90%] md:min-w-[70%] lg:min-w-[50%] 2xl:min-w-[40%] min-h-[60%] px-8 py-12 rounded-lg shadow-md shadow-slate-500/50 dark:shadow-slate-900/50">
        <div className="absolute top-[-20px] left-[50%] translate-y-[-50%] translate-x-[-50%]  max-w-[100px]">
          <img className="h-full w-full" src="https://cdn.worldvectorlogo.com/logos/notek.svg" alt="logo" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
          <h1 className="text-2xl">Bienvenid@ a Notek</h1>
          <div className="flex items-center gap-2 flex-wrap justify-center text-lg">
            <button className="text-lg mt-2 border border-blue-500 bg-blue-500 py-2 px-4 hover:bg-opacity-90 transition-colors">
              <Link to="/signup">Regístrate</Link>
            </button>
            <span>para tomar tus notas</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center text-lg">
            <span>Si ya tienes una cuenta</span>
            <button className="text-lg mt-2 border border-blue-500 bg-blue-500 py-2 px-4 hover:bg-opacity-90 transition-colors">
              <Link to="/signin">Ingresa</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
