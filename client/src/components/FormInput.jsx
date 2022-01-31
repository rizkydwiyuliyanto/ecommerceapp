import react from "react";
import Styled from 'styled-components';
import { useState, useEffect } from 'react';
import Axios from "axios";
const FormInput = () => {
    const initialState = {
        "namaBarang":"",
        "deskBarang":"",
        "harga":0,
        "kategoriBarang":"",
        "gambar":""
    }

    const [data, setData] = useState(initialState);
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saveImage, setSaveImage] = useState()
    useEffect(() => {
       console.log(data)
       Object.entries(initialState).forEach((x) => {
        console.log(x);
    })
    //    console.log(profile)
    })
    const handleUploadChange = (e) => {
        console.log(e.target.files[0])
        let uploaded = e.target.files[0];
        setData({
            ...data,
            [e.target.name]: uploaded
        })

    }
    const handleChange = (e) => {
        setData(
            {
                ...data,
                [e.target.name] : e.target.value
            }
        )
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
            setProfile(user)
            setLoading(false)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    const handleClick = async() => {
        console.log("ok");
        let formData = new FormData();
        Object.entries(data).forEach((x) => {
            formData.append(x[0],x[1])
        })

        const d = await Axios.post("http://localhost:3005/inputBarang",formData, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              }
        }).catch((err) =>{
            return err.response
        })
       
        if (d.status == 200) {
            alert("data berhasil ditambah")
            setData({ ...initialState })
        }else if (d.status == 400){
            alert(d.data)
        }
    }
    let style = {
        border: "1px solid #BBC4E4",
        width: "100%",
      };
    return (
        <>
             <h3 style={{"margin":"2em 0em 1em 0"}}>Input Barang</h3>
          <Form>
            <form onSubmit={handleSubmit} style={{"height":"400px","width":"400px","display":"flex","flexDirection":"column"}}>
                <Input>
                   <label>Nama barang</label>
                   <div style={style}>
                      <input value={data.namaBarang} name="namaBarang" type={"text"} onChange={handleChange}/>
                   </div>
                </Input>
                <Input>
                   <label>Deskripsi barang</label>
                <div style={style}>
                   <input value={data.deskBarang} name="deskBarang" type={"text"} onChange={handleChange}/>
                </div>
                </Input>
                <Input>
                   <label>harga</label>
                   <div style={style}>
                   <input value= {data.harga} name="harga" type={"text"} onChange={handleChange}/>
                   </div>
                </Input>
                <Input>
                   <label>Kategori barang</label>
                   <div style={style}>
                   <input value={data.kategoriBarang} name="kategoriBarang" type={"text"} onChange={handleChange}/>
                   </div>
                </Input>
                <Input>
                   <label>Gambar</label>
                   <div style={style}>
                   <input   name="gambar" type={"file"} accept="image/*" onChange={handleUploadChange}/>
                   </div>
                </Input>
                <Button onClick={handleClick} htmlType="submit">Input</Button>
            </form>
          </Form>
        </>
    )
}

const Form = Styled.div `
    display: block;
    background-color: #F4F4F4;
    width: 45%;
    padding: 1em;
    box-shadow: 0px 0px 2.5px 1px grey;
`
const Input = Styled.div `
   display: flex;
   flex-direction: column;
   label {
       margin-bottom: 0.5em;
   }
   input {
     border: none;
     width: 100%;
     padding: 0.5em;
     :focus {
         outline: none;
     }
   }
   height: 20%;

`
const Button = Styled.button `
    display: block;
    padding: 1em;
    background: #0112FC;
    color: white;
    border: none;
    border-radius: 5px;
    width: 30%;
    align-self: end;
    :hover {
        cursor: pointer;
    }
`
export default FormInput

