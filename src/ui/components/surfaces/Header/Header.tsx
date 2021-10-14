import React from "react";
import { HeaderAppBar } from "./Header.style";
import { Toolbar, Container } from "@mui/material";
import { HeaderLogo } from "./Header.style";

const Header: React.FC = () => {
  return (
    <HeaderAppBar position={"sticky"}>
      <Toolbar component={Container}>
        <HeaderLogo src="/img/logos/logo.svg" alt={"e-diaristas"} />
      </Toolbar>
    </HeaderAppBar>
  );
};

export default Header;
