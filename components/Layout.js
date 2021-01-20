import styled from "styled-components";
import Nav from "./Nav";

const Container = styled.div`
  width: 800px;
  margin: auto;
`;

export default function Layout({ children }) {
  return (
    <Container>
      <Nav />
      {children}
    </Container>
  );
}
