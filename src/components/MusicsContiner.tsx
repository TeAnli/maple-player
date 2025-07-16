import { AspectRatio, Box, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { useFolderStore } from "../utils/store/folder_store";
import MusicCard from "./MusicCard";

const MusicContiner: React.FC = () => {
    const currentFolder = useFolderStore((state) => state.currentFolder);
    return (
        <div className="flex flex-col w-full h-full  rounded-lg p-4 gap-8">
            {currentFolder && <Box>
                <Flex gap="3">
                    <img className="rounded-md w-80" src={currentFolder?.info.cover}></img>
                    <Flex direction="column" maxWidth="100%" gap="3">
                        <p className="text-4xl font-bold">
                            {currentFolder?.info.title}
                        </p>
                        <p className="text-lg text-[#999999]">
                            这是默认收藏夹，没有任何的简介，我爱你，谢谢你同意
                        </p>
                    </Flex>
                </Flex>
            </Box>
            }
            {/* grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]  */}
            <Grid overflow="auto" className="gap-12 p-4" columns={{
                sm: '2',
                md: '3',
                lg: '4',
                xl: '5',
            }}>
                {currentFolder?.medias.map((item) => {
                    return <MusicCard name={item.title} cover={item.cover} key={item.id} />
                })}
            </Grid>
        </div>

    )
}
export default MusicContiner;