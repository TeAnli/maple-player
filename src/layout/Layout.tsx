import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Box, Flex } from "@radix-ui/themes";

const Layout: React.FC = () => {
  return (
    <Box width="100%" height="100vh" overflow="hidden">
      <Sidebar />
      <Flex height="100%" direction="column" ml="80px">
        <Header />
        <Flex height="100%" overflow="hidden" className="mt-24">
          <Box width="100%" height="100%" overflowY="auto">
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </Box >
  );
};

export default Layout;
