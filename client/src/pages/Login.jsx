import react from 'react';
import Navbar from '../components/Navbar'
import Styled from 'styled-components';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Axios from 'axios';
import PropTypes from "prop-types"
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from 'react';
import { context } from '../UserContext';

const Login = (props) => {
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const location = useLocation()
    const navigate = useNavigate();
    const {SetToken} = useContext(context)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [])
    let inputStyle = {
        "border":"0.5px solid #bfbfbf",
        "padding":"0.5em 0.7em",
        "marginTop":"0.2em",
        "borderRadius":"5px"
    }
    const handleSubmit= async (e) => {
      e.preventDefault()
      try{
          let response = await Axios.post("http://localhost:3005/login", {
            username: email,
            password: password,
          },{
              headers: {
                  'Accept':"application/json",
                  'Content-Type' : "application/json"
              },
              responseType:"json",
            })
      let data = response.data
      if (data) {
        SetToken(data);
        const origin = location.state?.from?.pathname || '/admin/transaksi';
        navigate(origin);
      }
      }catch (err) {
          alert(err.response.data.message)
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
                        <label htmlFor="email">Email</label>
                        <input style={inputStyle} value={email} id="email" onChange={(e) =>{
                            setEmail(e.currentTarget.value)
                        }}/>
                    </Input>
                    <Input>
                     <label htmlFor="password">Password</label>
                     <input style={inputStyle} type={"password"} value={password} id="password" onChange={(e) =>{
                            setPassword(e.currentTarget.value)
                     }}/>
                    </Input>

                    <Button>
                        <button>Login</button>
                    </Button>
                    <a style={{"fontSize":"0.85rem"}}>Belum punya akun? Daftar</a>
                 </form>
              </div>
           </Form>}
        </>
    )
  }
  // Login.propTypes= {
  //   SetToken: PropTypes.func.isRequired
  // }
 
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