import React from 'react';
import { createContext, ReactNode, useContext, useState } from "react";


type Props = {
    children: ReactNode;
};

type AuthContextProps = {
    auth: object;
    setAuth: React.Dispatch<React.SetStateAction<object>>;
    usrEmail: string;
    setUsrEmail: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    switchLogin: boolean;
    setSwitchLogin: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: () => void;
    eraseAll: () => void;
};

const AuthContext = createContext({} as AuthContextProps);

export function useAuthLogin() {
    return useContext(AuthContext)
};

export function AuthProvider({ children }: Props) {

    const [auth, setAuth] = useState<object>({});
    const [switchLogin, setSwitchLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [usrEmail, setUsrEmail] = useState("");

    const toggle = () => {
        setSwitchLogin(!switchLogin);
    };

    const eraseAll = () => {
        setUsrEmail("");
    };

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            usrEmail,
            setUsrEmail,
            email,
            setEmail,
            switchLogin,
            setSwitchLogin,
            toggle,
            eraseAll
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};