import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Wave from "./assets/images/wave.svg";

function App() {
  return (
    <>
      <main
        className="relative min-h-[100vh]"
        style={{ backgroundImage: `url(${Wave})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "bottom" }}
      >
        <div className="fixed bg-slate-50 rounded-r-2xl left-2 bottom-2 right-2 sm:left-0 sm:bottom-0 sm:top-0 sm:right-[80%] sm:col-span-3 xl:col-span-2 shadow-md shadow-slate-500/50">
          <Sidebar />
        </div>
        <div className="sm:ml-[20%] p-2">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
