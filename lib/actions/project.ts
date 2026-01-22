"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { ProjectFormSchema, ProjectFormValues } from "@/lib/validations/project"
import { redirect } from "next/navigation"
import { Project } from "@prisma/client"

export type ProjectWithParsedData = Omit<Project, "tags" | "images"> & {
    tags: string[]
    images: string[]
}

export type ProjectState = {
    success?: boolean
    error?: string
    errors?: Record<string, string[]>
}

export async function createProject(prevState: ProjectState, formData: FormData): Promise<ProjectState> {
    // Parse tags from comma separated string
    const tagsString = formData.get("tags") as string
    const tagsList = tagsString ? tagsString.split(",").map(t => t.trim()).filter(Boolean) : []

    // Parse images (assuming they are passed as JSON string or multiple fields, 
    // but for form actions usually we handle the upload on client and pass URLs as hidden fields or JSON)
    // Simplified for now: assume 'images' is a JSON string of URLs or handled differently.
    // In a real form with Uploadthing, we usually get an array of URLs after upload.
    // Let's assume the form submits 'images' as a stringified JSON array.
    const imagesString = formData.get("images") as string

    // Construct data object for Zod
    const rawData: any = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        shortDescription: formData.get("shortDescription"),
        description: formData.get("description"),
        tags: tagsString, // validate as string first
        demoUrl: formData.get("demoUrl"),
        repoUrl: formData.get("repoUrl"),
        featured: formData.get("featured") === "on",
        images: imagesString ? JSON.parse(imagesString) : [],
    }

    const validatedFields = ProjectFormSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            error: "Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { tags, images, ...otherData } = validatedFields.data

    try {
        await prisma.project.create({
            data: {
                ...otherData,
                tags: JSON.stringify(tags.split(",").map(t => t.trim())), // Store as JSON string in DB
                images: JSON.stringify(images), // Store as JSON string in DB
            },
        })
    } catch (error) {
        console.error("Failed to create project:", error)
        return { error: "Failed to create project. Slug might be taken." }
    }

    revalidatePath("/projects")
    revalidatePath("/admin/projects")
    revalidatePath("/")
    redirect("/admin/projects")
}

export async function updateProject(id: string, prevState: ProjectState, formData: FormData): Promise<ProjectState> {
    const tagsString = formData.get("tags") as string
    const imagesString = formData.get("images") as string

    const rawData: any = {
        title: formData.get("title"),
        slug: formData.get("slug"),
        shortDescription: formData.get("shortDescription"),
        description: formData.get("description"),
        tags: tagsString,
        demoUrl: formData.get("demoUrl"),
        repoUrl: formData.get("repoUrl"),
        featured: formData.get("featured") === "on",
        images: imagesString ? JSON.parse(imagesString) : [],
    }

    const validatedFields = ProjectFormSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            error: "Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { tags, images, ...otherData } = validatedFields.data

    try {
        await prisma.project.update({
            where: { id },
            data: {
                ...otherData,
                tags: JSON.stringify(tags.split(",").map(t => t.trim())),
                images: JSON.stringify(images),
            },
        })
    } catch (error) {
        console.error("Failed to update project:", error)
        return { error: "Failed to update project." }
    }

    revalidatePath("/projects")
    revalidatePath("/admin/projects")
    revalidatePath(`/projects/${otherData.slug}`)
    revalidatePath("/")
    redirect("/admin/projects")
}

export async function deleteProject(id: string) {
    try {
        await prisma.project.delete({
            where: { id },
        })
        revalidatePath("/admin/projects")
        revalidatePath("/projects")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        return { error: "Failed to delete project" }
    }
}

export async function getProjects(): Promise<ProjectWithParsedData[]> {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
    })
    return projects.map(p => ({
        ...p,
        tags: JSON.parse(p.tags) as string[],
        images: JSON.parse(p.images) as string[],
    }))
}

export async function getFeaturedProjects(): Promise<ProjectWithParsedData[]> {
    const projects = await prisma.project.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
        take: 6,
    })
    return projects.map(p => ({
        ...p,
        tags: JSON.parse(p.tags) as string[],
        images: JSON.parse(p.images) as string[],
    }))
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithParsedData | null> {
    const project = await prisma.project.findUnique({
        where: { slug },
    })
    if (!project) return null
    return {
        ...project,
        tags: JSON.parse(project.tags) as string[],
        images: JSON.parse(project.images) as string[],
    }
}

export async function getProjectById(id: string): Promise<ProjectWithParsedData | null> {
    const project = await prisma.project.findUnique({
        where: { id },
    })
    if (!project) return null
    return {
        ...project,
        tags: JSON.parse(project.tags) as string[], // It will be converted to comma string in the form
        images: JSON.parse(project.images) as string[],
    }
}
