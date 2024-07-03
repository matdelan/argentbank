const initialState = {
    status: null,
    message: null,
    token: null,
}

export const loginReducer = (state = initialState, action)=> {
    switch (action.type) {
        case loginOk: 
            return {
                ...state,
                status: "OK",
                token: action,

            }
        case loginFail: 
            return {
                ...state,
                status: "Failed"
            }
    }
}