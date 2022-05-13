import { createContext } from "react";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
};

// create context
export const UserContext = createContext(initialState);

// provider component
export const UserProvider = ({children}) => {
    // reducer


    // actions

    return(
        <UserContext.Provider
            value={{
                
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

