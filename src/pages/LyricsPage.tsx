import Button from "@/components/common/Button";
import { useMusicStore } from "@/store/music";
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

    return (
        <div
            ref={pageRef}
            className="fixed top-0 left-0 w-[100vw] h-[100vh] z-50 bg-content"
            data-tauri-drag-region
        >
            <img src={musicStore.currentMusic?.cover} className="w-full h-full blur-3xl fixed" data-tauri-drag-region></img>
            {/* {/* <div className="w-full h-24 relative" ></div> */}
            <div className="absolute flex w-full h-full justify-center items-center" data-tauri-drag-region>
                <img className="object-cover size-96 rounded-md shadow-xl" src={musicStore.currentMusic?.cover}></img>
                <div>
                    
                </div>

            </div>

        </div>
    );
}
export default LyricsPage;