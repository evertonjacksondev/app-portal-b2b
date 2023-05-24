import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import imgLogo from "../assets/zeene.png"

const Nav = styled.div`
background:#C9DBEA;
box-shadow: 0 1px 10px rgb(0 0 0 / 0.2);
display: flex;
justify-content: space-between;
align-items: center;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: #0771AC;
width: 250px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
box-shadow: 0 1px 10px rgb(0 0 0 / 0.2);
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 350ms;
z-index: 10;
`;

const SidebarWrap = styled.div`
width: 100%;
`;

const NavItem = styled.div`
width:50%;
`

const NavImg = styled.img`
cursor:pointer;
`
const Sidebar = () => {
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);

    const { name } = JSON.parse(localStorage.getItem('authToken'))
    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars color="#0771AC" onClick={showSidebar} />
                    </NavIcon>
                    <NavItem>
                        <p style={{ fontFamily: 'Poppins', display: "flex" }}>{`Bem vindo(a), ${name}!`}</p>
                    </NavItem>
                    <Link to="/produtos">
                        <NavImg style={{ width: '250px' }} src={imgLogo}></NavImg>
                    </Link>
                </Nav>
                <SidebarNav sidebar={true}>
                    <SidebarWrap>
                        <NavIcon>
                            {/* <AiIcons.AiOutlineClose onClick={showSidebar} /> */}
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;



                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;
