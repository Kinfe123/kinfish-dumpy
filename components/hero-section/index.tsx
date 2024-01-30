"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Feeder from "../ui/feeder";
import Spotlight from "../ui/Spotlight";
import { Github } from "lucide-react";

export default function HeroSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <div className="mx-auto max-w-5xl mt-12 px-6 lg:px-8 bg-transparent relative">
      <div className="max-w-4xl absolute">
        <Spotlight fill="#9284D4" />
      </div>
      <div className="mx-auto max-w-3xl text-center ">
        <motion.div
          initial="hidden"
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
          <div className="absolute -top-4 -z-10 flex w-full justify-center">
            <div className="h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#8678F9] opacity-20 blur-[100px]" />
          </div>
             <div className="absolute -top-4 -z-10 flex w-full justify-center">
            <div className="h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#8678F9] opacity-20 blur-[100px]" />
          </div>
          <motion.h1
            variants={FADE_DOWN_ANIMATION_VARIANTS} 
            className="text-4xl font-bold font-headingAlt bg-gradient-to-tr from-purple-300/80 to-white/90 bg-clip-text text-transparent tracking-tight sm:text-7xl  md:text-8xl"
          >
            <Feeder feed="Latest Blogs" />
            <div className="mb-4"></div>
            Beautifully made thoughts
          </motion.h1>
          <motion.p
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mt-6 text-lg leading-8"
          >
            A collection of handmade and crafted thought from KiNFiSH
          </motion.p>

          <motion.div
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="mt-10 flex items-center justify-center gap-x-6 "
          >
            <Link href="/posts" className="z-50">
              <Button>Get started</Button>
            </Link>

            <Link
              href="https://github.com/Kinfe123/kinfish-dumpy"
              target="_blank"
              className="z-50"
            >
              <Button
                variant="ghost"
                className="outline-none bg-transparent hover:bg-transparent/5"
              >
                <Github className="mx-2 " /> Get the github &nbsp;
                <span aria-hidden="true">→</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="mt-16 flow-root sm:mt-24">
        <motion.div
          className="rounded-md"
          initial={{ y: 100, opacity: 0 }} // Image starts from 100px below and fully transparent
          animate={{ y: 0, opacity: 1 }} // Image ends at its original position and fully opaque
          transition={{ type: "spring", stiffness: 50, damping: 20 }} // transition specifications
        >
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            ></motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
