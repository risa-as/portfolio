import { getFeaturedProjects } from "@/lib/actions/project";
import React from "react";
import ProjectsList from "./projects-list";

export default async function Projects() {
    const projects = await getFeaturedProjects();

    return (
        <section className="py-20 relative bg-black dark:bg-black antialiased" id="projects">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">
                Projects That Define Success
            </h2>
            <ProjectsList projects={projects} />
        </section>
    );
}
