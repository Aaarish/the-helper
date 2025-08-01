import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    profession: z.string().min(1, "Profession is required"),
    locality: z.string().min(1, "Locality is required"),
    contact: z.string().min(1, "Contact is required"),
    description: z.string().optional()
})

type SignupFormData = z.infer<typeof formSchema>

type Props = {
    initialValues?: Partial<SignupFormData>
    onSubmit?: (data: SignupFormData) => void
}

export const SignupForm: React.FC<Props> = ({ initialValues = {}, onSubmit }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<SignupFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    })

    const nav = useNavigate()

    const handleFormSubmit = (data: SignupFormData) => {
        onSubmit?.(data)
    }

    const handleClear = () => {
        reset()
    }

    const handleNext = () => {
        nav("/signup/password")
    }

    return (
        <Card className="max-w-xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-center"><strong>The Helper</strong></CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" {...register("name")} required />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="profession">Profession</Label>
                        <Input id="profession" {...register("profession")} required />
                        {errors.profession && <p className="text-sm text-red-500">{errors.profession.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="locality">Locality</Label>
                        <Input id="locality" {...register("locality")} required />
                        {errors.locality && <p className="text-sm text-red-500">{errors.locality.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contact">Contact</Label>
                        <Input id="contact" {...register("contact")} required />
                        {errors.contact && <p className="text-sm text-red-500">{errors.contact.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" rows={6} {...register("description")} />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button className="cursor-pointer" type="button" onClick={handleNext}>Next</Button>
                        <Button className="cursor-pointer" type="button" variant="outline" onClick={handleClear}>
                            Clear
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
