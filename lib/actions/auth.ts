"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignJWT, jwtVerify } from "jose"

const SECRET_KEY = process.env.ADMIN_SECRET_KEY || "secret-key-change-me"
const key = new TextEncoder().encode(SECRET_KEY)

// Simple hardcoded admin credentials for this portfolio scope
// In a real app with multiple users, we'd query the DB.
// For now, checks against ADMIN_PASSWORD env var or defaults.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Create session
        const token = await new SignJWT({ email, role: "admin" })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(key)

        const cookieStore = await cookies()
        cookieStore.set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        })

        redirect("/admin")
    } else {
        return { error: "Invalid credentials" }
    }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
    redirect("/login")
}

export async function getSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")?.value
    if (!session) return null

    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ["HS256"],
        })
        return payload
    } catch (error) {
        return null
    }
}

export async function verifySession() {
    const session = await getSession();
    if (!session) {
        redirect('/login')
    }
    return session;
}
