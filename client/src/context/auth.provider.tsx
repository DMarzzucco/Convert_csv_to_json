import React, { createContext, useContext } from "react"
export interface contextProp {
    user?: string
}
export interface ProviderInt { children: JSX.Element }

export const AuthContext = createContext<contextProp | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) { throw new Error(`${Error}`) }
    return context
}
const AuthProvider: React.FC<ProviderInt> = ({ children }) => {
    return (
        <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
    )
}
export default AuthProvider;
