import { useContext } from 'react';
import { context } from "../UserContext";
const Profile = () => {
    const {profile} = useContext(context)
    return (
      // <div style={{"width":"15%", "border":"unset", "display":"flex","alignItems":"center","justifyContent":"space-between"}}>
      //    {!profile.firstName?"loading...":<a style={{"border":"unset","fontSize":"0.95rem"}}>Hello {profile.firstName}</a>}
      //    {!profile.image?<img style={{"borderRadius":"50px", "boxShadow":"0.5px 0px 1px 1px black"}} src={"/user.png"} width={"50px"}/>:<img style={{"borderRadius":"50px", "boxShadow":"0.5px 0px 1px 1px black"}} width={"50px"} src={profile.image}/>}
      // </div>
      <div>
    {profile && 
    <>
        <div style={{"width":"15%", "border":"unset", "display":"flex","alignItems":"center","justifyContent":"space-between"}}>
           {!profile.firstName?"loading...":<p style={{"border":"unset","fontSize":"0.95rem"}}>Hello {profile.firstName}</p>}
           {!profile.image?<img alt='profile' style={{"borderRadius":"50px", "boxShadow":"0.5px 0px 1px 1px black"}} src={"/user.png"} width={"50px"}/>:<img style={{"borderRadius":"50px", "boxShadow":"0.5px 0px 1px 1px black"}} width={"50px"} src={profile.image}/>}
        </div>
    </>
      }</div>
    );
}

export default Profile