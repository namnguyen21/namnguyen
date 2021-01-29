import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import marked from "marked";
import styled from "styled-components";

import Layout from "../../components/Layout";
import Section from "../../components/Section";

const StyledSection = styled(Section)`
  width: 600px;
  margin: auto;
  @media (max-width: 800px) {
    width: 100%;
    padding: 0 10px 100px 10px;
  }
`;

const Header = styled.div`
  h1 {
    font-size: 40px;
    margin-bottom: 10px;
    font-weight: 900;
    letter-spacing: 2px;
  }

  p {
    color: ${(props) => props.theme.colors.textSecondary};
  }
  margin-bottom: 50px;
`;

const Content = styled.main`
  color: ${(props) => props.theme.colors.text};

  > *:not(:last-child) {
    margin-bottom: 30px;
  }

  h1,
  h2,
  h3 {
    color: ${(props) => props.theme.colors.link};
    font-weight: 900
  }

  h1 {
    font-size: 35px;
  }

  h2 {
    font-size: 30px;
  }

  p {
    line-height: 1.5;
    font-size: 20px;
    font-weight: 300;
  }

  img {
    width: 100%;
    display: block;
  }

  iframe {
    width: 100% !important;
  }
`;

export default function Post({ htmlString, data }) {
  function parseDate(dateStr) {
    dateStr = dateStr.split(" ").splice(1, 3).join(" ");

    return dateStr;
  }
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta title="description" content={data.description} />
      </Head>
      <Layout>
        <StyledSection>
          <Header>
            <h1>{data.title}</h1>
            <p>{parseDate(data.date)}</p>
          </Header>
          <Content dangerouslySetInnerHTML={{ __html: htmlString }}></Content>
        </StyledSection>
      </Layout>
    </>
  );
}

// needed for SSG
export const getStaticPaths = async () => {
  // gives an array of file names in the posts directory
  const files = fs.readdirSync("posts");

  return {
    paths: files.map((file) => ({
      params: {
        slug: file.replace(".md", ""),
      },
    })),
    fallback: false,
  };
};

// will provide props for our post component
export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs
    .readFileSync(path.join("posts", slug + ".md"))
    .toString();

  const parsedMarkdown = matter(markdownWithMeta);

  const htmlString = marked(parsedMarkdown.content);

  // make date json
  parsedMarkdown.data.date = parsedMarkdown.data.date.toString();

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data,
    },
  };
};
