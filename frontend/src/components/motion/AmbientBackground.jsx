import React from "react";
import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="ambientBackground">
      <motion.div
        className="ambientOrb orbOne"
        animate={{
          x: [0, 80, 20, 0],
          y: [0, -50, 70, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="ambientOrb orbTwo"
        animate={{
          x: [0, -70, 40, 0],
          y: [0, 80, -30, 0],
          scale: [1, 0.85, 1.15, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
