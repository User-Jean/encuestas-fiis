import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { FC, ReactNode } from "react";
import Header from "../Header/Header";

interface LayoutInterface {
    children: ReactNode
}

const Layout: FC<LayoutInterface> = ({ children }) => {

    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '100vh', boxSizing: "border-box" }}>
            <Header />
            <Container sx={{ marginTop: '100px', marginBottom:5 , overflowY: "auto" }}>
                {children}
            </Container>
        </Box>
    )
}

export default Layout;