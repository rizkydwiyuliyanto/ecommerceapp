import react from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useState } from "react";
import Form from '../components/Form';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(false);
  const [barang, setBarang] = useState();
  const [jumlah, setJumlah] = useState(0);



  return (
    <>
      <Navbar />
    
          <Form
            Form={form}
            Jumlah = {jumlah}
            SetForm={() => {
              setForm(!form);
            }}
            Barang={barang}
          />
          <Container>
            <Content
              SetJumlah = {(n) => {
                setJumlah(n)
              }}
              SetForm={() => {
                setForm(!form);
              }}
              SetBarang={(x) => {
                setBarang(x);
              }}
            />
          </Container>
          <Footer />
    </>
  );
};

export default Main;
