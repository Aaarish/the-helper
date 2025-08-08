// src/components/Project.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

type ProjectProps = {
    title: string
    description: string
    owner: string
    projectUrl: string
    projectImage?: string
    teamMembers: string[]
}

export function Project({
    title,
    description,
    owner,
    projectUrl,
    projectImage,
    teamMembers
}: ProjectProps) {
    // Truncate description for collapsed view
    const shortDescription = description.split(" ").slice(0, 15).join(" ") + (description.split(" ").length > 15 ? "..." : "")

    return (
        <Accordion type="single" collapsible className="w-full rounded-lg shadow-lg">
            <AccordionItem value="project">
                <AccordionTrigger>
                    <div className="flex items-center gap-4">
                        <img
                            src={projectImage}
                            alt={title}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="text-left">
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <p className="text-sm text-gray-500">{shortDescription}</p>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <Card className="mt-4">
                        <CardContent className="p-4 space-y-3">
                            <img
                                src={projectImage}
                                alt={title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <p className="text-gray-700">{description}</p>
                            <p className="text-sm"><strong>Owner:</strong> {owner}</p>
                            <p className="text-sm"><strong>Project URL:</strong> <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{projectUrl}</a></p>
                            <p className="text-sm"><strong>Team Members:</strong> {teamMembers.join(", ")}</p>
                        </CardContent>
                    </Card>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
