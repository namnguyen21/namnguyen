import styled from "styled-components";
import Link from "next/link";

const Header = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
  margin-bottom: 20px;
  @media (max-width: 800px) {
    margin-bottom: 10px;
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

export default function Nav() {
  return (
    <Header>
      <Link href="/blog">
        <NavLink>Blog</NavLink>
      </Link>
      <Link href="/projects">
        <NavLink>Projects</NavLink>
      </Link>
    </Header>
  );
}
