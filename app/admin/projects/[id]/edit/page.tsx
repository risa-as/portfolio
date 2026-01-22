import { ProjectForm } from "@/components/admin/project-form"
import { getProjectById } from "@/lib/actions/project"
import { notFound } from "next/navigation"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const project = await getProjectById(id)

    if (!project) {
        notFound()
    }

    return (
        <div className="space-y-4 max-w-2xl">
            <h1 className="text-lg font-semibold md:text-2xl">Edit Project</h1>
            <ProjectForm project={project} isEdit />
        </div>
    )
}
