import react from "react";
import { useState,useEffect } from 'react';
import Axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);

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
            setLoading(false)
        }
    }

useEffect(() => {
    getData()
    console.log(profile)
 }, [])

    return (
        <div style={{"width":"15%", "border":"unset", "display":"flex","alignItems":"center","justifyContent":"space-between"}}>
           {!profile.firstName?"loading...":<a style={{"border":"unset","fontSize":"0.95rem"}}>Hello {profile.firstName}</a>}
           {!profile.image?<img style={{"borderRadius":"50px", "boxShadow":"0.5px 0px 1px 1px black"}} src={"/user.png"} width={"50px"}/>:<img style={{"borderRadius":"50px", "boxShadow":"0.5px 0px 1px 1px black"}} width={"50px"} src={profile.image}/>}
        </div>
    )
}

export default Profile