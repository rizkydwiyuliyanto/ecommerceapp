import react from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import Content from "../components/Content";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Content/>
      </Container>
      <Footer/>
    </>
  );
};

export default Main;
