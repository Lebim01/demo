import { ACTIONS } from '../actions/users'

const initialData = {
    users: [],
    logged: null
}

export default function reducer(state = initialData, action) {
    switch (action.type) {
        case ACTIONS.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case ACTIONS.LOGIN:
            return {
                ...state,
                logged: action.payload
            }
        case ACTIONS.LOGOUT:
            return {
                ...state,
                logged: null
            }
        default:
            return state
    }
}