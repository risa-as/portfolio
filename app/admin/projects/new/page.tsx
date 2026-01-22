import { ProjectForm } from "@/components/admin/project-form"

export default function NewProjectPage() {
    return (
        <div className="space-y-4 max-w-2xl">
            <h1 className="text-lg font-semibold md:text-2xl">Create New Project</h1>
            <ProjectForm />
        </div>
    )
}
