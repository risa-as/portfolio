"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { createProject, updateProject, ProjectState } from "@/lib/actions/project"
import { ProjectFormSchema, ProjectFormValues } from "@/lib/validations/project"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { UploadButton } from "@/lib/uploadthing"
import { toast } from "sonner"
import { Loader2, X } from "lucide-react"
import Image from "next/image"

interface ProjectFormProps {
    project?: any // Type strictly if possible, essentially prisma Project with parsed tags/images
    isEdit?: boolean
}

export function ProjectForm({ project, isEdit = false }: ProjectFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [images, setImages] = useState<string[]>(project?.images || [])

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(ProjectFormSchema),
        defaultValues: {
            title: project?.title || "",
            slug: project?.slug || "",
            shortDescription: project?.shortDescription || "",
            description: project?.description || "",
            tags: project?.tags ? project.tags.join(", ") : "",
            demoUrl: project?.demoUrl || "",
            repoUrl: project?.repoUrl || "",
            featured: project?.featured || false,
            images: project?.images || [], // This field is technically hidden in our form logic visually but needed for zod
        },
    })

    async function onSubmit(data: ProjectFormValues) {
        setIsSubmitting(true)
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("slug", data.slug)
        formData.append("shortDescription", data.shortDescription)
        formData.append("description", data.description)
        formData.append("tags", data.tags)
        formData.append("demoUrl", data.demoUrl || "")
        formData.append("repoUrl", data.repoUrl || "")
        formData.append("featured", data.featured ? "on" : "off")
        formData.append("images", JSON.stringify(images))

        let result: ProjectState
        try {
            if (isEdit && project?.id) {
                result = await updateProject(project.id, {}, formData)
            } else {
                result = await createProject({}, formData)
            }

            if (result?.error) {
                toast.error(result.error)
            } else if (result?.errors) {
                // Handle field errors if returned flattened
                toast.error("Validation failed")
            } else {
                toast.success(isEdit ? "Project updated" : "Project created")
                // Redirect is handled in server action, but just in case
            }
        } catch (e) {
            toast.error("Something went wrong")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleRemoveImage = (urlToRemove: string) => {
        setImages(prev => prev.filter(url => url !== urlToRemove))
        form.setValue("images", images.filter(url => url !== urlToRemove)) // Update form state too
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl bg-card p-6 rounded-xl border shadow-sm">
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Project Title" {...field}
                                        onChange={(e) => {
                                            field.onChange(e)
                                            // Auto-generate slug if new
                                            if (!isEdit) {
                                                form.setValue("slug", e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="project-slug" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Brief summary of the project..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Description (Markdown supported)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Detailed description..." className="min-h-[150px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags (comma separated)</FormLabel>
                            <FormControl>
                                <Input placeholder="React, Next.js, Tailwind..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="demoUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Live Demo URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="repoUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GitHub Repo URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://github.com/..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                <div>
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        {images.map((url, i) => (
                                            <div key={i} className="relative w-24 h-24 rounded-md overflow-hidden border">
                                                <Image src={url} alt="Project image" fill className="object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(url)}
                                                    className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-0.5"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            const newImages = res.map(r => r.url)
                                            setImages(prev => [...prev, ...newImages])
                                            toast.success("Upload Completed")
                                            const currentImages = form.getValues("images") || []
                                            form.setValue("images", [...currentImages, ...newImages])
                                        }}
                                        onUploadError={(error: Error) => {
                                            toast.error(`ERROR! ${error.message}`);
                                        }}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Featured Project
                                </FormLabel>
                                <FormDescription>
                                    This project will appear on the homepage.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEdit ? "Update Project" : "Create Project"}
                </Button>
            </form>
        </Form>
    )
}
