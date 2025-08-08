import React, { createContext, useContext, useState } from "react"

type AuthData = {
  userId: string
  token: string
}

type AuthContextType = {
  auth: AuthData | null
  setAuth: (auth: AuthData | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData | null>(() => {
    const stored = localStorage.getItem("auth")
    return stored ? JSON.parse(stored) : null
  })

  const updateAuth = (auth: AuthData | null) => {
    setAuth(auth)
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth))
    } else {
      localStorage.removeItem("auth")
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth: updateAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
