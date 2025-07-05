import { useNavigate, useLocation } from "react-router";
import { routes } from "../utils/router/routes";
import { Avatar, Box, ContextMenu, Flex } from "@radix-ui/themes";
import { useAccountStore } from "../utils/store/account_store";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const header = useAccountStore((state) => state.face);
  const isLogin = useAccountStore((state) => state.isLogin);
  const handleItemClick = (path: string) => {
    navigate(path);
  };
  return (
    <Box position="fixed" height="100vh" width="80px" className="bg-forgeground">

      <Flex className="flex flex-col gap-8 items-center mt-8">

        <Box>
          <header className="flex items-center">
            <ContextMenu.Root>
              <ContextMenu.Trigger>
                <Box>
                  <Avatar
                    radius="full"
                    size="5"
                    src={header}
                    fallback="U"
                  />
                </Box>
              </ContextMenu.Trigger>
              <ContextMenu.Content color="gray">
                {!isLogin ?
                  <ContextMenu.Item onClick={() => { navigate("/login") }}>Login</ContextMenu.Item> :
                  <ContextMenu.Item color="red" onClick={() => { }}>Logout</ContextMenu.Item>
                }

              </ContextMenu.Content>
            </ContextMenu.Root>


          </header>
        </Box>

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
      </Flex>
    </Box>
  );
};

export default Sidebar;
