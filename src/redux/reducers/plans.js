import { ACTIONS } from '../actions/plans'

const initialData = {
    plans: []
}

export default function reducer(state = initialData, action) {
    switch (action.type) {
        case ACTIONS.ADD_PLAN:
            return {
                ...state,
                plans: [...state.plans, action.payload]
            }
        case ACTIONS.UPDATE_PLAN:
            const _plans = [...state.plans]
            const index = _plans.findIndex(p => p.uuid === action.payload.uuid)
            if(index > -1) _plans[index] = action.payload

            return {
                ...state,
                plans: _plans
            }
        case ACTIONS.REMOVE_PLAN:
            return {
                ...state,
                plans: state.plans.filter(p => p.uuid !== action.payload)
            }
        default:
            return state
    }
}