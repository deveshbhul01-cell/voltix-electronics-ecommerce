import React from "react";

import {
  motion
} from "framer-motion";

function LoadingScreen() {
  return (
    <motion.div
      className="devLoadingScreen"
      initial={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      transition={{
        duration: 0.45
      }}
    >
      <motion.div
        className="loadingBrand"
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 0.5
        }}
      >
        <motion.div
          className="loadingMark"
          animate={{
            rotate: [
              0,
              180,
              360
            ],
            scale: [
              1,
              1.15,
              1
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ◈
        </motion.div>

        <h1>
          DEV<span>STORE</span>
        </h1>

        <p>
          MODERN DIGITAL EXPERIENCE
        </p>

        <div className="loadingTrack">
          <motion.div
            initial={{
              scaleX: 0
            }}
            animate={{
              scaleX: 1
            }}
            transition={{
              duration: 1.1,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LoadingScreen;
