import { combineReducers } from 'redux'

import { LocaleReducer } from './Localization'
import { SetAuthTokenReducer } from "./SetAuthToken"
import { SetUserReducer } from './SetUser'

export default combineReducers({
    LocaleReducer,
    SetAuthTokenReducer,
    SetUserReducer
})
