import { useNavigate, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import { routes } from "../router/routes";
import Button from "../components/common/Button";
import { useGSAP } from "@gsap/react";

interface TitleProps {
  children: string;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div className="absolute w-full mt-8">
      <p className="text-center text-4xl font-title linear-theme-text">{children}</p>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hidden, setHidden] = useState(false)
  const box = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const handleItemClick = (path: string) => {
    navigate(path);
  };
  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle("dark", checked);
    localStorage.setItem("theme", checked ? "dark" : "light");
  };

  return (
    <div className={`h-full w-sidebar border-r border-neutral-700 fade-in-enter transition-all bg-foreground`}>

      <div className="h-full flex flex-col items-center justify-center gap-8">
        <div className="flex justify-center bg-neutral-800/70 items-center rounded-2xl flex-col gap-12 px-2 py-4">
          {routes.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.id}
                className={`flex justify-center rounded-2xl w-12 h-12 cursor-pointer transition-all duration-500 ${isActive ? "linear-theme drop-shadow-xl" : "hover:scale-110 hover:bg-foreground"
                  }`}
                onClick={() => handleItemClick(item.path)}
              >
                <img
                  className={`transition-all duration-500 ${isActive ? "opacity-100" : "dark:opacity-30"
                    }`}
                  src={item.icon}
                  alt={item.label}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
