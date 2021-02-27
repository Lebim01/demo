import { createContext, useContext, useState } from 'react'
import { LOGIN } from 'src/api/auth'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';

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
    const [error, setError] = useState(null);
    const dispatch = useDispatch()
    
    const _token = useSelector(state => state.token)
    const _user = useSelector(state => state.user)

    useEffect(() => {
        if(_token){
            initUser(_user, _token)
        }
    }, [_token])

    const initUser = (user, token) => {
        setUser(user)
        axios.defaults.headers = {
            'Authorization': 'JWT '+token
        }
    }

    const login = async (username, password) => {
        try{
            const res = await LOGIN({ username, password })
            setError('')
            dispatch({
                type: 'set',
                token: res.data.token,
                user: res.data.user
            })
            return true
        }catch(err){
            setError(err.response.data)
            return false
        }
    };

    const logout = () => {
        setUser(null)
        dispatch({
            type: 'set',
            token: '',
            user: null
        })
        return true
    };

    return {
        user,
        login,
        logout,
        error
    };
}