import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useSignup } from "./auth/SignupContext"

const signupFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    profession: z.string().min(1, "Profession is required"),
    locality: z.string().min(1, "Locality is required"),
    contact: z.string().min(1, "Contact is required"),
    description: z.string().optional(),
})

export type SignupFormData = z.infer<typeof signupFormSchema>

type Props = {
    initialValues?: Partial<SignupFormData>
    // onSubmit?: (data: SignupFormData) => void
}

export const SignupForm: React.FC<Props> = ({ initialValues = {} }) => {
    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors }
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: initialValues
    })

    const { setSignupData } = useSignup()
    const nav = useNavigate()

    // const handleClear = () => {
    //     reset()
    // }

    const onSubmit = (data: SignupFormData) => {
        setSignupData(data)
        nav("/signup/password")
    }

    return (
        <Card className="max-w-xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-center"><strong>The Helper</strong></CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                    <div className="flex justify-center gap-4 pt-4">
                        <Button className="cursor-pointer" type="submit">Next</Button>
                        {/* <Button className="cursor-pointer" type="button" variant="outline" onClick={handleClear}>
                            Clear
                        </Button> */}
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-center text-gray-500">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
            </CardFooter>
        </Card >
    )
}
