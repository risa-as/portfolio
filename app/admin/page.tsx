import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { FolderGit2, MessageSquare, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminDashboardPage() {
    const projectCount = await prisma.project.count()
    const messageCount = await prisma.message.count()

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                    <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{projectCount}</div>
                    <p className="text-xs text-muted-foreground mb-4">All projects in portfolio</p>
                    <Link href="/admin/projects">
                        <Button variant="outline" size="sm" className="w-full">
                            Manage Projects
                        </Button>
                    </Link>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Messages</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{messageCount}</div>
                    <p className="text-xs text-muted-foreground mb-4">Contact form submissions</p>
                    <Link href="/admin/messages">
                        <Button variant="outline" size="sm" className="w-full">
                            View Messages
                        </Button>
                    </Link>
                </CardContent>
            </Card>
            <Card className="border-dashed">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tech Stack</CardTitle>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Skills</div>
                    <p className="text-xs text-muted-foreground mb-4">Manage your expertise</p>
                    <Link href="/admin/skills">
                        <Button size="sm" variant="secondary" className="w-full">
                            Manage Skills
                        </Button>
                    </Link>
                </CardContent>
            </Card>
            <Card className="border-dashed">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Quick Action</CardTitle>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">New Project</div>
                    <p className="text-xs text-muted-foreground mb-4">Add work to portfolio</p>
                    <Link href="/admin/projects/new">
                        <Button size="sm" className="w-full">
                            <Plus className="mr-2 h-4 w-4" /> Create Project
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}
