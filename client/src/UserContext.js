import { createContext, useEffect, useState } from "react";
import Axios from "axios";

const context = createContext()

const UserContext = ({ children }) => {
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
            setProfile(user)
        }
    }

useEffect(() => {
    getData()
    console.log(profile)
 }, [])
 const value = {profile}
 return (
    <context.Provider value={value}>
        {children}
    </context.Provider>
 )
}

export {
    UserContext, context
}