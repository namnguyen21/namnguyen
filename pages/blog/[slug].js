import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import marked from "marked";
import styled from "styled-components";
import Prism from "prismjs";
import { useEffect } from "react";

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
    font-weight: 900;
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

  pre {
    overflow: auto;
    background-color: #2c292d;
    padding: 10px;
    border-radius: 10px;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

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
