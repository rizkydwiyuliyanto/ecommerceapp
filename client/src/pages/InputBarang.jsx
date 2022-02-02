import react from "react";
import Navbaradmin from "../components/Navbaradmin";
import AdminContent from "../components/Admincontent";
import Profile from "../components/Profile";
import Styled from "styled-components";
import FormInput from "../components/FormInput";
import { useState, useEffect } from "react";


const InputBarang = () => {
  return (
    <>
      <Navbaradmin />
      <AdminContent>
        <div  className="admin" style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Input barang</h2>
        <Profile />
        </div>
        <FormInput/>
      </AdminContent>
    </>
  );
};

export default InputBarang;
