import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(2, "Password is required"),
})

type SignupFormData = z.infer<typeof formSchema>

type Props = {
    initialValues?: Partial<SignupFormData>
    onSubmit?: (data: SignupFormData) => void
}

const PasswordForm: React.FC<Props> = ({ initialValues = {}, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignupFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    })

    const handleFormSubmit = (data: SignupFormData) => {
        onSubmit?.(data)
    }

    return (
        <Card className="max-w-xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-center"><strong>The Helper</strong></CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
                        <Button className="cursor-pointer" type="button">Submit</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default PasswordForm