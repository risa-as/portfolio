"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute h-full w-full inset-0 z-0",
                className
            )}
        >
            <div
                className="absolute left-0 top-0 h-full w-full  [mask-image:linear-gradient(to_bottom,white,transparent)]"
                style={{
                    backgroundImage:
                        "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%)",
                    backgroundSize: "200% 100%",
                    animation: "moveBackground 15s linear infinite",
                }}
            ></div>
            <style jsx>{`
        @keyframes moveBackground {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        </div>
    );
};
