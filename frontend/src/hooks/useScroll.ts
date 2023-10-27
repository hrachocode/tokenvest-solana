import { useEffect, useRef, useState } from "react";

export const useScroll = () => {
  const [ isVisible, setIsVisible ] = useState<boolean>(false);
  const animationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (animationRef.current) {
        const rect = animationRef.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height;
        const windowHeight = window.innerHeight;
        if (elementCenter >= 0 && elementCenter <= windowHeight) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isVisible, animationRef };
};
