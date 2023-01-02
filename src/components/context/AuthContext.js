import React, {createContext,useState,useEffect} from 'react';
import {View,Text} from 'react-native';
import AuthService from '../services/AuthService';
import * as Application from 'expo-application';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import App from '../App';

export const AuthContext = createContext();

export const AuthProvider = ({ children })=>{                           
    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoaded2,setIsLoaded] = useState(true);
    const [mediaResult,setmediaResult] = useState(null);
    const UID = Application.androidId;
    useEffect(()=>{
        AuthService.isAuthenticated(UID).then(data =>{
            setIsAuthenticated(data.isAuthenticated);
            setmediaResult(data.json);
            setIsLoaded(false);
        });
    },[0]);
    return (       
            <AuthContext.Provider value={{mediaResult,isLoaded2,isAuthenticated,setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>
    )
}