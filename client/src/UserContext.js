import { createContext, useEffect, useState } from "react";
import Axios from "axios";
import useToken from "./useToken";

const context = createContext()
const UserContext = ({ children }) => {
    const { token, setToken } = useToken() //custom hook
    const [profile, setProfile] = useState();
    const getData = async() => {
        let data = await Axios.get("https://randomuser.me/api/").then((res) => {
            return res
        })
        if (data.status == 200) {
            const getProfile = await Axios.get("https://randomuser.me/api/").then((res) => {
                return res.data
            })
            let user = {
                "firstName" : getProfile.results[0].name.first,
                "lastName" : getProfile.results[0].name.last,
                "image": getProfile.results[0].picture.large
            }
            setProfile((prev) => prev = user);
            console.log(user)
        }
    }
useEffect(() => {
  if (token) {
      getData() 
  }else{
      console.log("token undefined");
  }
}, [token])
 const value = {profile, SetToken: setToken, Token: token}
 return (
    <context.Provider value={value}>
        {children}
    </context.Provider>
 )
}

export {
    UserContext, context
}