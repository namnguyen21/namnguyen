import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const Nav = styled.nav`
  width: 100%;
  background: ${(props) =>
    !props.isAtTop || props.open ? "#090f1b" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  @media (min-width: 800px) {
    display: none;
  }
  transition: all 0.2s;

  transform: ${(props) =>
    props.show || props.isAtTop ? "translateY(0)" : "translateY(-100%)"};
`;

const Overlay = styled.div`
  width: 100%;
  background: ${(props) =>
    !props.isAtTop || props.open ? "#090f1b" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  padding: 20px 30px;
`;

const Logo = styled.h1`
  color: ${(props) => props.theme.colors.text};
  font-size: 30px;
`;

const Hamburger = styled.button`
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  background: transparent;
  cursor: pointer;
`;

const Burger = styled.div`
  width: 25px;
  height: 2px;
  background-color: ${(props) => props.theme.colors.text};
  position: relative;
  &::after,
  &::before {
    content: "";
    height: 2px;
    left: 0;
    width: 25px;
    background-color: ${(props) => props.theme.colors.text};
    position: absolute;
  }

  &::before {
    top: -7px;
  }

  &::after {
    bottom: -7px;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  border-bottom: solid 2px #1e232e;
  background-color: #090f1b;
  transform: ${(props) => (props.open ? "translateY(0)" : "translateY(-200%)")};
  transition: transform 0.2s;
  > *:not(:last-child) {
    margin-bottom: 25px;
  }
  z-index: 8;
  padding: 20px 0 50px;
`;

const A = styled.a`
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

export default function MobileNav({ show, isAtTop }) {
  const [open, setOpen] = useState(false);

  function flipOpen() {
    console.log(open);
    if (open) setOpen(false);
    else setOpen(true);
  }

  return (
    <Nav open={open} isAtTop={isAtTop} show={show}>
      <Overlay open={open} isAtTop={isAtTop}>
        <Link href="/">
          <Logo>
            <A style={{ fontSize: "inherit" }}>n</A>
          </Logo>
        </Link>
        <Hamburger onClick={flipOpen}>
          <Burger />
        </Hamburger>
      </Overlay>
      <Menu open={open}>
        <Link href="/blog">
          <A>BLOG</A>
        </Link>
        <Link href="/projects">
          <A>PORTFOLIO</A>
        </Link>
        <A href="/files/nam-nguyen-resume.pdf" download>
          RESUME
        </A>
      </Menu>
    </Nav>
  );
}
