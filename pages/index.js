import Head from "next/head";
import styled from "styled-components";
import Layout from "../components/Layout";
import Section from "../components/Section";

const Emoji = styled.div`
  font-size: 100px;
`;

const Intro = styled.h1`
  font-size: 50px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text};
  margin-left: 100px;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Nam Nguyen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Section style={{flexDirection: 'row', marginTop: '200px'}}>
          <Emoji>👋</Emoji>
          <Intro>Hi there, I'm Nam.</Intro>
        </Section>
      </Layout>
    </>
  );
}
