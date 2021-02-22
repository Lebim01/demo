export const ACTIONS = {
    ADD_USER: "ADD_USER",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
}

export const addUser = (data) => {
    return {
        type: ACTIONS.ADD_USER,
        payload: data
    }
}

export const login = (user) => {
    return {
        type: ACTIONS.LOGIN,
        payload: user
    }
}

export const logout = (user) => {
    return {
        type: ACTIONS.LOGOUT,
        payload: user
    }
}