"use server"

import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const ContactSchema = z.object({
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactState = {
    success?: boolean
    error?: string
    errors?: {
        email?: string[]
        message?: string[]
    }
}

export async function submitContactForm(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const validatedFields = ContactSchema.safeParse({
        email: formData.get("email"),
        message: formData.get("message"),
    })

    if (!validatedFields.success) {
        return {
            error: "Validation failed",
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        await prisma.message.create({
            data: {
                email: validatedFields.data.email,
                message: validatedFields.data.message,
            },
        })

        revalidatePath("/admin/messages") // Assuming we'll have an admin view for messages eventually
        return { success: true }
    } catch (error) {
        console.error("Failed to save message:", error)
        return { error: "Failed to send message. Please try again later." }
    }
}
