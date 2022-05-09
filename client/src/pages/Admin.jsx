import Navbaradmin from "../components/Navbaradmin";
import Login from "./Login";

const Admin = (props) => {
  return (
    <>
      {!props.Login ? (
        <Login Islogin={props.Islogin} />
      ) : (
        <>
       <div>   
       <Navbaradmin/>
       </div>
          
        </>
      )}
    </>
  );
};

export default Admin;
