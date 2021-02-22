import { v4 as uuidv4 } from 'uuid';

export const ACTIONS = {
    ADD_PLAN: "ADD_PLAN",
    REMOVE_PLAN: "REMOVE_PLAN",
    UPDATE_PLAN: "UPDATE_PLAN",
}

export const addPlan = (data) => {
    return {
        type: ACTIONS.ADD_PLAN,
        payload: {
            ...data,
            uuid: uuidv4()
        }
    }
}

export const updatePlan = (uuid, data) => {
    return {
        type: ACTIONS.UPDATE_PLAN,
        payload: {
            ...data,
            uuid
        }
    }
}

export const removePlan = (uuid) => {
    return {
        type: ACTIONS.REMOVE_PLAN,
        payload: uuid
    }
}