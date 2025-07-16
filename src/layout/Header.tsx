import { useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useNavigate } from "react-router";
import { useSearchStore } from "../store/search_store";
import { Box, Flex } from "@radix-ui/themes";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const setSearchContent = useSearchStore((state) => state.setSearchContent)

  const handleInput = (value: string) => {
    setContent(value);
  };

  const closeWindow = () => {
    let window = getCurrentWindow();
    window.close();
  };

  return (
    <Box position="fixed" width="100%">
      <Flex
        width="100%"
        data-tauri-drag-region
        justify="between"
        align="center"
        className="h-header"
        p="4"
      >
        <div className="w-full flex flex-row items-center mr-sidebar">
        </div>

      </Flex>
    </Box>
  );
};

export default Header;
