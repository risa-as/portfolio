import { verifySession } from "@/lib/actions/auth"
import Link from "next/link"
import { LayoutDashboard, FolderKanban, LogOut, MessageSquare, Menu, ExternalLink, Plus, Layers } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    await verifySession()

    const NavContent = () => (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
                href="/admin"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
            </Link>
            <Link
                href="/admin/projects"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
                <FolderKanban className="h-4 w-4" />
                Projects
            </Link>
            <Link
                href="/admin/projects/new"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
                <Plus className="h-4 w-4" />
                Create Project
            </Link>
            <Link
                href="/admin/messages"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
                <MessageSquare className="h-4 w-4" />
                Messages
            </Link>
            <Link
                href="/admin/skills"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
                <Layers className="h-4 w-4" />
                Tech Stack
            </Link>
            <div className="my-2 border-t"></div>
            <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
                <ExternalLink className="h-4 w-4" />
                View Website
            </Link>
        </nav>
    )

    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row bg-muted/40">
            {/* Desktop Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                        <span className="">Portfolio Admin</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <NavContent />
                </div>
                <div className="mt-auto p-4">
                    <form
                        action={async () => {
                            "use server"
                            await import("@/lib/actions/auth").then((mod) => mod.logout())
                        }}
                    >
                        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-red-500 hover:bg-muted w-full">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Mobile / Main Content */}
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <NavContent />
                            <div className="mt-auto p-4 border-t">
                                <form
                                    action={async () => {
                                        "use server"
                                        await import("@/lib/actions/auth").then((mod) => mod.logout())
                                    }}
                                >
                                    <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-red-500 hover:bg-muted w-full">
                                        <LogOut className="h-4 w-4" />
                                        Sign Out
                                    </button>
                                </form>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <div className="ml-auto">
                        {/* User menu or logout could go here */}
                    </div>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
