import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { routes } from "../utils/router/routes";
import { Box, Flex, Switch } from "@radix-ui/themes";

interface TitleProps {
  children: string;
}
const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Box position="absolute" width="100%" mt="8">
      <p className="text-center text-4xl font-title linear-theme-text">{children}</p>
    </Box>
  )
}
const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 添加主题状态管理
  const [isDarkMode, setIsDarkMode] = useState(true);


  // 初始化主题状态
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  // 修复主题切换逻辑
  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle('dark', checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  };

  return (
    <Box position="fixed" height="100vh" className="bg-foreground w-sidebar">
      <Title>Maple</Title>
      <button onClick={() => { handleItemClick("login") }}>登陆</button>
      <Flex height="100%" direction="column" align="center" justify="center" gap="8">
        <Flex justify="center" align="center" className="bg-content rounded-2xl" direction="column" gap="6" px="2" py="4">
          {routes.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.id}
                className={`flex justify-center rounded-2xl w-12 h-12 cursor-pointer transition-all duration-300 ${isActive
                  ? "linear-theme"
                  : "hover:scale-110"
                  }`}
                onClick={() => handleItemClick(item.path)}
              >
                <img
                  className={`transition-all duration-500 ${isActive ? "opacity-100" : "dark:opacity-30 "
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
