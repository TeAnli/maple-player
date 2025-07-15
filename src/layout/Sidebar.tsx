import { useNavigate, useLocation } from "react-router";
import { routes } from "../utils/router/routes";
import { Box, Flex } from "@radix-ui/themes";

interface TitleProps {
  children: string;
}
const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Box position="absolute" width="100%" mt="8">
      <p className="text-center text-4xl font-title linear-theme-text drop-shadow-2xl">{children}</p>
    </Box>
  )
}
const Sidebar: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (path: string) => {
    navigate(path);
  };
  return (
    <Box position="fixed" height="100vh" className="bg-forgeground w-sidebar">
      <Title>Maple</Title>
      <Flex height="100%" direction="column" align="center" justify="center">
        <Flex justify="center" align="center" className="bg-background rounded-2xl" direction="column" gap="6" px="2" py="4">
          {routes.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.id}
                className={`flex justify-center rounded-2xl w-12 h-12 cursor-pointer transition-all duration-300 ${isActive
                  ? "linear-theme"
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
        </Flex>

      </Flex >
    </Box >
  );
};

export default Sidebar;
