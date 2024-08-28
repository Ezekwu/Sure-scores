'use client'
import { useState } from 'react';

export default function useToggle(defaultState = false) {
  const [value, setValue] = useState(defaultState);

  function on() {
    setValue(true);
  }

  function off() {
    setValue(false);
  }

  function toggle() {
    setValue((prevState) => !prevState);
  }

  return {
    value,
    off,
    on,
    toggle,
  };
}
