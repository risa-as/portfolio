"use client";


import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export default function Hero() {
    return (
        <section className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className="absolute top-4 left-4 z-50 flex gap-4">
                <Link href="/admin">
                    <Button variant="ghost" className="text-white hover:bg-white/10">Admin Panel</Button>
                </Link>
                <Link href="/login">
                    <Button variant="ghost" className="text-white hover:bg-white/10">Login</Button>
                </Link>
            </div>
            <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                        Building the Modern Web.. <br /> Pixel by Pixel.
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto leading-relaxed"
                >
                    Passionate Web Developer specializing in Next.js & React. I combine performance power with design beauty to create unforgettable web applications.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 flex flex-wrap justify-center gap-4"
                >
                    <Link href="#projects">
                        <Button variant="default" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                            Explore My Work
                        </Button>
                    </Link>
                    <Link href="#contact">
                        <Button variant="outline" className="text-lg px-8 py-6">Contact Me</Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
