import { useMusicStore } from "@/store/music";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const LyricsPage: React.FC = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const musicStore = useMusicStore();
    useEffect(() => {
        if (pageRef.current) {
            pageRef.current.animate([
                { transform: "translateY(100%)" },
                { transform: "translateY(0)" }
            ], {
                duration: 500,
                easing: "ease-out",
                fill: "forwards"
            });
        }
    }, []);

    const handleBack = () => {
        if (pageRef.current) {
            const animation = pageRef.current.animate([
                { transform: "translateY(0)" },
                { transform: "translateY(100%)" }
            ], {
                duration: 500,
                easing: "ease-in",
                fill: "forwards"
            });
            animation.onfinish = () => {
                navigate(-1);
            };
        } else {
            navigate(-1);
        }
    };
    useGSAP(() => {
        gsap.to("#box", { duration: 0.3, scale: 1.1 }).delay(0.4)
        gsap.to("#cover", { duration: 0.3, boxShadow: "0 0 20px rgb(0, 0, 0, 0.6)" })


    }, [])
    return (
        <div
            ref={pageRef}
            className="fixed top-0 left-0 w-[100vw] h-[100vh] z-50 bg-content overflow-hidden"
            data-tauri-drag-region
        >
            <img src={musicStore.currentMusic?.cover} className="fixed blur-3xl scale-150" data-tauri-drag-region></img>
            <div className="absolute flex w-full h-full flex-col justify-center items-center gap-4" data-tauri-drag-region>
                <div className="fixed top-4 left-4">
                    <button onClick={handleBack} className="hover:bg-white/20 size-12 text-xl rounded-lg transition-all duration-500">^</button>
                </div>
                <div id="box" className="flex flex-col justify-center items-center">
                    <img id="cover" className="object-cover size-96 rounded-lg" src={musicStore.currentMusic?.cover}></img>
                    <p className="text-xl font-bold">{musicStore.currentMusic?.name}</p>
                </div>
                <div className="mt-12 text-xl">
                    暂无歌词
                </div>
            </div>
        </div>
    );
}
export default LyricsPage;