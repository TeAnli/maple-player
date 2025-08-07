import { useState } from "react";
type ToggleHandler = () => void;

export function useToggle(state: boolean): [boolean, ToggleHandler] {
  const [value, setValue] = useState(state);

  const toggle = () => {
    setValue(!value);
  };

  return [value, toggle];
}
