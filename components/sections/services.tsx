"use client";
import { IconCode, IconLayoutDashboard, IconRocket } from "@tabler/icons-react";
import { motion } from "framer-motion";
import React from "react";

export default function Services() {
    const services = [
        {
            title: "Full-Stack Development",
            description: "Building applications from scratch to launch using the latest technologies.",
            link: "",
            icon: <IconCode className="w-8 h-8 text-primary" />
        },
        {
            title: "Performance Optimization (SEO)",
            description: "Making your current site faster and more efficient for search engines.",
            link: "",
            icon: <IconRocket className="w-8 h-8 text-primary" />
        },
        {
            title: "Design to Code",
            description: "Converting Figma files into live, interactive Next.js interfaces.",
            link: "",
            icon: <IconLayoutDashboard className="w-8 h-8 text-primary" />
        },
    ];

    return (
        <section className="max-w-5xl mx-auto px-8 py-20" id="services">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.3 }}
                className="text-3xl md:text-5xl font-bold text-center mb-12 text-white"
            >
                How Can I Help You?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl hover:border-primary/50 transition-colors group"
                    >
                        <div className="mb-4 bg-neutral-800 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-neutral-400 leading-relaxed">{service.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
