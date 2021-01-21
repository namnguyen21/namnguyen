import fs from "fs";
import Section from "../../components/Section";
import Layout from "../../components/Layout";
import ProjectCard from "../../components/ProjectCard";

export default function index({ projects }) {
  return (
    <>
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
