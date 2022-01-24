import react from 'react';
import Navbar from '../components/Navbar'
import Styled from 'styled-components';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Axios from 'axios';
import PropsTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    let navigate = useNavigate()
    function test(x){
      props.Islogin(x)
    }
    useEffect(() => {
         
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [loading])
    let inputStyle = {
        "border":"0.5px solid #bfbfbf",
        "padding":"0.5em 0.7em",
        "marginTop":"0.2em",
        "borderRadius":"5px"
    }

    const handleSubmit = (e) => {
      e.preventDefault()
    }
    const submit = async () => {
      let data = await Axios.post("http://localhost:3005/login", {
        username: email,
        password: password,
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      if (data.status == 200) {
        test(true)
        navigate('/admin')
        // alert("anda berhasil login")
      } else if (data.status == 400){
        alert(data.data);
      }else if (data.status == 403){
        alert(data.data.message)
      }
      setEmail("")
      setPassword("")
    };

    return (
        <>
      
           <Navbar/>
           {loading ?<Loading/>: <Form>
              <div style={{"width":"35%","boxShadow":"0px 0px 4px 0px black","padding":"2em 2em 3.6em 2em", "borderRadius":"5px"}}>
                 <h4 style={{"textAlign":"center"}}>Masuk ke akun anda</h4>
                 <form onSubmit={handleSubmit} style={{"display":"flex", "flexDirection":"column"}}>
                    <Input>
                        <label for="email">Email</label>
                        <input style={inputStyle} value={email} id="email" onChange={(e) =>{
                            setEmail(e.currentTarget.value)
                        }}/>
                    </Input>
                    <Input>
                     <label for="password">Password</label>
                     <input style={inputStyle} type={"password"} value={password} id="password" onChange={(e) =>{
                            setPassword(e.currentTarget.value)
                     }}/>
                    </Input>

                    <Button>
                        <button onClick={submit}>Login</button>
                    </Button>
                    <a style={{"fontSize":"0.85rem"}}>Belum punya akun? Daftar</a>
                 </form>
              </div>
           </Form>}
        </>
    )
    
}
 
const Form = Styled.div `
    border: 1px solid black;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Input = Styled.div `
    display: flex;
    flex-direction: column;
    height: 50px;
    margin-top: 1.2em;
`
const Button = Styled.div `
    width: unset;
    margin: 2.5em 0;
    text-align: center;
    background-color: #5E9B26;
    
    border-radius: 5px;
    button {
        background: none;
        width: 100%;
        padding: 1em;
        border: none;
        :hover {
            cursor: pointer;
            color: white;
            
        }
    }
`
export default Login;