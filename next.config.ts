import type { NextConfig } from "next";

// Suppress specific warnings from dependencies
const originalWarn = console.warn;
console.warn = (...args) => {
    const message = args.join(" ");
    if (message.includes("Executing an Effect versioned")) {
        return;
    }
    originalWarn.apply(console, args);
};

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
            },
        ],
    },
};

export default nextConfig;
