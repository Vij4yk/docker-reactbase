export const FETCH_LOCAL = "FETCH_LOCAL"

export const fetchLocale = (code) => {
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
