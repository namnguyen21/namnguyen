import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import marked from "marked";
import styled from "styled-components";
import Prism from "prismjs";
import { useEffect } from "react";
import { Link } from "react-scroll";

import Layout from "../../components/Layout";
import Section from "../../components/Section";
import { H2 } from "../../components/Type";

const StyledSection = styled(Section)`
  width: 600px;
  margin: 100px auto 0 auto;
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
    font-family: ${(props) => props.theme.font.heading};
  }

  p {
    color: ${(props) => props.theme.colors.textSecondary};
  }
  margin-bottom: 50px;
`;

const TableOfContents = styled.section`
  width: 100%;
  margin: 0 auto 50px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 6px 8px rgb(0 0 0 / 10%), 0 0 5px rgb(0 0 0 / 20%),
    inset 0 0 2px rgb(255 255 255 / 50%);
  margin-top: 30px;
  padding: 20px 50px;
`;

const ContentList = styled.ol`
  margin-top: 10px;
  width: 100%;
  list-style-position: inside;
  li {
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

const SubList = styled.ul`
  margin: 10px 0 0 20px;
`;

const StyledAnchor = styled(Link)`
  color: ${(props) => props.theme.colors.link};
`;

const AlternateAnchor = styled(Link)`
  color: ${(props) => props.theme.colors.textSecondary};
`;

const Content = styled.article`
  color: ${(props) => props.theme.colors.text};

  > *:not(:last-child) {
    margin-bottom: 30px;
  }

  h1,
  h2,
  h3 {
    color: ${(props) => props.theme.colors.heading};
    font-weight: 900;
    font-family: ${(props) => props.theme.font.heading};
  }
  a {
    color: ${(props) => props.theme.colors.link};
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.colors.textSecondary};
    }
  }

  h1 {
    font-size: 35px;
  }

  h2 {
    font-size: 30px;
  }

  h3 {
    font-size: 25px;
  }

  p {
    line-height: 2;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.5px;
    color: ${(props) => props.theme.colors.text};
    code {
      background-color: #c4c4c4;
      color: ${(props) => props.theme.colors.paper};
      padding: 0 5px;
    }
  }

  ol,
  ul {
    font-size: 18px;
    font-weight: 400;
    list-style-position: inside;

    > *:not(:last-child) {
      margin-bottom: 10px;
    }
    p,
    li {
      font-size: 18px;
      font-weight: 400;
      line-height: 2;
    }

    code {
      background-color: #c4c4c4;
      color: ${(props) => props.theme.colors.paper};
      padding: 0 5px;
    }
  }

  img {
    width: 100%;
    display: block;
  }

  pre {
    overflow: auto;
    background-color: #2c292d;
    padding: 20px;
    border-left: solid 1px #dbdbdb;
    border-bottom: solid 1px #dbdbdb;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    ::-webkit-scrollbar {
      height: 5px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.colors.text};
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${(props) => props.theme.colors.heading};
    }

    .token.atrule {
      color: #c792ea;
    }

    .token.attr-name {
      color: #ffcb6b;
    }

    .token.attr-value {
      color: #a5e844;
    }

    .token.attribute {
      color: #a5e844;
    }

    .token.boolean {
      color: #c792ea;
    }

    .token.builtin {
      color: #ffcb6b;
    }

    .token.cdata {
      color: #80cbc4;
    }

    .token.char {
      color: #80cbc4;
    }

    .token.class {
      color: #ffcb6b;
    }

    .token.class-name {
      color: #f2ff00;
    }

    .token.comment {
      color: #616161;
    }

    .token.constant {
      color: #c792ea;
    }

    .token.deleted {
      color: #ff6666;
    }

    .token.doctype {
      color: #616161;
    }

    .token.entity {
      color: #ff6666;
    }

    .token.function {
      color: #c792ea;
    }

    .token.hexcode {
      color: #f2ff00;
    }

    .token.id {
      color: #c792ea;
      font-weight: bold;
    }

    .token.important {
      color: #c792ea;
      font-weight: bold;
    }

    .token.inserted {
      color: #80cbc4;
    }

    .token.keyword {
      color: #c792ea;
    }

    .token.number {
      color: #fd9170;
    }

    .token.operator {
      color: #89ddff;
    }

    .token.prolog {
      color: #616161;
    }

    .token.property {
      color: #80cbc4;
    }

    .token.pseudo-class {
      color: #a5e844;
    }

    .token.pseudo-element {
      color: #a5e844;
    }

    .token.punctuation {
      color: #89ddff;
    }

    .token.regex {
      color: #f2ff00;
    }

    .token.selector {
      color: #ff6666;
    }

    .token.string {
      color: #a5e844;
    }

    .token.symbol {
      color: #c792ea;
    }

    .token.tag {
      color: #ff6666;
    }

    .token.unit {
      color: #fd9170;
    }

    .token.url {
      color: #ff6666;
    }

    .token.variable {
      color: #ff6666;
    }
  }

  code {
    color: #fff;
    font-size: 16px;
  }

  iframe {
    width: 100% !important;
  }
`;

export default function Post({ htmlString, data }) {
  useEffect(() => {
    Prism.highlightAll();
  });

  function parseDate(dateStr) {
    dateStr = dateStr.split(" ").splice(1, 3).join(" ");

    return dateStr;
  }
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta
          property="og:image"
          content={`https://namnguyen-portfolio.netlify.app/${data.thumbnail}`}
        />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="200" />
        <meta property="og:description" content={data.description} />
        <meta property="og:title" content={data.title} />
        <meta property="og:type" content="website" />
      </Head>
      <Layout>
        <StyledSection>
          <Header>
            <h1>{data.title}</h1>
            <p>{parseDate(data.date)}</p>
          </Header>
          <TableOfContents>
            <H2 color="text">Content</H2>
            <ContentList>
              {data.toc.map((link, i) => (
                <li key={i}>
                  <StyledAnchor to={`${link.id}`} smooth="true">
                    {link.display}
                    {link.subheadings ? (
                      <SubList>
                        {link.subheadings.map((sub, idx) => (
                          <li key={idx}>
                            <AlternateAnchor to={sub.id}>
                              {sub.subheading}
                            </AlternateAnchor>
                          </li>
                        ))}
                      </SubList>
                    ) : null}
                  </StyledAnchor>
                </li>
              ))}
            </ContentList>
          </TableOfContents>
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
export const getStaticProps = async (context) => {
  const { slug } = context.params;
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
