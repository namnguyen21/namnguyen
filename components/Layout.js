import styled from "styled-components";
import Nav from "./Nav";

const Container = styled.div`
  width: 800px;
  margin: auto;
  @media (max-width: 800px) {
    width: 100%;
    padding: 0 20px;
  }
  padding-bottom: 100px;
  color: ${(props) => props.theme.colors.text};
`;

export default function Layout({ children, className }) {
  return (
    <Container className={className}>
      <Nav />
      {children}
    </Container>
  );
}
