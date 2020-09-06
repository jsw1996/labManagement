import React from "react";
import { Menu, Container } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import {  useSelector } from "react-redux";

const Navbar = () => {
  const {authenticated} = useSelector(state => state.auth);

  return (
    <Menu size='large' inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/members' header content='SUDOKU Proj.' />
        <Menu.Item as={NavLink} to='/sandbox' header content='Sandbox' />
        <Menu.Item as={NavLink} to='/createMember' header content='Create Profile' />
        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
};

export default Navbar;
