import { useEffect, useRef, useState } from "react";

export const useScroll = () => {
  const [ isVisible, setIsVisible ] = useState<boolean>(false);
  const animationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        if (animationRef.current) {
          const rect = animationRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom >= 0) {
            setIsVisible(true);
          }
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isVisible, animationRef };
};
