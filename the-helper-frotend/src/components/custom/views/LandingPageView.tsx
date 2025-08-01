import axiosInstance from '../api/base'
import { ProfileList, type ProfileData } from '../ProfileList'
import { useEffect, useState } from 'react'

const people = [
    {
        id: "1",
        name: "---- ----",
        profession: "---------",
        locality: "------- ---------",
        contact: "----------",
        description: "--------- --------- --------- ---------.",
        avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: "2",
        name: "---- ----",
        profession: "---------",
        locality: "------- ---------",
        contact: "----------",
        description: "--------- --------- --------- ---------.",
        avatarUrl: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
        id: "3",
        name: "---- ----",
        profession: "---------",
        locality: "------- ---------",
        contact: "----------",
        description: "--------- --------- --------- ---------.",
        avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: "4",
        name: "---- ----",
        profession: "---------",
        locality: "------- ---------",
        contact: "----------",
        description: "--------- --------- --------- ---------.",
        avatarUrl: "https://randomuser.me/api/portraits/men/46.jpg"
    }
]


function LandingPageView() {
    const [profileData, setProfileData] = useState<ProfileData[]>(people)

    const fetchProfiles = async () => {
        const response = await axiosInstance.put('/profile/open', {})

        const responseData: ProfileData[] = await response.data
        setProfileData(responseData)
    }

    useEffect(() => {
        fetchProfiles()
    }, [])

    return (
        <ProfileList data={profileData} />
    )
}

export default LandingPageView