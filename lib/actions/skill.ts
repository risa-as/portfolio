"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// ... types
export type SkillActionState = {
    errors?: {
        title?: string[]
        description?: string[]
        link?: string[]
        order?: string[]
    }
    message?: string
    success?: boolean
}

const SkillSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    link: z.string().url("Invalid URL").optional().or(z.literal("")),
    order: z.number().optional(),
})

export async function getSkills() {
    return await prisma.skill.findMany({
        orderBy: { order: "asc" }, // Changed to order by 'order' field
    })
}

export async function getSkill(id: string) {
    return await prisma.skill.findUnique({
        where: { id },
    })
}

export async function createSkill(prevState: SkillActionState, formData: FormData): Promise<SkillActionState> {
    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        link: formData.get("link"),
    }

    const validatedData = SkillSchema.safeParse(rawData)

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
        }
    }

    try {
        // Get max order to append to end
        const lastSkill = await prisma.skill.findFirst({
            orderBy: { order: 'desc' },
        })
        const newOrder = (lastSkill?.order ?? -1) + 1

        await prisma.skill.create({
            data: {
                title: validatedData.data.title,
                description: validatedData.data.description,
                link: validatedData.data.link || null,
                order: newOrder,
            },
        })
        revalidatePath("/admin/skills")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        return { message: "Failed to create skill" }
    }
}

export async function updateSkill(id: string, prevState: SkillActionState, formData: FormData): Promise<SkillActionState> {
    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        link: formData.get("link"),
    }

    const validatedData = SkillSchema.safeParse(rawData)

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
        }
    }

    try {
        await prisma.skill.update({
            where: { id },
            data: {
                title: validatedData.data.title,
                description: validatedData.data.description,
                link: validatedData.data.link || null,
            },
        })
        revalidatePath("/admin/skills")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        return { message: "Failed to update skill" }
    }
}

export async function reorderSkill(id: string, direction: 'up' | 'down') {
    try {
        const skill = await prisma.skill.findUnique({ where: { id } })
        if (!skill) return { error: "Skill not found" }

        const currentOrder = skill.order
        const swapSkill = await prisma.skill.findFirst({
            where: {
                order: direction === 'up'
                    ? { lt: currentOrder }
                    : { gt: currentOrder }
            },
            orderBy: {
                order: direction === 'up' ? 'desc' : 'asc'
            }
        })

        if (swapSkill) {
            // Swap orders
            await prisma.$transaction([
                prisma.skill.update({
                    where: { id: skill.id },
                    data: { order: swapSkill.order }
                }),
                prisma.skill.update({
                    where: { id: swapSkill.id },
                    data: { order: currentOrder }
                })
            ])
            revalidatePath("/admin/skills")
            revalidatePath("/")
        }

        return { success: true }
    } catch (error) {
        return { error: "Failed to reorder skill" }
    }
}

export async function deleteSkill(id: string) {
    try {
        await prisma.skill.delete({
            where: { id },
        })
        revalidatePath("/admin/skills")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        return { error: "Failed to delete skill" }
    }
}

export async function reindexSkills() {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { createdAt: "asc" }
        })

        await prisma.$transaction(
            skills.map((skill, index) =>
                prisma.skill.update({
                    where: { id: skill.id },
                    data: { order: index }
                })
            )
        )

        revalidatePath("/admin/skills")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error(error)
        return { error: "Failed to reindex skills" }
    }
}
