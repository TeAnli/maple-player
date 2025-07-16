import { Box, Flex, Grid } from "@radix-ui/themes";
import { useFolderStore } from "../store/folder_store";
import LoveIcon from "../assets/icons/Love.svg"
import MusicNoteIcon from "../assets/icons/MusicNote.svg"
import MusicCard from "./MusicCard";

const MusicContiner: React.FC = () => {
    const currentFolder = useFolderStore((state) => state.currentFolder);
    return (
        <div className="flex flex-col w-full h-full  rounded-lg p-4 gap-8">
            {currentFolder && <Box>
                <Flex gap="6">
                    <img className="rounded-md w-80" src={currentFolder?.info.cover}></img>
                    <Flex direction="column" width="100%" justify="between">
                        <Flex direction="column" gap="3" maxWidth="100%">
                            <p className="text-4xl font-bold">
                                {currentFolder?.info.title}
                            </p>
                            <p className="text-lg text-[#999999]">
                                这是默认收藏夹，没有任何的简介，我爱你，谢谢你同意
                            </p>
                        </Flex>
                        <Flex direction="row" align="center" gap="4">
                            <Flex direction="row" align="center" gap="2">
                                <img src={LoveIcon}></img><p className="text-[#999999]">114514</p>
                            </Flex>
                            <Flex direction="row" align="center" gap="2">
                                <img src={MusicNoteIcon}></img><p className="text-[#999999]">{currentFolder?.medias.length}</p>
                            </Flex>
                        </Flex>
                        <Flex width="100%" direction="row" justify="between">
                            <Flex direction="row" gap="4">
                                <button className="linear-theme h-12 rounded-xl text-xl font-bold px-4"> {">"} 播放</button>
                                <button className="bg-card h-12 rounded-xl text-xl font-bold px-4">下载全部</button>
                                <button className="bg-card h-12 rounded-xl text-xl font-bold px-4">~</button>
                            </Flex>
                            <button className="bg-card h-12 rounded-xl text-xl font-bold px-4">打开B站</button>
                        </Flex>

                    </Flex>
                </Flex>
            </Box>
            }
            <Grid overflow="auto" className="gap-12 p-4" columns={{
                sm: '3',
                md: '4',
                lg: '5',
                xl: '6',
            }}>
                {currentFolder?.medias.map((item) => {
                    return <MusicCard name={item.title} cover={item.cover} key={item.id} />
                })}
            </Grid>
        </div>

    )
}
export default MusicContiner;