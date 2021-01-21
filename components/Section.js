import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export default function Section({ children, style, className }) {
  return (
    <Container className={className} style={style}>
      {children}
    </Container>
  );
}
