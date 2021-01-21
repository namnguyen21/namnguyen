import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import marked from "marked";
import styled from "styled-components";

import Layout from "../../components/Layout";
import Section from "../../components/Section";

const Content = styled.div`
  color: ${(props) => props.theme.colors.text};
`;

export default function Post({ htmlString, data }) {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta title="description" content={data.description} />
      </Head>
      <Layout>
        <Section>
          <Content>
            <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
          </Content>
        </Section>
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

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data,
    },
  };
};
