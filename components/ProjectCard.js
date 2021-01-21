import styled from "styled-components";
import Image from "next/image";
import { FiExternalLink, FiGithub, FiYoutube } from "react-icons/fi";

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

const ImageContainer = styled.div`
  width: 400px;
  height: 300px;
  display: block;
  position: relative;
  @media screen and (max-width: 800px) {
    width: 100%;

    margin-bottom: 50px;
  }
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
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

const Title = styled.h2`
  color: ${(props) => props.theme.colors.link};
  font-size: 32px;
  /* text-transform: uppercase; */
  letter-spacing: 3px;
  font-weight: 800;
`;

const Description = styled.p`
  font-size: 20px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 300;
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
        <ImageContainer>
          <StyledImage layout="fill" src={imgSrc} alt={title} />
        </ImageContainer>
      </A>
      <DescriptionContainer>
        <A href={deployed && deployed} target="_blank">
          <Title>{title}</Title>
        </A>
        <TagContainer>
          {tools && tools.map((tool, i) => <Tag key={i}>{tool}</Tag>)}
        </TagContainer>

        <Description>{description}</Description>
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
