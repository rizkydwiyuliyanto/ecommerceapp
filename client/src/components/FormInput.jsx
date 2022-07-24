import react from "react";
import Styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import Axios from "axios";
const FormInput = () => {
    const initialState = {
        "namaBarang":"",
        "deskBarang":"",
        "harga":0,
        "stok":0,
        "kategoriBarang":"",
        "gambar":""
    }
    const Ref = useRef();
    const [data, setData] = useState(initialState);
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saveImage, setSaveImage] = useState()
    useEffect(() => {
       console.log(data)
    })
    const handleUploadChange = async (e) => {
        var file = e.target.files[0];
        let formData = new FormData();
        formData.append("gambar", file)
        if (!file) {
          return;
        }
        console.log(formData);
        try {
            let res = await Axios.post("http://localhost:3005/inputGambar",formData, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
            if (res.status === 200) {
                console.log(res.data)
                Ref.current.src = res.data
            }
        }catch(err) {
            console.log(err)
        }
        console.log(e.target.files[0].name);
        // sessionStorage.setItem("image", e.target.files[0].name);
        // let image = sessionStorage.getItem("item");
        // Ref.current.src = "contoh.png"
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

      function displayContents(contents) {
        // var element = document.getElementById('file-content');
        Ref.current.innerHTML = contents
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
        console.log(formData)
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
      
        width:"50%",
        display:"flex",
        justifyContent:"center",
        alignItems: "center"
      };
    return (
        <>
          <Form>
            <form onSubmit={handleSubmit} style={{"height":"700px","width":"100%","display":"flex","flexDirection":"column", "justifyContent":"space-between"}}>
                <Input>
                   <label>Nama barang</label>
                   <div style={style}>
                      <input value={data.namaBarang} name="namaBarang" type={"text"} onChange={handleChange}/>
                   </div>
                </Input>
                <Input>
                   <label>Deskripsi barang</label>
                <div style={style}>
                   <textarea value={data.deskBarang} name="deskBarang" type={"text"} onChange={handleChange}/>
                </div>
                </Input>
                <Input>
                   <label>harga</label>
                   <div style={style}>
                   <input value= {data.harga} name="harga" type={"text"} onChange={handleChange}/>
                   </div>
                </Input>
                <Input>
                   <label>stok</label>
                   <div style={style}>
                   <input value= {data.stok} name="stok" type={"text"} onChange={handleChange}/>
                   </div>
                </Input>
                <Input>
                   <label>Kategori barang</label>
                   <div style={style}>
                   <input value={data.kategoriBarang} name="kategoriBarang" type={"text"} onChange={handleChange}/>
                   </div>
                </Input>
                <InputGambar>
                   <label>Gambar</label>
                   <div style={style}>
                   <input name="gambar" type={"file"} onChange={handleUploadChange} accept={"image/*"}/>
                   </div>
                <img alt={"gambar produk"} ref={Ref}/>
                </InputGambar>
                {/* <div ref={Ref}></div> */}
                <Button onClick={handleClick} htmlType="submit">Input</Button>
            </form>
          </Form>
        </>
    )
}

const Form = Styled.div `
    display: block;
    width: 90%;
    padding: 1em;

`

const InputGambar = Styled.div `
display: flex;
height: 15%;
justify-content: space-between;
padding: 1em;
label {
    margin-bottom: 0.5em;
    border: unset;
    width: 45%;
    height: 100%;
    display: flex;
    align-items: center;
}
img {
    width: 180px;
    height: 100%;
    display:flex;
    justify-content:center; align-items: center;
}
`

const Input = Styled.div `
   display: flex;
   border-bottom: 1px solid #b1b1b1;
   height: 15%;
   padding: 1em;
   justify-content: space-between;
   
   label {
       margin-bottom: 0.5em;
       border: unset;
       width: 45%;
       height: 100%;
       display: flex;
       
       align-items: center;
   }
   
   textarea {
    border-bottom: 1px solid black;
    width: 100%;
    border-radius: 5px;
    border: none;
    padding: 1em;
    height: 100%;
    resize: none;
    overflow-y: scroll;
    background-color: #F4F4F4;
    :focus {
        outline: none;
    }
   }

   input {
     border-bottom: 1px solid black;
     width: 100%;
     border-radius: 5px;
     border: none;
     padding: 1.2em 1em 1.2em 1em;
     height: 45%;
     background-color: #F4F4F4;
     :focus {
         outline: none;
     }
 
   }
  

`
const Button = Styled.button `
    display: block;
    padding: 1em;
    background: #0112FC;
    color: white;
    margin-top: 1.5em;
    border: none;
    border-radius: 5px;
    width: 30%;
    align-self: end;
    :hover {
        cursor: pointer;
    }
`
export default FormInput

