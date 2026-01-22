import { getSkills } from "@/lib/actions/skill";
import SkillsList from "./skills-list";

export default async function Skills() {
    const skills = await getSkills();

    const formattedSkills = skills.map(skill => ({
        title: skill.title,
        description: skill.description,
        link: skill.link || undefined
    }));

    return (
        <section className="max-w-5xl mx-auto px-8" id="skills">
            <h2 className="text-3xl md:text-5xl font-bold text-center mt-20 mb-10 text-white">
                Tools to Craft the Impossible
            </h2>
            <SkillsList items={formattedSkills} />
        </section>
    );
}
