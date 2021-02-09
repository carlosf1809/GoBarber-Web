import { Session } from 'inspector';
import React,{ createContext, useCallback, useState } from 'react';
import api from '../services/api'

interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials { 
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;  
    signIn(credentials:SignInCredentials): Promise<void>;
    signOut() : void;
}


type PartialAuthContextData = Partial<AuthContextData>;

const AuthContext = createContext<PartialAuthContextData>({});

const AuthProvider: React.FC = ({children}) => {

    type PartialStateData = Partial<AuthState>;
    const [data, setData] = useState<PartialStateData>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (token && user) {
            return { token, user: JSON.parse(user)};
        }

        return{};
    });

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user ');

        setData({});
    }, []);

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {   
            email,
            password,
        });

        const { token, mappedUser } = response.data;
        const user = mappedUser;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({ token, user });
        
    },[])

 return(
     <AuthContext.Provider value={{user : data.user, signIn, signOut}}>
         {children}
     </AuthContext.Provider>
 )  
}

export {AuthContext, AuthProvider};   