import styled from "styled-components";
import { SiLinkedin, SiGithub } from "react-icons/si";

const Container = styled.footer`
  width: 100%;
  border-top: solid 1px #1e232e;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`;

const SocialsGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  >*:not(:last-child) {
      margin-right: 50px;
  }
`;

const Social = styled.a`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 30px;
  transition: all 0.2s;
  &:hover {
      color: ${props => props.theme.colors.link};
  }
`;

export default function Footer() {
  return (
    <Container>
      <SocialsGroup>
        <Social href="https://github.com/namnguyen21" alt="Github">
          <SiGithub />
        </Social>
        <Social
          href="https://www.linkedin.com/in/namdoannguyen/"
          alt="Linkedin"
        >
          <SiLinkedin />
        </Social>
      </SocialsGroup>
    </Container>
  );
}
