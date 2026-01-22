"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createSkill, updateSkill, type SkillActionState } from "@/lib/actions/skill"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"

interface SkillFormProps {
    initialData?: {
        id: string
        title: string
        description: string
        link?: string | null
    }
}

export function SkillForm({ initialData }: SkillFormProps) {
    const router = useRouter()

    // We need to wrap the action to pass the ID if updating
    const action = initialData
        ? updateSkill.bind(null, initialData.id)
        : createSkill

    const initialState: SkillActionState = { success: false }
    const [state, formAction, isPending] = useActionState(action, initialState)

    useEffect(() => {
        if (state.success) {
            toast.success(initialData ? "Skill updated" : "Skill created")
            router.push("/admin/skills")
        } else if (state.message) {
            toast.error(state.message)
        }
    }, [state, router, initialData])

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/skills">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">{initialData ? "Edit Skill" : "Add New Skill"}</h1>
            </div>

            <form action={formAction} className="space-y-6 border p-6 rounded-lg bg-card">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        required
                        placeholder="Technology Name"
                        defaultValue={initialData?.title}
                    />
                    {state.errors?.title && <p className="text-red-500 text-sm">{String(state.errors.title)}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        name="description"
                        required
                        placeholder="Brief description..."
                        defaultValue={initialData?.description}
                    />
                    {state.errors?.description && <p className="text-red-500 text-sm">{String(state.errors.description)}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="link">Link (Optional)</Label>
                    <Input
                        id="link"
                        name="link"
                        type="url"
                        placeholder="https://..."
                        defaultValue={initialData?.link || ""}
                    />
                    {state.errors?.link && <p className="text-red-500 text-sm">{String(state.errors.link)}</p>}
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {initialData ? "Update Skill" : "Create Skill"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
