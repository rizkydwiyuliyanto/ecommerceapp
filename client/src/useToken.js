import { useState, useEffect } from "react";

export default function useToken() {
    useEffect(() => {
        console.log(getToken())
    },[])
    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken.token)
    }
    const getToken = () => {
        const tokenString = localStorage.getItem("token")
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    }
    const [token, setToken] = useState('77489');
    return {
        setToken: saveToken,
        token
    }
}