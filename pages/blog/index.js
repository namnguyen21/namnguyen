import fs from "fs";
import Link from "next/link";
import styled from "styled-components";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";
import path from "path";
import matter from "gray-matter";

import Layout from "../../components/Layout";
import Section from "../../components/Section";
import BlogPreview from "../../components/BlogPreview";

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
  const container = useRef(null);

  useEffect(() => {
    if (slugs.length === 0) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../../components/animations/robot.json"),
      });
    }
  }, []);

  return (
    <Layout>
      <Section>
        {slugs.length > 0 ? (
          slugs.map((slug, i) => (
            <Link key={i} href={`/blog/${slug.route}`} passHref>
              <A className="myLink">
                <BlogPreview
                  title={slug.title}
                  img={slug.thumbnail}
                  date={slug.date}
                />
              </A>
            </Link>
          ))
        ) : (
          <DisplayError>
            <AnimationContainer ref={container}></AnimationContainer>
            <Error>
              Looks like you're a little early! I'm currently working on content
              right now, so please come back soon!
            </Error>
          </DisplayError>
        )}
      </Section>
    </Layout>
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

    content.push(parsed.data);
  }

  console.log(content);
  return {
    props: {
      slugs: content,
    },
  };
};
