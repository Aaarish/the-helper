import { Route } from 'lucide-react'
import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import LandingPageView from './LandingPageView'
import { SignupForm } from '../SignupForm'

function Layout() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPageView />} />
                <Route path="signup" element={<SignupForm />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Layout