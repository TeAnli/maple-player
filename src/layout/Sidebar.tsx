import { useNavigate, useLocation } from "react-router";
import { routes } from "../router/routes";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bg-forgeground h-screen w-[120px]">
      <div className="flex flex-col gap-8 items-center mt-24">
        {routes.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.id}
              className={`flex justify-center rounded-2xl w-12 h-12 cursor-pointer transition-all duration-300 ${isActive
                ? "bg-gradient-to-b from-secondary to-primary"
                : "hover:bg-hover-primary hover:scale-110"
                }`}
              onClick={() => handleItemClick(item.path)}
            >
              <img
                className={`transition-all duration-500 ${isActive ? "opacity-100" : "opacity-30"
                  }`}
                src={item.icon}
                alt={item.label}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
