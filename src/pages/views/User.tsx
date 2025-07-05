import React from "react";
import Folderlist from "../../components/Folderlist";
import MusicContiner from "../../components/MusicsContiner";
import { Flex } from "@radix-ui/themes";

const User: React.FC = () => {
    return (
        <Flex width="100%" height="100%" overflow="hidden" p="4" gap="4">
            <Folderlist />
            <MusicContiner />
        </Flex >
    );
};

export default User;
