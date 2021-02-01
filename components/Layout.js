import styled from "styled-components";
import { useEffect, useState } from "react";
import Head from "next/head";
import Nav from "./Nav";

const Container = styled.div`
  width: 800px;
  margin: 100px auto 0 auto;
  @media (max-width: 800px) {
    width: 100%;
    padding: 0 20px;
  }
  padding-bottom: 100px;
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
      </Container>
    </>
  );
}
