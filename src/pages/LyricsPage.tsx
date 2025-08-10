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
            className="fixed top-0 left-0 w-[100vw] h-[100vh] z-50 bg-content flex flex-col items-center justify-center"
            data-tauri-drag-region
        >
            <div className="w-full h-24" ></div>
            <h1 className="text-3xl font-bold mb-6">歌词页面</h1>
            <div className="w-4/5 max-w-xl text-lg text-center">
                <p>这里是歌词内容展示区。</p>
                <Button onClick={handleBack}>返回</Button>
            </div>
        </div>
    );
}
export default LyricsPage;