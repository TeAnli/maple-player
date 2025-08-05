import React from 'react';
import { Slider } from "radix-ui"

interface ProgressBarProps {
  duration: number;
  current: number;
  onProgressChange: (event: number[]) => void;
}

// const ProgressBar: React.FC<ProgressBarProps> = ({ current, duration, onProgressChange }) => {

//   return (

//   );
// };

// export default ProgressBar;