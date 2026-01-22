"use client";
import { IconMapPin } from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
    return (
        <section className="py-20 relative bg-neutral-900 antialiased">
            <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-8 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="flex-1 space-y-4"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white">More than just a programmer.. <br /><span className="text-primary">I am your partner in innovation</span></h2>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                        In a world racing towards speed, I believe quality is the only constant. My journey in coding is not just writing lines, but a continuous search for the optimal solution.
                    </p>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                        I focus on building Scalable Systems, leveraging the latest web technologies like Prisma for databases and Vercel for cloud deployment. My goal is not just to deliver a project, but to build a digital infrastructure that serves your goals for years to come.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                        <IconMapPin className="text-primary" />
                        <span>Based in Iraq</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="flex-1 relative h-60 w-full md:w-auto rounded-xl overflow-hidden bg-neutral-800 flex items-center justify-center"
                >
                    {/* Visual representation of map or location */}
                    <div className="absolute inset-0 bg-neutral-800 opacity-50"></div>
                    <div className="relative z-10 text-center">
                        <div className="inline-block relative">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                        </div>
                        <p className="text-white mt-2 font-bold">Iraq</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
