"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/lib/actions/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Contact() {
    const [state, formAction, isPending] = useActionState(submitContactForm, {});

    useEffect(() => {
        if (state.success) {
            toast.success("Message sent successfully!");
        } else if (state.error) {
            toast.error(state.error);
        }
    }, [state]);

    return (
        <section className="py-20 relative bg-neutral-900 antialiased" id="contact">
            <div className="max-w-2xl mx-auto p-4 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 text-white">
                    Contact Me
                </h2>
                <p className="text-neutral-400 text-center mb-8">
                    Interested in working together? Send me a message.
                </p>

                <form action={formAction} className="space-y-4">
                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Your Email"
                            required
                            className="w-full p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {state.errors?.email && (
                            <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
                        )}
                    </div>
                    <div>
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            required
                            rows={5}
                            className="w-full p-4 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        ></textarea>
                        {state.errors?.message && (
                            <p className="text-red-500 text-sm mt-1">{state.errors.message[0]}</p>
                        )}
                    </div>
                    <Button
                        disabled={isPending}
                        type="submit"
                        className={cn("w-full h-12 text-lg font-semibold", isPending && "opacity-50")}
                        variant="default"
                    >
                        {isPending ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </div>
        </section>
    );
}
