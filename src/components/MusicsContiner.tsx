import { AspectRatio, Box, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { useFolderStore } from "../utils/store/folder_store";
import MusicCard from "./MusicCard";

const MusicContiner: React.FC = () => {
    const currentFolder = useFolderStore((state) => state.currentFolder);
    return (
        <div className="flex flex-col w-full h-full border border-gray-200/60  rounded-lg bg-white/5 p-4 gap-8">
            {currentFolder && <Box>
                <Flex gap="3">
                    <img className="rounded-md w-64 object-cover" src={currentFolder?.info.cover}></img>
                    <Box maxWidth="100%">
                        <Text as="div" size="8" weight="regular">
                            {currentFolder?.info.title}
                        </Text>
                        <Text as="div" size="4" color="gray">
                            total: {currentFolder?.info.media_count}
                        </Text>
                    </Box>
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