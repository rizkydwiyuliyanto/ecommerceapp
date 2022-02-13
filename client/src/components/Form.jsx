import React from 'react';
import Styled from 'styled-components'
import { useState, useEffect } from 'react';
import Axios from 'axios';


const Form = (props) => {

    let initialState = {
        "namaDepan":"",
        "namaBelakang":"",
        "no_telp":"",
        "alamat" :"",
        "catatan":""
    }
    const [data, setData] = useState(initialState);
    const [isHover, setIsHover] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let status = await Axios.post(`http://localhost:3005/api/pesan/${props.Barang}`, {
            namaDepan : data.namaDepan,
            namaBelakang : data.namaBelakang,
            no_telp : data.no_telp,
            alamat : data.alamat,
            catatan : data.catatan
        }).then((res) => {
            return res.status
        }).catch((err) => {
            return err.response
        })

        if (status == 200) {
            alert("oke")
        }else if (status == 400) {
            alert("gagal")
        }
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
        "marginTop":"0.2em",
        "borderRadius":"5px",
        "height": "100px",
   
        "resize": "none"
    }
    return (
     <>
        {!props.Form?"":
        <>
        <FormParent>
         <div style={{"backgroundColor":"#f4f4f4","width":"45%","boxShadow":"0px 0px 4px 0px black","padding":"2em 2em 1em 2em", "borderRadius":"5px"}}>
         <div style={{"display":"flex","justifyContent":"space-between"}}>
             <h3 style={{"textAlign":"center"}}>Pesan lewat Whatsapp</h3>
             <a style={linkStyle} onMouseEnter={handleHover} onMouseLeave={handleHover} onClick={() =>{
                 handleHover()
                 setData(initialState)
                 props.SetForm(!props.Form)
             }}>
                 <img width = {"15px"}src={"close.png"}/>
             </a>
         </div>
                 <form onSubmit={handleSubmit} style={{"display":"flex", "flexDirection":"column"}}>
                    <div style={{"display":"flex"}}>
                    <Input>
                        <label for="namaDepan">Nama depan</label>
                        <input name="namaDepan" style={inputStyle} value={data.namaDepan} id="namaDepan" onChange={handleChange}/>
                    </Input>
                    <Input>
                        <label for="namaBelakang">Nama belakang</label>
                        <input name="namaBelakang" style={inputStyle} value={data.namaBelakang} id="namaBelakang" onChange={handleChange}/>
                    </Input>
                    </div>
                    <Input>
                     <label for="no_telp">no.telp</label>
                     <input name="no_telp" style={inputStyle} type={"text"} value={data.no_telp} id="no_telp" onChange={handleChange}/>
                    </Input>
                    <Input>
                     <label for="alamat">Alamat</label>
                     <textarea name="alamat" style={textAreaStyle} type={"text"} value={data.alamat} id="alamat" onChange={handleChange}/>
                    </Input>
                    <Input>
                     <label for="catatan">catatan (optional)</label>
                     <textarea name="catatan" style={textAreaStyle} value={data.catatan} id="catatan" onChange={handleChange}/>
                    </Input>
                    <Button>
                        <button>Beli</button>
                    </Button>
                    
                 </form>
         </div>
        </FormParent>
        </>
        }
     </>
    )
}
const FormParent = Styled.div `
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
  position: fixed;
  width: 100%;
  background-color: #0000009d;
  border: unset;
  z-index: 150;
  h2 {
    border: 1px solid black;
  }
`
const Input = Styled.div `
    display: flex;
    flex-direction: column;
 
    margin-top: 1.2em;
    label {
        font-size: 0.95rem;
    }
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

export default Form;