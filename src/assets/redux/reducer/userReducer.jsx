const initialState = {
    firstname: null,
    lastname: null,
}

export const userReducer = (state = initialState, action)=> {
    console.log(action.payload)
    switch (action.type) {
        case 'STORE_USER_PROFILE':
            return {
                ...state,
                firstname: action.payload.firstName,
                lastname: action.payload.lastName,
            }
            
        default:
            return state;
    }
}