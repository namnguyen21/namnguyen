import styled from "styled-components";

const Container = styled.section`
  width: 800px;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  margin: 100px auto 0 auto;
  @media (max-width: 800px) {
    width: 100%;
    padding: 0 20px 100px 20px;
  }
  min-height: calc(100vh - 74px - 160px);
`;

export default function Section({ children, style, className }) {
  return (
    <Container className={className} style={style}>
      {children}
    </Container>
  );
}
