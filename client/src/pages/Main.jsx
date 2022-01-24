import react from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
const Main = () => {
  const [loading, setLoading] = useState(true);

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
          <Container>
            <Content />
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default Main;
