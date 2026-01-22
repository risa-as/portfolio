import { z } from "zod"

export const ProjectFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
    shortDescription: z.string().min(10, "Short description must be at least 10 characters").max(255, "Short description must be at most 255 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    tags: z.string().min(1, "At least one tag is required"), // Comma separated string for input
    demoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    repoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    images: z.array(z.string().url()).optional(), // Array of URLs
    featured: z.boolean(),
})

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>
