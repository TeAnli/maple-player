import React from "react";
import MusicContiner from "../../components/MusicsContiner";
import { Flex } from "@radix-ui/themes";

const FolderPage: React.FC = () => {
    return (
        <Flex width="100%" height="100%" overflow="hidden" p="4" gap="4">
            <MusicContiner></MusicContiner>
        </Flex >
    );
};

export default FolderPage;
