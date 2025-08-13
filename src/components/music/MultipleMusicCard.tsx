import { useEffect, useRef, useState } from "react";


type MultipleMusicCardProps = {
    title: string,
    cover: string,
    duration: number,
    name: string
    active: boolean
    onClick: () => void;
}

const MultipleMusicCard: React.FC<MultipleMusicCardProps> = (props) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const image = new Image();
        image.src = props.cover;
        image.onload = () => setLoading(true);

        return () => {
            image.onload = null;
            image.onerror = null;
        };
    }, [props.cover])
    return (
        <div onClick={props.onClick} className={`rounded-2xl transition-all duration-500 w-full h-full hover:scale-[1.03]`}>
            {/* {props.active && <div id="child" className="rounded-2xl justify-center items-center transition-all shadow-xl duration-500 left-0 right-0 m-auto linear-theme absolute opacity-70 -translate-y-3 w-11/12 h-full"></div>} */}
            <section className={`group flex flex-row w-full h-full rounded-2xl relative cursor-pointer`}>
                {loading ?
                    <div className="w-full h-full relative">
                        <img
                            className="absolute object-cover w-full h-full flex items-center rounded-2xl justify-center"
                            src={props.cover}
                        />
                        <div
                            className={`absolute inset-0 bg-gradient-to-t to-transparent flex items-end`}
                        >
                            <h2 className="text-white text-xl font-bold p-2 truncate">{props.title}</h2>
                        </div>
                    </div>


                    :
                    <div className="absolute object-cover w-full h-full flex items-center rounded-2xl justify-center bg-neutral-600 animate-pulse"></div>
                }
            </section>
        </div >
    )
}
export default MultipleMusicCard;