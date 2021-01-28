import Head from "next/head";
import styled from "styled-components";
import Layout from "../components/Layout";
import Section from "../components/Section";
import Link from "next/link";
import fs from "fs";
import LazyLoad from "react-lazyload";

const Intro = styled.h1`
  font-size: 50px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.text};
  max-width: 300px;
  line-height: 1;
  width: 100%;
  text-align: center;
  @media (max-width: 800px) {
    font-size: 60px;
  }
`;

// const StyledLayout = styled(Layout)`
//   width: 1000px;
//   @media (max-width: 800px) {
//     width: 100%;
//     padding: 0 20px;
//   }
// `;

const HeroSection = styled(Section)`
  @media (min-width: 800px) {
    flex-direction: row;
    align-items: center;
  }
`;

const StyledImage = styled.img`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  border-radius: 50%;
`;

const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 250px;
  @media (max-width: 800px) {
    margin-bottom: 100px;
    max-width: 100%;
  }

  > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Content = styled.div`
  @media (min-width: 800px) {
    margin-left: 100px;
  }
`;

const Flex = styled.div`
  display: flex;
`;

const ContentSection = styled(Flex)`
  @media (min-width: 800px) {
    justify-content: space-between;
  }
  flex-direction: column;
`;

const ContentBlockHeader = styled.h3`
  font-size: 25px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 700;
  margin-right: 20px;
    margin-bottom: 15px;
`;

const ContentBlockTitle = styled.h3`
  font-size: 25px;
  color: ${(props) => props.theme.colors.link};
  font-weight: 700;
  margin-bottom: 10px;
`;

const Img = styled.img`
  width: 200px;
  border-radius: 10px;
  margin-right: 20px;
`;

const Card = styled(Flex)`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  max-width: 450px;
  margin-bottom: 15px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const P = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
`;

const ALink = styled.a`
  font-size: 16px;
  color: ${(props) => props.theme.colors.textSecondary};
  display: block;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.link};
  }
  text-align: right;
`;

export default function Home({ latestProj }) {
  return (
    <>
      <Head>
        <title>Nam Nguyen</title>
        <link rel="icon" href="/images/avatar.png" />
      </Head>
      <Layout>
        <HeroSection>
          <AboutSection>
            <StyledImage src="./images/avatar.png" alt="Avatar" />
            <Intro>Hi there, I'm Nam.</Intro>
            <P style={{ textAlign: "center" }}>
              I'm a full stack developer, who utilizes the JavaScript ecosystem
              to create beautiful applications.
            </P>
          </AboutSection>
          <Content>
            <ContentSection>
              <ContentBlockHeader>Latest Work:</ContentBlockHeader>
              <div>
                <a
                  href={latestProj.deployed}
                  alt={`Visit ${latestProj.title}`}
                  target="_blank"
                >
                  <Card>
                    <Img src={latestProj.image} alt={latestProj.title} />
                    <div>
                      <ContentBlockTitle>{latestProj.title}</ContentBlockTitle>
                      <P>{latestProj.description}</P>
                    </div>
                  </Card>
                </a>
                <Link href="/projects">
                  <ALink>{">"} View all projects</ALink>
                </Link>
              </div>
            </ContentSection>
          </Content>
        </HeroSection>
      </Layout>
    </>
  );
}

export const getStaticProps = () => {
  const projects = fs.readFileSync("projects/projects.json");
  const latestProj = JSON.parse(projects)[0];

  return {
    props: {
      latestProj,
    },
  };
};
