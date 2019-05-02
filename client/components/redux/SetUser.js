export const SET_USER = "SET_USER"

export const setUserAction = (user) => {
    return {
        type: SET_USER,
        user
    }    
}

const initialState = {
    authed: false,
    user: {}
}

export const SetUserReducer = (state = initialState, action) => {
    // console.log('SetUserReducer', state, action)
    switch (action.type) {
        case SET_USER: 
            return {
                authed: Object.keys(action.user).length != 0,
                user: action.user
            }
        default: return state
    }
}
