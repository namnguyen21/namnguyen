import styled from "styled-components";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const Header = styled.nav`
  width: 100%;
  padding: 20px 0;
  @media (max-width: 800px) {
    margin-bottom: 10px;
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.paper};
  border-bottom: ${(props) =>
    props.isAtTop
      ? `solid 1px ${props.theme.colors.paper}`
      : "solid 1px #1e232e"};
  /* display: ${(props) => (props.hasScrolledUp ? null : "none")}; */
  transition: all 0.3s;
  /* transform: ${(props) =>
    props.hasScrolledUp || (props.isAtTop && !props.hasScrolledUp)
      ? "translateY(0px)"
      : "translateY(-100px)"}; */
`;

const Logo = styled.h1`
  color: ${(props) => props.theme.colors.text};
  font-size: 30;
`;

const Container = styled.div`
  display: flex;
  width: 1000px;
  margin: auto;
  justify-content: space-between;
  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  padding-bottom: 10px;
  position: relative;
  &:not(:last-child) {
    margin-right: 40px;
  }
  &::after {
    position: absolute;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    background: ${(props) => props.theme.colors.link};
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:hover::after {
    width: 100%;
    left: 0;
  }
`;

const HamburgerContainer = styled.div`
  display: inline-block;
  position: fixed;
  right: 20px;
  top: 20px;
  @media (min-width: 800px) {
    display: none;
  }
`;

const MobileNav = styled.button`
  @media (min-width: 800px) {
    display: none;
  }
  @media (max-width: 800px) {
    background-color: #fff;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
  }
`;
const Hamburger = styled.div`
  display: inline-block;
  height: 2px;
  width: 20px;
  background-color: ${(props) => props.theme.colors.paper};
  position: relative;
  &::after,
  &::before {
    content: " ";
    width: 20px;
    height: 2px;
    position: absolute;
    background-color: ${(props) => props.theme.colors.paper};
    left: 0;
    right: 0;
  }

  &::before {
    top: -5px;
  }

  &::after {
    bottom: -5px;
  }
`;

export default function Nav({ isAtTop }) {
  return (
    <Header isAtTop={isAtTop}>
      <Container>
        <Link href="/">
          <a >
            <Logo>
              n<sup>2</sup>
            </Logo>
          </a>
        </Link>
        <div style={{ display: "flex" }}>
          <Link href="/blog">
            <NavLink>Blog</NavLink>
          </Link>
          <Link href="/projects">
            <NavLink>Projects</NavLink>
          </Link>
        </div>
      </Container>

      {/* <HamburgerContainer>
        <MobileNav>
          <Hamburger />
        </MobileNav>
      </HamburgerContainer> */}
    </Header>
  );
}
