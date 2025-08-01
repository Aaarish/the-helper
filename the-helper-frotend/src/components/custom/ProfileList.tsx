import { useEffect, useRef, useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Profile from "./Profile"


export type ProfileData = {
    id: string,
    name: string
    profession: string
    locality: string
    contact: string,
    description: string,
    avatarUrl?: string
}

type Props = {
    data: ProfileData[]
}

export const ProfileList: React.FC<Props> = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [professionFilter, setProfessionFilter] = useState("")
    const [localityFilter, setLocalityFilter] = useState("")
    const [visibleCount, setVisibleCount] = useState(6)
    const observerRef = useRef<HTMLDivElement | null>(null)

    const filteredData = useMemo(() => {
        return data.filter(({ name, profession, locality }) => {
            const searchMatch =
                name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
                locality.toLowerCase().includes(searchTerm.toLowerCase())

            const professionMatch = professionFilter ? profession === professionFilter : true
            const localityMatch = localityFilter ? locality === localityFilter : true

            return searchMatch && professionMatch && localityMatch
        })
    }, [searchTerm, professionFilter, localityFilter, data])

    const visibleData = filteredData.slice(0, visibleCount)

    // Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setVisibleCount(prev => Math.min(prev + 3, filteredData.length))
                }
            },
            { threshold: 1 }
        )
        const current = observerRef.current
        if (current) observer.observe(current)
        return () => {
            if (current) observer.unobserve(current)
        }
    }, [filteredData.length])

    const professions = [...new Set(data.map(p => p.profession))]
    const localities = [...new Set(data.map(l => l.locality))]

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6 sticky top-0 z-10 bg-white p-2 rounded-lg shadow ">
                <Input
                    placeholder="Search by name, profession, or locality..."
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value)
                        setVisibleCount(6)
                    }}
                />

                <Select value={professionFilter} onValueChange={value => {
                    setProfessionFilter(value)
                    setVisibleCount(6)
                }}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by Profession" />
                    </SelectTrigger>
                    <SelectContent>
                        {professions.map(p => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={localityFilter} onValueChange={value => {
                    setLocalityFilter(value)
                    setVisibleCount(6)
                }}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by Locality" />
                    </SelectTrigger>
                    <SelectContent>
                        {localities.map(l => (
                            <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <button
                    onClick={() => {
                        setSearchTerm("")
                        setProfessionFilter("")
                        setLocalityFilter("")
                        setVisibleCount(6)
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-lg border border-gray-300 transition"
                >
                    Clear
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {visibleData.map((ProfileData) => (
                    <Profile key={ProfileData.id} {...ProfileData} />
                ))}
            </div>

            {visibleCount < filteredData.length && (
                <div ref={observerRef} className="h-10 mt-4 text-center text-gray-400">
                    Loading more...
                </div>
            )}

            {filteredData.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No results found.</p>
            )}
        </div>
    )
}
