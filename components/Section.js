import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export default function Section({ children, style }) {
  return <Container style={style}>{children}</Container>;
}
