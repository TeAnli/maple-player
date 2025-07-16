import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Box, Flex } from "@radix-ui/themes";



const Layout: React.FC = () => {
  return (
    <>
      <Box className="z-50 font-mukta bg-content text-primary" width="100%" height="100vh" overflow="hidden">
        <Sidebar />
        <Flex height="100%" direction="column" className="ml-sidebar z-50">
          <Box width="100%">
            <Header />
          </Box>
          <Flex height="100%" overflow="hidden" className="mt-8">
            <Box width="100%" overflowY="auto">
              <Outlet />
            </Box>
          </Flex>
        </Flex>
      </Box >
    </>

  );
};

export default Layout;
