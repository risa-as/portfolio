import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getProjects, deleteProject } from "@/lib/actions/project"
import { Edit, Plus, Trash2 } from "lucide-react"
import { revalidatePath } from "next/cache"

export default async function AdminProjectsPage() {
    const projects = await getProjects()

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="outline" size="sm">
                            ← Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
                </div>
                <Link href="/admin/projects/new">
                    <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                </Link>
            </div>
            <div className="border rounded-lg shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="hidden md:table-cell">Slug</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead className="hidden md:table-cell">Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4">No projects found.</TableCell>
                            </TableRow>
                        ) : projects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.title}</TableCell>
                                <TableCell className="hidden md:table-cell">{project.slug}</TableCell>
                                <TableCell>
                                    {project.featured ? (
                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                                            Featured
                                        </span>
                                    ) : (
                                        <span className="text-muted-foreground text-xs">No</span>
                                    )}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {new Date(project.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right flex items-center justify-end gap-2">
                                    <Link href={`/admin/projects/${project.id}/edit`}>
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                    </Link>
                                    <form
                                        action={async () => {
                                            "use server"
                                            await deleteProject(project.id)
                                        }}
                                    >
                                        <Button variant="ghost" size="icon" type="submit">
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
