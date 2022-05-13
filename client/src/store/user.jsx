import React, { createContext, useReducer } from 'react'
import { userReducer } from './reducers/userReducer';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    loading:false,
    error: null
}

export const UserContext = createContext(initialState);

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer,initialState);

    // actions
    const userLogin = (payload) => {
        localStorage.setItem('userInfo',JSON.stringify({userInfo:payload}));
        dispatch({
            type:'USER_LOGIN',
            payload
        })
    }

    const loginError = (payload) => {
        localStorage.removeItem('userInfo');
        dispatch({
            type:'USER_ERROR',
            payload
        })
    }

    const logout = () => {
        localStorage.removeItem('userInfo');
        dispatch({
            type:'USER_LOGOUT',
        })
    }

    
    return (
        <UserContext.Provider
            value={{
                state,
                userLogin,
                loginError,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    )

}