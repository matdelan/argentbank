const initialState = {
    connect: false,
    token: null,
}

export const loginReducer = (state = initialState, action)=> {
    switch (action.type) {
        case 'LOGIN_SUCCESS': 
            return {
                ...state,
                connect: true,
                token: action.payload,
            }
        case 'LOGIN_FAIL': 
            return {
                ...state,
                connect: false,
                token: null
            }
        case 'LOGOUT': {
            return initialState
        }
        default:
            return state;
    }
}