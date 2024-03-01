"use client";

import { useRef } from "react";
import Spotlight from "./ui/Spotlight";
import { motion, useInView } from "framer-motion";
import Particles from "./particles";
import ButtonShadowGradient from "./bg-dx";
const DxHeader = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <div>
      <div className="max-w-6xl mx-auto">
        {/* <Spotlight fill="#9284D4" /> */}
      </div>
      <div className="h-screen w-full dark:bg-transparent bg-white  dark:bg-grid-white/[0.06]  bg-opacity-[0.001] bg-grid-black/[0.1] relative flex items-center justify-center">
       
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute mx-auto  pointer-events-none inset-0 flex items-center justify-center dark:bg-transparent bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]"></div>
        <motion.div
          initial="hidden"
          className="flex flex-col justify-center items-center"
          ref={ref}
          animate={isInView ? "show" : "hidden"}
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.h1
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="text-4xl text-center  max-w-6xl mx-auto  font-bold font-heading bg-gradient-to-tr from-purple-300/80 to-white/90 bg-clip-text text-transparent tracking-tight sm:text-8xl md:text-[10rem] "
          >
            We really care about{" "}
            <span className="bg-gradient-to-tr from-purple-600 to-black-400 text-transparent bg-clip-text">
              DX
            </span>

          </motion.h1>
          <ButtonShadowGradient />
        
        </motion.div>
      </div>
    </div>
  );
};
export default DxHeader;
