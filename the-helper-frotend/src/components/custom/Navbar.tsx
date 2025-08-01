import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { X, UserIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-10">
            <div className="flex justify-between items-center mb-6 bg-white px-4 p-2 rounded-lg shadow ">
                <Link to="/" className="text-xl font-bold text-gray-800">
                    <h1>The Helper</h1>
                </Link>
                <div className="hidden md:flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="rounded-full cursor-pointer">
                                <UserIcon className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-44">
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link to="/signup">Login / Signup</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <Link to="/profile">View Profile</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Mobile - Hamburger Icon */}
                <div className="md:hidden flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <UserIcon className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden px-4 pb-4">
                    <div className="flex flex-col gap-2">
                        <Link to="/signup">
                            <Button variant="ghost">
                                Login / Signup
                            </Button>
                        </Link>
                        <Link to="/profile">
                            <Button variant="ghost">
                                View Profile
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
