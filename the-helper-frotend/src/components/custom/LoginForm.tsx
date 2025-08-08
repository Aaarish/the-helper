import z from "zod"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "./api/base"
import { useAuth } from "./auth/AuthContext"
import { Button } from "../ui/button"

const loginFormSchema = z.object({
    username: z.string().min(1, "Name is required"),
    password: z.string().min(1, "Password is required")
})

export type LoginFormData = z.infer<typeof loginFormSchema>

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema)
    })

    const { setAuth } = useAuth()

    const loginMutation = useMutation({
        mutationFn: async (loginData: LoginFormData) => {
            const response = await axiosInstance.post("/auth/login", loginData)
            return response.data
        },
        onSuccess: (data) => {
            setAuth({ userId: data.userId, token: data.token })
            window.location.href="/"
        },
        onError: (error) => {
            console.error("Signup failed", error)
            alert("Login failed. Try again.")
        }
    })

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data)
    }

    return (
        <Card className="max-w-xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-center"><strong>The Helper</strong></CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Phone Number</Label>
                        <Input id="username" {...register("username")} required />
                        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" {...register("password")} required />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>
                    <div className='text-center pt-4'>
                        <Button className="cursor-pointer" type="submit" disabled={loginMutation.isPending}>
                            {loginMutation.isPending ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginForm