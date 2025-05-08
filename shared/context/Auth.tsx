import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    AsyncStorage.getItem('auth').then((value) => {
      console.log(value);
      if(value === 'true'){
        setIsAuthenticated(true);
      }
    })
  },[])

  const login = () => {
    AsyncStorage.setItem('auth', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    AsyncStorage.setItem('auth', 'false');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);