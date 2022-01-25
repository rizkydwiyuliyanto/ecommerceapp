import React from 'react';
import Styled from 'styled-components'
import { useState, useEffect } from 'react';

const Form = (props) => {

    let initialState = {
        "nama":"",
        "alamat" :"",
        "nomor_telp":"",
        "catatan":""
    }
    const [data, setData] = useState(initialState);
    const [isHover, setIsHover] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
   }
   const handleChange = (e) => {
       setData({
           ...data,
           [e.target.name] : e.target.value,
       })
   }
   const handleHover = ()=> {
       setIsHover(!isHover);
   }
    useEffect(()=> {
       console.log(data) 
    }, [JSON.stringify(data)])

    var linkStyle;
    if (isHover){
        linkStyle = {"cursor":"pointer"}
    }else {
        linkStyle = {"cursor":"default"}
    }

    let inputStyle = {
        "border":"0.5px solid #bfbfbf",
        "padding":"0.5em 0.7em",
        "marginTop":"0.2em",
        "borderRadius":"5px"
    }

    let textAreaStyle = {
        "border":"0.5px solid #bfbfbf",
        "padding":"0.5em 0.7em",
        "margin":"0.2em 0",
        "borderRadius":"5px",
        "height": "200px",
   
        "resize": "none"
    }

    return (
     <>
        {!props.Form?"":
        <FormParent>
         <div style={{"backgroundColor":"#f4f4f4","width":"35%","boxShadow":"0px 0px 4px 0px black","padding":"2em 2em 1em 2em", "borderRadius":"5px"}}>
         <div style={{"display":"flex","justifyContent":"space-between"}}>
             <h3 style={{"textAlign":"center"}}>Pesan lewat Whatsapp</h3>
             <a style={linkStyle} onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={() =>{
                 handleHover()
                 props.SetForm(!props.Form)
             }}>
                 <img width = {"15px"}src={"close.png"}/>
             </a>
         </div>
                 <form onSubmit={handleSubmit} style={{"display":"flex", "flexDirection":"column"}}>
                    <Input>
                        <label for="nama">Nama</label>
                        <input name="nama" style={inputStyle} value={data.nama} id="nama" onChange={handleChange}/>
                    </Input>
                    <Input>
                     <label for="no.telp">no.telp</label>
                     <input name="no.telp" style={inputStyle} type={"text"} value={data.nomor_telp} id="alamat" onChange={handleChange}/>
                    </Input>
                    <Input>
                     <label for="alamat">Alamat</label>
                     <input name="alamat" style={inputStyle} type={"text"} value={data.alamat} id="alamat" onChange={handleChange}/>
                    </Input>
                    <Input>
                     <label for="catanta">catatan</label>
                     <textarea name="catatan" style={textAreaStyle} value={data.catatan} id="catatan" onChange={handleChange}/>
                    </Input>
                    <Button>
                        <button>Beli</button>
                    </Button>
                    
                 </form>
         </div>
        </FormParent>}
     </>
    )
}
const FormParent = Styled.div `
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  background-color: #0000009d;
  border: unset;
  z-index: 100;
  h2 {
    border: 1px solid black;
  }
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
    position: relative;
    top: 10.5px;
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

export default Form;