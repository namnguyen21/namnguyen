import fs from "fs";
import Link from "next/link";
import styled from "styled-components";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import Head from "next/head";

import Layout from "../../components/Layout";
import Section from "../../components/Section";
import BlogPreview from "../../components/BlogPreview";

const StyledSection = styled(Section)`
  width: 600px;
  margin: 100px auto 0 auto;
  @media (max-width: 600px) {
    width: 100%;
  }

  > *:not(:last-child) {
    margin-bottom: 100px;
  }
`;

const A = styled.a`
  color: ${(props) => props.theme.colors.link};
  display: block;
`;

const DisplayError = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;
const AnimationContainer = styled.div`
  height: 400px;
  width: 400px;
`;

const Error = styled.p`
  max-width: 300px;
  font-size: 20px;
  font-weight: 200;
`;

export default function index({ slugs }) {


  return (
    <>
      <Head>
        <meta
          name="description"
          content="Personal blog for software development."
        />
        <meta property="og:image" content="/images/avatar.png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="200" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
        <meta property="og:title" content="Nam Nguyen - Blog" />
        <meta property="og:type" content="website" />
      </Head>
      <Layout>
        <StyledSection>
          {slugs.map(({ content, data }, i) => (
            <Link key={i} href={`/blog/${data.route}`} passHref>
              <A className="myLink">
                <BlogPreview
                  title={data.title}
                  img={data.thumbnail}
                  date={data.date}
                  content={content}
                />
              </A>
            </Link>
          ))}
        </StyledSection>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  // will return empty array if no posts
  const files = fs.readdirSync("posts");

  const content = [];

  for (let filename of files) {
    const markdownWithMeta = fs
      .readFileSync(path.join("posts", filename))
      .toString();

    // will return data and content
    const parsed = matter(markdownWithMeta);

    let { data } = parsed;
    data.date = data.date.toString();
    data.route = filename.replace(".md", "");

    const bodyArr = parsed.content.split(" ").slice(0, 60);
    bodyArr.push("...");
    const body = bodyArr.join(" ");

    content.push({ data: parsed.data, content: marked(body) });
  }

  content.sort((a, b) => {
    return new Date(b.data.date) - new Date(a.data.date);
  });

  // console.log(content);

  return {
    props: {
      slugs: content,
    },
  };
};
