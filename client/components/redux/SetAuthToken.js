import axios from 'axios'

export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN"

export const setAuthTokenAction = (jwt) => {

    if (jwt) {
        // console.log('store')
        localStorage.setItem('jwt', jwt)
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
    } else {
        // console.log('remove')
        localStorage.removeItem('jwt')
        delete axios.defaults.headers.common['Authorization'] 
    }

    return {
        type: SET_AUTH_TOKEN,
        // jwt
    }    
}

export const SetAuthTokenReducer = (state = {}, action) => {
    // console.log('addJWTReducer', state, action)
    switch (action.type) {
        // case SET_AUTH_TOKEN: return {...state, jwt: action.jwt}
        default: return state
    }
}
