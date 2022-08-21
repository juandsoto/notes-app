import { Switch } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useTheme } from "../context/theme";

const colors: string[] = ["#d63031", "#3b82f6", "#6c5ce7", "#fdcb6e", "#2d3436"];

const Config = () => {
  return (
    <div className="w-full">
      <section>
        <h1 className="text-2xl uppercase font-bold text-primary">Configuración</h1>
      </section>
      <section className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg capitalize text-secondary">Tema</h2>
          <div className="flex items-center gap-2">
            <span>Modo oscuro</span>
            <SwitchTheme />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg capitalize text-secondary">Colores</h2>
          <div className="flex items-center gap-4 w-full min-h-fit overflow-auto scrollbar-hidden">
            <span className="min-w-[150px]">Color principal</span>
            <div className="flex items-center gap-4 min-w-fit bg-main p-1 rounded-lg">
              {colors.map(color => (
                <ColorButton key={color} color={color} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 w-full min-h-fit overflow-auto scrollbar-hidden">
            <span className="min-w-[150px]">Color secundario</span>
            <div className="flex items-center gap-4 min-w-fit bg-main p-1 rounded-lg">
              {colors.map(color => (
                <ColorButton key={color} color={color} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ColorButtonProps {
  className?: React.HTMLAttributes<"button">["className"];
  color: string;
}

const ColorButton = ({ className, color }: ColorButtonProps) => {
  return (
    <button
      style={{ backgroundColor: color }}
      className={["w-6 h-6 rounded-full shadow-sm shadow-slate-800 ring ring-primary ring-offset-1", className].join(" ")}
    />
  );
};

const SwitchTheme = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return <Switch checked={theme === "dark"} onChange={changeTheme} />;
};

export default Config;
