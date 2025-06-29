import React from "react";
import Folderlist from "../../components/Folderlist";
import MusicContiner from "../../components/MusicsContiner";

const User: React.FC = () => {
    return (
        <div className="flex w-full h-full overflow-hidden p-4 gap-4">
            <Folderlist />
            <MusicContiner />
        </div>
    );
};

export default User;
