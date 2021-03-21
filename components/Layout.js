import styled from "styled-components";
import { useEffect, useState } from "react";
import Head from "next/head";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import Footer from "./Footer";

const Container = styled.div`
  color: ${(props) => props.theme.colors.text};
`;

export default function Layout({ children, className }) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [show, setShow] = useState(true);
  let prevScroll = 0;

  useEffect(() => {
    window.onscroll = function () {
      // prevScrollPos = currentScrollPos;
      if (window.pageYOffset < 25) {
        setIsAtTop(true);
        setShow(true);
      } else {
        setIsAtTop(false);
      }

      if (window.pageYOffset > prevScroll) {
        setShow(false);
      } else {
        setShow(true);
      }

      prevScroll = window.pageYOffset;
    };
  }, [isAtTop]);
  return (
    <>
      <Head>
        <link rel="icon" href="/images/avatar.png" />
        <title>Nam Nguyen</title>
      </Head>
      <Container className={className}>
        <Nav show={show} isAtTop={isAtTop} />
        <MobileNav show={show} isAtTop={isAtTop} />
        {children}
        <Footer />
      </Container>
    </>
  );
}
