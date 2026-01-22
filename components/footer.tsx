"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-neutral-950 border-t border-neutral-800 py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
                className="max-w-4xl mx-auto text-center space-y-8"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Got a project idea? Let's discuss how to make it a reality.
                </h2>
                <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Whether you're looking for a developer for a new project, or want to develop your current platform, I'm here to help. Let's start something great together.
                </p>

                <div className="flex justify-center">
                    <Link href="#contact">
                        <Button size="lg" className="text-lg px-8 py-6">
                            Contact Me Now
                        </Button>
                    </Link>
                </div>

                <div className="pt-12 border-t border-neutral-900 flex flex-col items-center gap-4 text-sm text-neutral-500">
                    <p>Powered by Next.js & Coffee ☕</p>
                    <p>Developed with ❤️. © {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </motion.div>
        </footer>
    );
}
