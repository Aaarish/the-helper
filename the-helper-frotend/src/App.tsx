import { Navbar } from "./components/custom/Navbar"
import LandingPageView from "./components/custom/views/LandingPageView"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { SignupForm } from "./components/custom/SignupForm"
import ProfileView from "./components/custom/views/ProfileView"
import PasswordForm from "./components/custom/PasswordForm"
import LoginForm from "./components/custom/LoginForm"
import LoggedInProfileview from "./components/custom/views/LoggedInProfileview"
import { Project } from "./components/custom/Project"
import ProjectsList from "./components/custom/ProjectsList"

// const professions = ["Designer", "Engineer", "Manager"]
// const localities = ["Mumbai", "Delhi", "Bangalore"]

function App() {
  // const [search, setSearch] = useState("")
  // const [professionFilter, setProfessionFilter] = useState("")
  // const [localityFilter, setLocalityFilter] = useState("")

  return (
    <>
      <Navbar />
      {/* <LandingPageView /> */}
      <Routes>
        <Route path="/" element={<LandingPageView />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup/password" element={<PasswordForm />} />
        <Route path="/profiles/:id" element={<ProfileView />} />
        <Route path="/profile/:id" element={<LoggedInProfileview />} />
        <Route path="/project" element={<ProjectsList />} />
      </Routes>

      {/* <Profile name="test" profession="electrician" locality="Darya Ganj" contact="9876543210" /> */}
    </>
  )
}

export default App
