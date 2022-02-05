import react from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import Form from '../components/Form';

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(false);
  const [barang, setBarang] = useState();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Form
            Form={form}
            SetForm={() => {
              setForm(!form);
            }}
            Barang={barang}
          />
          <Container>
            <Content
              Form={form}
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
      )}
    </>
  );
};

export default Main;
