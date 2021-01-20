import styled from "styled-components";
import Link from "next/link";

const Header = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
  margin-bottom: 50px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
  font-size: 20px;
  font-weight: 300;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 20px;
  }
  &:hover {
    background-color: rgba(255, 208, 0, 0.4);
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
