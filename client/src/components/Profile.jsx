import { useContext, useEffect } from 'react';
import { context } from "../UserContext";
const Profile = () => {
    useEffect(() => {
      console.log(profile)
    })
    const {profile} = useContext(context)
    return (
      <div>
        {!profile?<div style={{"height":"30px"}}>loading...</div>:    <>
        <div style={{"height":"30px","border":"unset", "display":"flex","alignItems":"center","justifyContent":"space-between"}}>
           {!profile.firstName?"loading...":<p style={{"border":"unset","fontSize":"0.95rem"}}>Hello {profile.firstName}</p>}
           {!profile.image?<img alt='profile' style={{"borderRadius":"50px", "boxShadow":"0.5px 0px 1px 1px black"}} src={"/user.png"} width={"50px"}/>:<img style={{"borderRadius":"50px", "boxShadow":"0.5px 0px 1px 1px black"}} width={"50px"} src={profile.image}/>}
        </div>
    </>}
   </div>
    );
}

export default Profile