"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Feeder from "./feeder";

const BlogHeader = ({ totalViews }: { totalViews: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <div className="mx-auto max-w-2xl py-10 text-center">
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
        <Feeder feed={`🎉  We have passed ${totalViews} views`} />
        <motion.h1
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-tr to-white sm:text-6xl lg:text-7xl font-headingAlt from-white/50"
        >
          <div className="mb-4"></div>
          What <span className="mx-[3px]"></span>i{" "}
          <span className="mx-[3px]"></span> thought
        </motion.h1>
        <motion.p
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="mt-6 text-lg leading-8"
        >
          A collection of hand made and crafted thought from KiNFiSH
        </motion.p>

        <motion.p
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          className="mt-6 text-lg leading-8"
        ></motion.p>
      </motion.div>
    </div>
  );
};

export default BlogHeader;
