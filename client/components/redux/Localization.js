export const FETCH_LOCAL = "FETCH_LOCAL"

export const localeAction = (code) => {
    let locale
    try {
        locale = require('../../locale/' + code + '.json')
    } catch (ex) {
        locale = require('../../locale/en.json')
    }

    return {
        type: FETCH_LOCAL,
        locale
    }    
}

export const LocaleReducer = (state = {}, action) => {
    // console.log('LocaleReducer', state, action)
    switch (action.type) {
        case FETCH_LOCAL: return {...state, locale: action.locale}
        default: return state
    }
}
