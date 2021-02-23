import { createContext, useContext, useState } from 'react'
import { LOGIN } from 'src/api/auth'

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try{
            const res = await LOGIN({ username, password })
            setUser(res.data)

            return true
        }catch(err){
            return false
        }
    };

    const logout = () => {
        setUser(null)
        return true
    };

    return {
        user,
        login,
        logout
    };
}