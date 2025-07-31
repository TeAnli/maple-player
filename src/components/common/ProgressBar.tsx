import React from 'react';
import { Slider } from "radix-ui"

interface ProgressBarProps {
  duration: number;
  current: number;
  onProgressChange: (event: number[]) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, duration, onProgressChange }) => {

  // useEffect(() => {
  //   if (!isDragging && duration > 0) {
  //     setProgress((currentTime / duration) * 100);
  //   }
  // }, [currentTime, duration, isDragging]);


  return (
    <Slider.Root className="group relative flex items-center select-none touch-none w-full h-2  transition-all" value={[current]} max={duration} onValueChange={onProgressChange}>
      <Slider.Track className="relative flex-1 rounded-full h-1  transition-all">
        <Slider.Range className="absolute rounded-full bg-primary h-full" />
      </Slider.Track>

      <Slider.SliderThumb className='block rounded-full bg-primary focus:outline-none size-4 scale-0 group-hover:scale-100 transition-all duration-100' aria-label="Progress"></Slider.SliderThumb>

    </Slider.Root>
    // <div className="progress-bar" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
    //   <div className="progress" style={{ width: `${progress}%` }}></div>
    // </div>
  );
};

export default ProgressBar;