
export const userReducer = (state,action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return{
                ...state,
                userInfo:action.payload
            }
        case 'USER_ERROR':
            return{
                ...state,
                userInfo:null,
                error:action.payload
            }
        case 'USER_LOGOUT':
            return{
                ...state,
                userInfo:null,
                error:null,
                loading:false
            }
    
        default:
            return state;
    }
}