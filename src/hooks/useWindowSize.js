import {deviceWidth} from "../context/WindowSizeContext";
import {useLayoutEffect, useState} from "react";
import {DEBOUNCE_TIME_MS} from "../utils/constants";

function debounce(f, ms) {
  let isCooldown = false;
  return function() {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
  };
}

export default function useWindowSize() {
  const [screenType, setScreenType] = useState("desktop");
  const handleScreenResize = () => {
    const currenWidth = window.innerWidth
    if (currenWidth < deviceWidth.tablet) {
      setScreenType('mobile');
    } else if (currenWidth >= deviceWidth.tablet && currenWidth < deviceWidth.olddesktop) {
      setScreenType('tablet');
    } else if (currenWidth >= deviceWidth.olddesktop && currenWidth < deviceWidth.desktop) {
      setScreenType('olddesktop');
    } else if (currenWidth >= deviceWidth.desktop) {
      setScreenType('desktop');
    }
  }
  useLayoutEffect(() => {
    window.addEventListener('resize', debounce(handleScreenResize, DEBOUNCE_TIME_MS));
    handleScreenResize();
    return () => {
      window.removeEventListener('resize', debounce(handleScreenResize, DEBOUNCE_TIME_MS));
    };
  })
  return screenType
}