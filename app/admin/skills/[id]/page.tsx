import { getSkill } from "@/lib/actions/skill"
import { SkillForm } from "@/components/admin/skill-form"
import { notFound } from "next/navigation"

interface EditSkillPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
    const { id } = await params
    const skill = await getSkill(id)

    if (!skill) {
        notFound()
    }

    return <SkillForm initialData={skill} />
}
