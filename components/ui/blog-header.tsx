"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BlogHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <div className="mx-auto max-w-2xl text-center ">
      <motion.div
        initial="hidden"
        ref={ref}
        animate={isInView ? "show" : "hidden"}
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        <motion.h1
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="text-4xl font-bold font-headingAlt bg-gradient-to-tr from-white/50 bg-clip-text text-transparent to-white tracking-tight lg:text-7xl sm:text-6xl"
        >
          <div className="mb-4"></div>
          What <span className="mx-[3px]"></span>i{" "}
          <span className="mx-[3px]"></span> thought
        </motion.h1>
        <motion.p
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="mt-6 text-lg leading-8"
        >
          A collection of handmadeand crafted thought from KiNFiSH
        </motion.p>
      </motion.div>
    </div>
  );
};

export default BlogHeader;
