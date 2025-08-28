type StarUserProps = {
    name: string,
    cover: string,

}

const StarUser: React.FC<StarUserProps> = (props) => {
    return (
        <div id="parent" className={`rounded-2xl transition-all duration-300 relative w-full hover:scale-[1.03]`}>
            <img
                className="absolute object-cover w-full h-full flex items-center rounded-2xl justify-center"
                src={props.cover}
            />
            <section className={`group flex flex-row items-center p-3 justify-between w-full backdrop-blur-2xl rounded-2xl relative cursor-pointer`}>

                <div className="flex items-center gap-4 ">
                    <div className="relative flex-shrink-0">
                        <img
                            className="object-cover w-14 h-14 rounded-full flex items-center justify-center"
                            src={props.cover}
                        />
                    </div>
                    <div className="flex flex-col truncate w-48">
                        <p className="text-white font-bold">{props.name}</p>
                    </div>
                    <div className="flex truncate">
                        <section className="mb-1">
                            <h3 className="text-base  font-bold truncate transition-colors duration-300 max-w-80">
                            </h3>
                        </section>
                    </div>
                    <div className="group-hover:"></div>
                </div>
            </section>
        </div>
    )
}
export default StarUser;