"use client";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProjectsList({ projects }: { projects: any[] }) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-8 max-w-7xl mx-auto px-4">
            {projects.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <CardContainer className="inter-var">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                {item.title}
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                {item.shortDescription}
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                {item.images && item.images.length > 0 ? (
                                    <Image
                                        src={item.images[0]}
                                        height="1000"
                                        width="1000"
                                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                        alt={item.title}
                                    />
                                ) : (
                                    <div className="h-60 w-full bg-neutral-800 rounded-xl flex items-center justify-center text-neutral-500">
                                        No Image
                                    </div>
                                )}
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem
                                    translateZ={20}
                                    className="p-0"
                                >
                                    <Link
                                        href={`/projects/${item.slug}`}
                                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white inline-block"
                                    >
                                        View Details →
                                    </Link>
                                </CardItem>
                                {item.demoUrl && (
                                    <CardItem
                                        translateZ={20}
                                        className="p-0"
                                    >
                                        <Link
                                            href={item.demoUrl}
                                            target="_blank"
                                            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:!text-black text-white text-xs font-bold inline-block"
                                        >
                                            Live Demo
                                        </Link>
                                    </CardItem>
                                )}
                            </div>
                        </CardBody>
                    </CardContainer>
                </motion.div>
            ))}
        </div>
    );
}
