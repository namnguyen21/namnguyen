import Head from "next/head";
import styled from "styled-components";
import Layout from "../components/Layout";
import Section from "../components/Section";
import Link from "next/link";

const Intro = styled.h1`
  font-size: 60px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.paper};
  max-width: 300px;
  line-height: 1;
`;

const HeroSection = styled(Section)`
  align-items: center;
`;

const Card = styled.div`
  width: 600px;
  /* background-color: ${(props) => props.theme.colors.text}; */
  background-color: rgba(255, 255, 255, 0.8);
  color: ${(props) => props.theme.colors.paper};
  border-radius: 20px;
  margin-top: 175px;

  @media (max-width: 800px) {
    width: 100%;
  }
  padding: 0 20px 20px 20px;
`;

const StyledImage = styled.img`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin: -185px auto 20px auto;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const Description = styled.p`
  font-size: 18px;
  max-width: 250px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const A = styled.a`
  color: #5489b0;
  cursor: pointer;
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Nam Nguyen</title>
        <link rel="icon" href="/images/avatar.png" />
      </Head>
      <Layout>
        <HeroSection>
          <Card>
            <StyledImage src="./images/avatar.png" />
            <Content>
              <Intro>Hi there, I'm Nam.</Intro>
              <div>
                <Description>
                  I'm a full stack developer who loves working in the JavaScript
                  ecosystem using tools like React, Redux, and Express.
                </Description>
                <Description>
                  While you're here, you can{" "}
                  <Link href="/blog">
                    <A>check out my blog</A>
                  </Link>{" "}
                  and{" "}
                  <Link href="/projects">
                    <A>see what I've been working on.</A>
                  </Link>
                </Description>
              </div>
            </Content>
          </Card>
        </HeroSection>
      </Layout>
    </>
  );
}
