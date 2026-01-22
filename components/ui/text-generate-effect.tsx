"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
    words,
    className,
}: {
    words: string;
    className?: string;
}) => {
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);
    let wordsArray = words.split(" ");

    useEffect(() => {
        if (isInView) {
            animate(
                "span",
                {
                    opacity: 1,
                },
                {
                    duration: 2,
                    delay: stagger(0.2),
                }
            );
        } else {
            animate(
                "span",
                {
                    opacity: 0,
                },
                {
                    duration: 0.2,
                }
            );
        }
    }, [scope.current, isInView]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className="dark:text-neutral-300 text-black opacity-0"
                        >
                            {word}{" "}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={cn("font-normal", className)}>
            <div className="mt-4">
                <div className=" dark:text-neutral-300 text-black text-base leading-relaxed tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
