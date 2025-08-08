import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useNavigate, useParams } from "react-router-dom"
import { type ProfileData } from "../ProfileList"
import axiosInstance, { protectedAxiosInstance } from "../api/base"
import ProjectsList from "../ProjectsList"

const initialData: ProfileData = {
    id: "1",
    name: "Leonardo",
    profession: "Frontend Developer",
    locality: "New Delhi",
    contact: "+91 99999 88888",
    description: "Passionate about React, TypeScript, and Tailwind.\nAlways learning.",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Leonardo"
}

function LoggedInProfileview() {
    const { id } = useParams()

    const [profile, setProfile] = useState<ProfileData>(initialData)
    const [isEditable, setEditable] = useState(false)

    const nav = useNavigate()

    useEffect(() => {
        (async () => {
            const response = await axiosInstance.get(`/profile/open/${id}`)
            setProfile(response.data)
        })()
    }, [id])

    const toggleEditable = async () => {
        setEditable(prev => !prev)
    }

    const handleSave = async () => {
        try {
            const response = await protectedAxiosInstance.put(`/profile/${id}`, {
                name: profile.name,
                profession: profile.profession,
                locality: profile.locality,
                contact: profile.contact,
                description: profile.description
            })

            console.log("Profile updated:", response.data)
            setEditable(false)
        } catch (error) {
            console.error("Failed to update profile:", error)
        }
    }

    const handleChange = (field: keyof ProfileData, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }))
    }

    const handleDetails = () => {
        nav('/project')
    }

    return (
        <div className="text-center">
            <div className="flex items-center justify-center min-h-full bg-gray-50 px-4 py-10">
                <Card className="w-full max-w-md shadow-xl border border-gray-200 rounded-2xl">
                    <CardHeader className="flex flex-col items-center text-center space-y-3">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={profile.avatarUrl} alt={profile.name.toUpperCase().charAt(0)} />
                            <AvatarFallback className="text-5xl text-center">
                                {profile.name.toUpperCase().charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-2xl font-bold">
                            <p>{profile.name}</p>
                        </CardTitle>
                        {isEditable ? (
                            <>
                                <p className="text-gray-500">Profession</p>
                                <Input
                                    id="profession"
                                    value={profile.profession}
                                    onChange={(e) => handleChange("profession", e.target.value)}
                                />
                            </>
                        ) : (
                            <p className="text-base text-gray-800">{profile.profession}</p>
                        )}
                    </CardHeader>

                    <CardContent className="space-y-4 px-6">
                        <div>
                            <p className="text-sm font-semibold text-gray-400">Locality</p>
                            {isEditable ? (
                                <Input
                                    id="locality"
                                    value={profile.locality}
                                    onChange={(e) => handleChange("locality", e.target.value)}
                                />
                            ) : (
                                <p className="text-base text-gray-800">{profile.locality}</p>
                            )}
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-400">Contact</p>
                            {isEditable ? (
                                <Input
                                    id="contact"
                                    value={profile.contact}
                                    onChange={(e) => handleChange("contact", e.target.value)}
                                />
                            ) : (
                                <p className="text-base text-gray-800">{profile.contact}</p>
                            )}
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-400">Description</p>
                            {isEditable ? (
                                <Input
                                    id="description"
                                    value={profile.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                />
                            ) : (
                                <p className="text-base text-gray-800">{profile.description}</p>
                            )}
                        </div>
                        <div className="flex justify-end pt-4 space-x-2">
                            <Button className="cursor-pointer" onClick={toggleEditable} variant="secondary">
                                {isEditable ? "Cancel" : "Edit"}
                            </Button>
                            {isEditable && (
                                <Button className="cursor-pointer" onClick={handleSave} variant="default">
                                    Save
                                </Button>
                            )}
                        </div>
                        {/* <div>
                            <Button variant={'outline'} className="cursor-pointer" onClick={handleDetails}>Details</Button>
                        </div> */}
                    </CardContent>
                </Card>
            </div>
            <div>
                <ProjectsList />
            </div>
        </div>
    )
}

export default LoggedInProfileview