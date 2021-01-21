import styled from "styled-components";
import Head from "next/head";
import Nav from "./Nav";

const Container = styled.div`
  width: 800px;
  margin: auto;
  @media (max-width: 800px) {
    width: 100%;
    padding: 0 10px;
  }
  padding-bottom: 200px;
  color: ${(props) => props.theme.colors.text};
`;

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <Container>
        <Nav />
        {children}
      </Container>
    </>
  );
}
