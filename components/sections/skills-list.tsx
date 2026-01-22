"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { motion } from "framer-motion";
import React from "react";

export default function SkillsList({ items }: { items: { title: string; description: string; link?: string }[] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
        >
            <HoverEffect items={items} />
        </motion.div>
    );
}
