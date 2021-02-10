import Head from "next/head";
import styled from "styled-components";
import Layout from "../components/Layout";
import Section from "../components/Section";
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

import { P, H3 } from "../components/Type";

const Intro = styled.h1`
  font-size: 50px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.text};
  max-width: 300px;
  line-height: 1;
  width: 100%;
  text-align: center;
  font-family: ${(props) => props.theme.font.body};
  @media (max-width: 800px) {
    font-size: 60px;
  }
`;

const HeroSection = styled(Section)`
  @media (min-width: 800px) {
    flex-direction: row;
    align-items: flex-end;
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
  @media (max-width: 800px) {
    > *:not(:last-child) {
      margin-bottom: 50px;
    }
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

const Img = styled.img`
  width: 200px;
  border-radius: 10px;
  margin-right: 20px;
  @media (max-width: 800px) {
    display: none;
  }
`;

const Card = styled(Flex)`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  max-width: 450px;
  margin-bottom: 15px;
  border: solid 1px ${(props) => props.theme.colors.paper};
  @media (max-width: 800px) {
    width: 100%;
  }
  transition: all 0.2s;
  &:hover {
    border: solid 1px ${(props) => props.theme.colors.link};
  }
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
  font-family: ${(props) => props.theme.font.body};
`;

export default function Home({ latestProj, latestBlog }) {
  return (
    <>
      <Head>
        <title>Nam Nguyen</title>
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
                    <div>
                      <H3 style={{ marginBottom: "10px" }} color="link">
                        {latestProj.title}
                      </H3>
                      <P size="16px">{latestProj.description}</P>
                    </div>
                  </Card>
                </a>
                <Link href="/projects">
                  <ALink>{">"} View all projects</ALink>
                </Link>
              </div>
            </ContentSection>
            {/* ----------------------- */}
            <ContentSection>
              <ContentBlockHeader>Latest Post:</ContentBlockHeader>
              <div>
                <Link href={`/blog/${latestBlog.title.toLowerCase()}`}>
                  <a alt={`Visit ${latestBlog.title}`}>
                    <Card>
                      <div>
                        <H3 style={{ marginBottom: "10px" }} color="link">
                          {latestBlog.title}
                        </H3>
                        <P size="16px">{latestBlog.description}</P>
                      </div>
                    </Card>
                  </a>
                </Link>
                <Link href="/blog">
                  <ALink>{">"} View all posts</ALink>
                </Link>
              </div>
            </ContentSection>
          </Content>
        </HeroSection>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const projects = fs.readFileSync("projects/projects.json");
  const latestProj = JSON.parse(projects)[0];

  const slugs = fs.readdirSync("posts");
  const blogPosts = [];

  for (let slug of slugs) {
    const file = fs.readFileSync(path.join("posts", slug)).toString();

    const parsed = matter(file);

    parsed.data.date = parsed.data.date.toString();
    blogPosts.push(parsed.data);
  }

  blogPosts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return {
    props: {
      latestProj,
      latestBlog: blogPosts[0],
    },
  };
};
