import { CopyIcon, PhoneIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Link } from "react-router-dom"
// import { useState } from "react"


type ProfileProps = {
    id: string,
    name: string,
    profession: string,
    locality: string,
    contact: string,
    description: string,
    avatarUrl?: string
}

const Profile: React.FC<ProfileProps> = ({
    id,
    name,
    profession,
    locality,
    contact,
    avatarUrl
}) => {
    const isPhone = /^\+?\d+$/.test(contact)

    const handleCopy = () => {
        navigator.clipboard.writeText(contact)
        // toast({ title: "Copied to clipboard", description: contact })
    }

    return (
        <Card className="w-full max-w-sm shadow-xl rounded-2xl border border-gray-200">
            <Link to={`/profile/${id}`} className="no-underline">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback>{name.toUpperCase().charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div>
                        <CardTitle className="text-lg">{name}</CardTitle>
                        <CardDescription>{profession.charAt(0).toUpperCase() + profession.slice(1)}</CardDescription>
                    </div>
                </CardHeader>
            </Link>
            <CardContent className="text-sm text-gray-700 space-y-1">
                <p><strong>Locality:</strong> {locality}</p>
                <div className="flex items-center justify-between">
                    <p><strong>Contact:</strong> {contact}</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={handleCopy} className="cursor-pointer">
                            <CopyIcon className="w-4 h-4" />
                        </Button>
                        {isPhone && (
                            <Link to={`tel:${contact}`}>
                                <Button variant="outline" size="icon" className="cursor-pointer">
                                    <PhoneIcon className="w-4 h-4" />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Profile