

import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export const  AuthProviderTemp = ({ children }) => {

    const getUserSingUp = () => {
        return JSON.parse(localStorage.getItem('userFront'));
    };
    const singUpUser = (userFront) => {
        localStorage.setItem('userFront', JSON.stringify(userFront));
    };
    const getUserFront = () => {
        return JSON.parse(localStorage.getItem('userFront'));
    };
    const loginUserFront = (userFront) => {
        localStorage.setItem('userFront', JSON.stringify(userFront));
    };

    const logoutUserFront = () => {
        localStorage.removeItem('userFront');
    };

    return (
        <AuthContext.Provider value={{ getUserFront, loginUserFront, logoutUserFront ,getUserSingUp ,singUpUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthTemp = () => {
    return useContext(AuthContext);
};
