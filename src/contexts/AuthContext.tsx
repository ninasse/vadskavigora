import React, { useEffect, useState} from 'react';
import firebase, {auth } from '../firebase';

type ContextProps = {
    user: firebase.User | null;
    authenticated: boolean;
    setUser: any;
    loadingAuth: boolean;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});


export function AuthProvider({children}: any) {
    const [user, setUser] = useState(null as firebase.User | null); 
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser: any) => {
            setUser(authUser);
            setLoadingAuth(false);
        });
        return unsubscribe;     
    }, []);


   
    return(
        <AuthContext.Provider value={{
            setUser,
            user,
            authenticated: user !== null,
            loadingAuth
        }}>
            {children}
        </AuthContext.Provider> 
    ) 
}
