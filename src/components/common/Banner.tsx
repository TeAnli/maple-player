import { invoke } from "@tauri-apps/api/core";
import React, { useEffect, useState, useRef } from "react";

type BannerInfo = {
    image: string;
    title: string;
    url: string;
    color: string;
};

const Banner: React.FC = () => {
    const [banners, setBanners] = useState<BannerInfo[]>([]);
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const fetchBanner = async () => {
        try {
            const response = (await invoke("get_music_banners")) as BannerInfo[];
            setBanners(response);
        } catch (error) {
            console.error("Failed to fetch banners:", error);
        }
    };

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent(prev => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent(prev => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        if (isTransitioning || index === current) return;
        setIsTransitioning(true);
        setCurrent(index);
    };

    const startAutoPlay = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(nextSlide, 5000);
    };

    const stopAutoPlay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        fetchBanner();
    }, []);

    useEffect(() => {
        if (banners.length > 0) {
            startAutoPlay();

            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [current, banners.length]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

    return (
        <div
            className="h-64 w-1/2 rounded-2xl relative overflow-hidden transition-all duration-300"
            onMouseEnter={stopAutoPlay}
            onMouseLeave={startAutoPlay}
        >
            {banners.length > 0 ? (
                <>
                    <div className="w-full h-full relative">
                        {banners.map((banner, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-500 ${index === current ? "opacity-100" : "opacity-0"}`}
                                style={{ zIndex: index === current ? 1 : 0 }}
                            >
                                <a
                                    href={banner.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full h-full"
                                >
                                    <img
                                        src={banner.image}
                                        alt={banner.title}
                                        className="w-full h-full object-cover"
                                    />

                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t to-transparent flex items-end`}
                                        style={{
                                            backgroundImage: `linear-gradient(to top,${banner.color},rgba(0,0,0,0))`
                                        }}
                                    >
                                        <h2 className="text-white text-xl font-bold p-6">{banner.title}</h2>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-white p-2 rounded-full transition-colors z-20 h-full"
                        aria-label="上一张"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-white p-2 rounded-full transition-colors z-20 h-full"
                        aria-label="下一张"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* 指示器 */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === current ? "bg-white w-8" : "bg-white/50"}`}
                                aria-label={`跳转到第${index + 1}张`}
                            ></button>
                        ))}
                    </div>
                </>
            ) : (
                <div className="skeleton w-full h-full flex items-center justify-center rounded-2xl">
                    <p className="dark:text-white">加载轮播图中...</p>
                </div>
            )}
        </div>
    );
};

export default Banner;
