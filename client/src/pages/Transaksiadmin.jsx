import React from "react";
import Navbaradmin from "../components/Navbaradmin";
import Styled from "styled-components";
import AdminContent from "../components/Admincontent";
import Profile from "../components/Profile";

const Transaksiadmin = () => {
  return (
    <>
      <Navbaradmin />
      <div style={{ position: "relative", width: "100%" }}>
      <AdminContent>
      <div style={{"display":"flex","justifyContent":"space-between"}}>
          <h2>Transaksi</h2>
          <Profile/>
      </div>
      </AdminContent>
      </div>
    </>
  );
};

export default Transaksiadmin;
