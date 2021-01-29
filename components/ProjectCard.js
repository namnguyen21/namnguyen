import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { FiExternalLink, FiGithub, FiYoutube } from "react-icons/fi";

import { P, H2 } from "../components/Type";

const Card = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > * {
    &:nth-child(2) {
      margin-left: 50px;
      @media (max-width: 800px) {
        margin-left: 0;
      }
    }
  }
  &:not(:last-child) {
    margin-bottom: 200px;
  }
  &:nth-child(even) {
    > * {
      :first-child {
        @media (min-width: 800px) {
          order: 2;
        }
      }

      :nth-child(2) {
        @media (min-width: 800px) {
          order: 1;
          margin-left: 0;
          margin-right: 50px;
        }

        > *:nth-child(4) {
          justify-content: flex-end;
        }
      }
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const A = styled.a`
  display: block;
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const Tag = styled.div`
  padding: 2px 10px;
  background-color: ${(props) => props.theme.colors.textSecondary};
  color: ${(props) => props.theme.colors.paper};
  font-weight: 300;
  border-radius: 5px;
`;

const StyledImage = styled.img`
  border-radius: 10px;
  width: 400px;
  @media screen and (max-width: 800px) {
    width: 100%;

    margin-bottom: 50px;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
  @media (max-width: 800px) {
    max-width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  color: ${(props) => props.theme.colors.link};
  font-size: 30px;
  font-weight: 100;
  > *:hover {
    color: ${(props) => props.theme.colors.text};
  }
  > *:not(:last-child) {
    margin-right: 20px;
  }
  @media (max-width: 800px) {
    justify-content: flex-end;
  }
`;

export default function ProjectCard({
  title,
  description,
  imgSrc,
  tools,
  youtube,
  github,
  deployed,
}) {
  return (
    <Card>
      <A style={{ width: "100%" }} href={deployed && deployed} target="_blank">
        <LazyLoad>
          <StyledImage src={imgSrc} alt={title} />
        </LazyLoad>
      </A>
      <DescriptionContainer>
        <A href={deployed && deployed} target="_blank">
          <H2 color="link">{title}</H2>
        </A>
        <TagContainer>
          {tools && tools.map((tool, i) => <Tag key={i}>{tool}</Tag>)}
        </TagContainer>

        <P>{description}</P>
        <ButtonGroup>
          <A href={deployed && deployed} alt="Visit Site" target="_blank">
            <FiExternalLink />
          </A>
          <A
            href={github && github}
            alt="Visit Github Repository"
            target="_blank"
          >
            <FiGithub />
          </A>
          <A href={youtube && youtube} alt="Visit Youtube Demo" target="_blank">
            <FiYoutube />
          </A>
        </ButtonGroup>
      </DescriptionContainer>
    </Card>
  );
}
