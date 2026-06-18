import React, {createContext, useState, useEffect, useContext} from "react";

const authContext = createContext();

export const useAuth = () =>{ // custom hook
  return useContext(authContext);
}

export const AuthProvider = ({ children}) =>{
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    if(userId){
      setCurrentUser(userId);
    }
  }, []);

  const value = {
    currentUser, setCurrentUser
  }

  return <authContext.Provider value={value}>{children}</authContext.Provider>
}