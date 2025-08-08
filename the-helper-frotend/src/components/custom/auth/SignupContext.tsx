import React, { createContext, useContext, useState } from "react"

type SignupData = {
  name: string
  profession: string
  locality: string
  contact: string
  description?: string
  password?: string // added in PasswordForm
}

type SignupContextType = {
  signupData: Partial<SignupData>
  setSignupData: (data: Partial<SignupData>) => void
  clearSignupData: () => void
}

const SignupContext = createContext<SignupContextType | undefined>(undefined)

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [signupData, setSignupDataState] = useState<Partial<SignupData>>({})

  const setSignupData = (data: Partial<SignupData>) => {
    setSignupDataState(prev => ({ ...prev, ...data }))
  }

  const clearSignupData = () => setSignupDataState({})

  return (
    <SignupContext.Provider value={{ signupData, setSignupData, clearSignupData }}>
      {children}
    </SignupContext.Provider>
  )
}

export const useSignup = () => {
  const context = useContext(SignupContext)
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider")
  }
  return context
}
