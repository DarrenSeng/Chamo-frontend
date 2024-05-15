import { useState,useEffect,createContext } from "react"
import cookies from 'js-cookie';
export const AuthContext = createContext({authUser:"",setAuthUser:()=>{}})

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(cookies.get("user") || "");
  
    useEffect(() => {
      const userFromCookie = cookies.get("user");
      if (userFromCookie) {
        setAuthUser(userFromCookie);
      }
    }, [authUser]);
  
    return (
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
  

/*
import { createContext,useReducer } from "react"

export const AuthContext = createContext()//{authUser:"",setAuthUser:()=>{}}

export const authReducer = (state,action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user:action.payload}
        case 'LOGOUT':
            return {user:null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(authReducer, {
        user:null
    })
    console.log('AuthContext State:', state)
    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
*/