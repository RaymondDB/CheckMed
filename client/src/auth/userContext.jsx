import {createContext, useState, useContext} from 'react';
import checkToken from "./checkToken";  

export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);


export const Provider = ({ children }) => {
    const [user, setUser] = useState({})
    checkToken();
    
    return (
        <UserContext.Provider value={[user, setUser]} >
            {children}
        </UserContext.Provider>
    )
}