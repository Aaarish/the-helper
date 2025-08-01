import { Navbar } from "./components/custom/Navbar"
import LandingPageView from "./components/custom/views/LandingPageView"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { SignupForm } from "./components/custom/SignupForm"
import ProfileView from "./components/custom/views/ProfileView"
import PasswordForm from "./components/custom/PasswordForm"

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
        <Route path="/signup/password" element={<PasswordForm />} />
        <Route path="/profile/:id" element={<ProfileView />} />
      </Routes>

      {/* <Profile name="test" profession="electrician" locality="Darya Ganj" contact="9876543210" /> */}
    </>
  )
}

export default App
