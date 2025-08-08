import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from './auth/AuthContext'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from './api/base'
import { useSignup } from './auth/SignupContext'

const passwordFormSchema = z.object({
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(2, "Password is required"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

type PasswordSignupFormData = z.infer<typeof passwordFormSchema>

const PasswordForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<PasswordSignupFormData>({
        resolver: zodResolver(passwordFormSchema)
    })

    const { signupData } = useSignup()
    const { setAuth } = useAuth()

    const signupMutation = useMutation({
        mutationFn: async (passwordData: PasswordSignupFormData) => {
            const completeData = { ...signupData, password: passwordData.password }
            const response = await axiosInstance.post("/auth/signup", completeData)
            return response.data
        },
        onSuccess: (data) => {
            setAuth({ userId: data.userId, token: data.token })
            window.location.href="/"
        },
        onError: (error) => {
            console.error("Signup failed", error)
            alert("Signup failed. Try again.")
        }
    })

    const onSubmit = (data: PasswordSignupFormData) => {
        signupMutation.mutate(data)
    }

    return (
        <Card className="max-w-xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-center"><strong>The Helper</strong></CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type='password' {...register("password")} required />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type='password' {...register("confirmPassword")} required />
                        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
                    <div className='text-center pt-4'>
                        <Button className="cursor-pointer" type="submit" disabled={signupMutation.isPending}>
                            {signupMutation.isPending ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default PasswordForm