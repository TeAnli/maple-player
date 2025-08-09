
type MultipleMusicCardProps = {
    title: string,
    cover: string,
    duration: number,
    name: string
    active: boolean
    onClick: () => void;
}

const MultipleMusicCard: React.FC<MultipleMusicCardProps> = (props) => {
    return (
        <div onClick={props.onClick} id="parent" className={`rounded-2xl  hover:bg-hovered/40 transition-all duration-500 relative `}>
            {props.active && <div id="child" className="rounded-2xl justify-center items-center transition-all shadow-xl duration-500 left-0 right-0 m-auto linear-theme absolute opacity-70 -translate-y-3 w-11/12 h-full"></div>}
            <section className={`group flex flex-row items-center p-3 justify-between ${props.active ? "linear-theme" : ""} w-full rounded-2xl relative cursor-pointer`}>

                <div className="flex items-center gap-4 ">
                    <div className="relative flex-shrink-0">
                        <img
                            className="object-cover w-14 h-14 rounded-2xl flex items-center justify-center"
                            src={props.cover}
                        />
                    </div>
                    <div className="flex flex-col truncate w-48">
                        <p>{props.title}</p>
                        <p className="text-sm text-neutral-500 font-bold">{props.name}</p>
                    </div>
                    <div className="flex truncate">
                        <section className="mb-1">
                            <h3 className="text-base font-bold truncate transition-colors duration-300 max-w-80">
                            </h3>
                        </section>
                    </div>
                    <div className="group-hover:"></div>
                </div>
            </section>
        </div >
    )
}
export default MultipleMusicCard;