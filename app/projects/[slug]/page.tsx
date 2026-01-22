import { getProjectBySlug } from "@/lib/actions/project"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, Globe } from "lucide-react"
import { BackgroundBeams } from "@/components/ui/background-beams"

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    return (
        <article className="min-h-screen bg-black antialiased relative overflow-hidden">

            <div className="relative z-10 pt-20 px-4 max-w-7xl mx-auto space-y-12 pb-20">
                <Link href="/" className="inline-flex items-center text-neutral-400 hover:text-white transition-colors group">
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>

                <header className="space-y-6 text-center">
                    <h1 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 tracking-tighter">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                        {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 pt-4">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-4 py-1.5 bg-neutral-900/50 border border-neutral-700/50 backdrop-blur-sm rounded-full text-sm text-neutral-300 font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-center gap-6 pt-6">
                        {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="rounded-full px-8 text-lg gap-2 shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] transition-all duration-300">
                                    <Globe className="h-5 w-5" /> Live Demo
                                </Button>
                            </a>
                        )}
                        {project.repoUrl && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" variant="outline" className="rounded-full px-8 text-lg gap-2 bg-black/50 border-neutral-700 hover:bg-neutral-900 transition-all duration-300">
                                    <Github className="h-5 w-5" /> View Code
                                </Button>
                            </a>
                        )}
                    </div>
                </header>

                {project.images && project.images.length > 0 && (
                    <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl mx-auto max-w-5xl group">
                        <div className="aspect-video relative">
                            <Image
                                src={project.images[0]}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                )}

                <div className="prose prose-invert prose-lg max-w-4xl mx-auto bg-neutral-900/30 p-8 md:p-12 rounded-3xl border border-neutral-800/50 backdrop-blur-sm">
                    {project.description.split('\n').map((line: string, i: number) => (
                        <p key={i} className="text-neutral-300 leading-relaxed mb-6">{line}</p>
                    ))}
                </div>

                {project.images && project.images.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 max-w-6xl mx-auto">
                        {project.images.slice(1).map((img, idx) => (
                            <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden border border-neutral-800 group hover:ring-2 hover:ring-primary/50 transition-all duration-300">
                                <Image
                                    src={img}
                                    alt={`${project.title} screenshot ${idx + 2}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <BackgroundBeams />
        </article>
    )
}
