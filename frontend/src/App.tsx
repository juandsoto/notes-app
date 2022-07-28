import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Wave from "./assets/images/wave.svg";

function App() {
  return (
    <>
      <main
        className="relative min-h-[100vh]"
        style={{
          backgroundImage: `url(${Wave})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="z-50 fixed bg-slate-50 rounded-2xl sm:rounded-r-2xl left-2 bottom-2 right-2 sm:left-0 sm:bottom-0 sm:top-0 sm:right-[80%] sm:col-span-3 xl:col-span-2 shadow-xl sm:shadow-md shadow-slate-500/50">
          <Sidebar />
        </div>
        <div className="relative flex sm:ml-[20%] min-h-[100vh] p-2">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
