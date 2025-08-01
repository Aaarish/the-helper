import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useParams } from "react-router-dom"
import type { ProfileData } from "../ProfileList"
import axiosInstance from "../api/base"

const initialData: ProfileData = {
    id: "1",
    name: "Leonardo",
    profession: "Frontend Developer",
    locality: "New Delhi",
    contact: "+91 99999 88888",
    description: "Passionate about React, TypeScript, and Tailwind.\nAlways learning.",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Leonardo"
}

const ProfileView = () => {
    const { id } = useParams()

    const [profile, setProfile] = useState<ProfileData>(initialData)
    const [isEditable, setEditable] = useState(false)

    useEffect(() => {
        (async () => {
            const data = await axiosInstance.get(`/profile/open/${id}`)
            setProfile(data.data)
        })()
    }, [])

    const toggleEditable = () => {
        setEditable(prev => !prev)
    }

    return (
        <div className="flex items-center justify-center min-h-full bg-gray-50 px-4 py-10">
            <Card className="w-full max-w-md shadow-xl border border-gray-200 rounded-2xl">
                <CardHeader className="flex flex-col items-center text-center space-y-3">
                    <Avatar className="w-24 h-24">
                        <AvatarImage alt={profile.name.toUpperCase().charAt(0)} />
                        <AvatarFallback className="text-5xl text-center">{profile.name.toUpperCase()?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl font-bold">
                        <button onClick={toggleEditable}>
                            {isEditable ? <Input id="name" value={profile.name} onChange={(e) => e.target.value} /> : <p>{profile.name}</p>}
                        </button>
                    </CardTitle>
                    <p className="text-gray-500">{profile.profession}</p>
                </CardHeader>
                <CardContent className="space-y-4 px-6">
                    <div>
                        <p className="text-sm font-semibold text-gray-400">Locality</p>
                        <p className="text-base text-gray-800">{profile.locality}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-400">Contact</p>
                        <p className="text-base text-gray-800">{profile.contact}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-400">Description</p>
                        <p className="text-base text-gray-800 whitespace-pre-line">{profile.description}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileView
