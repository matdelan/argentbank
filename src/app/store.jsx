import { userReducer } from '../assets/redux/reducer/userReducer'
import { createStore, combineReducers } from '@reduxjs/toolkit'
import { loginReducer } from '../assets/redux/reducer/loginReducer'

const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer
})

const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store