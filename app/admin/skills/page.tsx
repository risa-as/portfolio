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
import { getSkills, deleteSkill, reorderSkill } from "@/lib/actions/skill"
import { Plus, Trash2, ArrowUp, ArrowDown, Pencil } from "lucide-react"

export default async function AdminSkillsPage() {
    const skills = await getSkills()

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="outline" size="sm">
                            ← Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold md:text-2xl">Tech Stack</h1>
                </div>
                <div className="flex gap-2">
                    <form action={async () => {
                        "use server"
                        await import("@/lib/actions/skill").then(m => m.reindexSkills())
                    }}>
                        <Button size="sm" variant="outline" type="submit">
                            Reset Order
                        </Button>
                    </form>
                    <Link href="/admin/skills/new">
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" /> Add Skill
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="border rounded-lg shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Order</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="hidden md:table-cell">Link</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {skills.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-4">No skills found.</TableCell>
                            </TableRow>
                        ) : skills.map((skill: any, index: number) => (
                            <TableRow key={skill.id}>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <form action={async () => {
                                            "use server"
                                            await reorderSkill(skill.id, 'up')
                                        }}>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                disabled={index === 0}
                                                title="Move Up"
                                            >
                                                <ArrowUp className="h-3 w-3" />
                                            </Button>
                                        </form>
                                        <form action={async () => {
                                            "use server"
                                            await reorderSkill(skill.id, 'down')
                                        }}>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                disabled={index === skills.length - 1}
                                                title="Move Down"
                                            >
                                                <ArrowDown className="h-3 w-3" />
                                            </Button>
                                        </form>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium align-top py-4">{skill.title}</TableCell>
                                <TableCell className="align-top py-4">{skill.description}</TableCell>
                                <TableCell className="hidden md:table-cell text-blue-500 align-top py-4">
                                    {skill.link && <a href={skill.link} target="_blank">{skill.link}</a>}
                                </TableCell>
                                <TableCell className="text-right align-top py-4">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/skills/${skill.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                        </Link>
                                        <form
                                            action={async () => {
                                                "use server"
                                                await deleteSkill(skill.id)
                                            }}
                                        >
                                            <Button variant="ghost" size="icon" type="submit">
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                        </form>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
