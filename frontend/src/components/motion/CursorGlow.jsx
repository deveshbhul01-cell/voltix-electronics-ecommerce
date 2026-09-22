import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const move = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <motion.div
      className="cursorGlow"
      animate={{
        x: position.x - 180,
        y: position.y - 180
      }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 25,
        mass: 0.4
      }}
    />
  );
}
