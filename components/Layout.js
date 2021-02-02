import styled from "styled-components";
import { useEffect, useState } from "react";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";

const Container = styled.div`
  color: ${(props) => props.theme.colors.text};
`;

export default function Layout({ children, className }) {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    window.onscroll = function () {
      // prevScrollPos = currentScrollPos;
      if (window.pageYOffset < 25) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };
  }, [isAtTop]);
  return (
    <>
      <Head>
        <link rel="icon" href="/images/avatar.png" />
        <title>Nam Nguyen</title>
      </Head>
      <Container className={className}>
        <Nav isAtTop={isAtTop} />
        {children}
        <Footer />
      </Container>
    </>
  );
}
