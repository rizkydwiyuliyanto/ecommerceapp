import { createContext, useEffect, useState } from "react";
import Axios from "axios";
import useToken from "./useToken";

const context = createContext(null)
const UserContext = ({ children }) => {
    
    const { token, setToken } = useToken() //custom hook
    const [profile, setProfile] = useState();
    const [state, setState] = useState(true);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("");
    const getDataTransaksi = async (url) => {
        let status = await Axios.get(url).then((res) => {
          return res.status
        });
        if (status == 200) {
          let data = await Axios.get(url).then((res) => {
            return res.data;
          })
          setData(data)
          setLoading(false)
        }
  } 
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
    if (!profile){
        getData() 
    }
        
    if (token) {
    if (url){
          getDataTransaksi(url)
      }
  }else{
      console.log("token undefined");
  }
}, [token, url])
 const value = {profile, SetToken: setToken, Token: token,Loading: loading, Data: data, Seturl: setUrl}
 return (
    <context.Provider value={value}>
        {children}
    </context.Provider>
 )
}

export {
    UserContext, context
}