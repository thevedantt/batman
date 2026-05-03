"use client";

import { useEffect, useState } from "react";

interface AnimatedTypingMotionProps {
  words?: string[];
  className?: string;
  delay?: number;
  pauseDuration?: number;
}

const AnimatedTypingMotion = ({ 
  words = ["VEDANT", "THEVEDANT"],
  className = "",
  delay = 150,
  pauseDuration = 2000
}: AnimatedTypingMotionProps) => {
  const [i, setI] = useState(0); 
  const [j, setJ] = useState(0); 
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const currentWord = words[i];

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setText(currentWord.substring(0, j - 1));
        setJ(j - 1);

        if (j === 0) {
          setIsDeleting(false);
          setI((prev) => (prev + 1) % words.length);
        }
      } else {
        setText(currentWord.substring(0, j + 1));
        setJ(j + 1);

        if (j === currentWord.length) {
          // Pause at the end of the word
          setTimeout(() => setIsDeleting(true), pauseDuration);
          return;
        }
      }
    }, isDeleting ? delay / 2 : delay);

    return () => clearTimeout(timeout);
  }, [j, i, isDeleting, words, delay, pauseDuration]);

  // Color logic specifically for the user's request
  const isRed = words[i] === "THEVEDANT";

  return (
    <div className={`w-full flex justify-start items-center ${className}`}>
      <p className={`font-heading text-6xl sm:text-7xl lg:text-9xl tracking-tight font-normal transition-colors duration-500 ${isRed ? "text-[#c1121f] drop-shadow-[0_0_30px_rgba(193,18,31,0.5)]" : "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"}`}>
        {text}
        <span className="animate-pulse ml-2 text-[#c1121f]">|</span>
      </p>
    </div>
  );
}

export default AnimatedTypingMotion;
