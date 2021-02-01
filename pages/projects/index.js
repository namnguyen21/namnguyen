import fs from "fs";
import Head from 'next/head'

import Section from "../../components/Section";
import Layout from "../../components/Layout";
import ProjectCard from "../../components/ProjectCard";

export default function index({ projects }) {
  return (
    <>
    <Head>
    <meta
          name="description"
          content="Personal portfolio for software development."
        />
        <meta property="og:image" content="/images/avatar.png" />
        <meta property="og:description" content="Personal portfolio for software development." />
        <meta property="og:url" content="" />
        <meta property="og:title" content="Nam Nguyen - Portfolio" />
        <meta property="og:type" content="website" />
    </Head>
      <Layout>
        <Section>
          {projects.map((proj, i) => (
            <ProjectCard
              key={i}
              title={proj.title}
              description={proj.description}
              tools={proj.tools}
              imgSrc={proj.image}
              deployed={proj.deployed}
              github={proj.github}
              youtube={proj.youtube}
            />
          ))}
        </Section>
      </Layout>
    </>
  );
}

export const getStaticProps = async (contexxt) => {
  const projects = fs.readFileSync("projects/projects.json");

  return {
    props: {
      projects: JSON.parse(projects),
    },
  };
};
