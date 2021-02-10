import styled from "styled-components";

const TypeP = styled.p`
  font-size: ${(props) => (props.size ? props.size : "20px")};
  font-weight: 300;
  line-height: 1.4;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.font.body};
  letter-spacing: 0.5px;
`;

export const P = ({ children, className, style, size }) => {
  return (
    <TypeP style={style} className={className} size={size}>
      {children}
    </TypeP>
  );
};

const TypeH1 = styled.h1`
  font-size: 35px;
  font-weight: 900;
  letter-spacing: 3px;
  color: ${(props) =>
    props.color === "text"
      ? props.theme.colors.text
      : props.color === "link"
      ? props.theme.colors.link
      : props.theme.colors.textSecondary};
  font-family: ${(props) => props.theme.font.heading};
`;

export const H1 = ({ children, className, color }) => {
  return (
    <TypeH1 className={className} color={color}>
      {children}
    </TypeH1>
  );
};

const TypeH2 = styled.h2`
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 2px;
  color: ${(props) =>
    props.color === "text"
      ? props.theme.colors.text
      : props.color === "link"
      ? props.theme.colors.link
      : props.theme.colors.textSecondary};
  font-family: ${(props) => props.theme.font.heading};
`;

export const H2 = ({ children, className, color, style }) => {
  return (
    <TypeH2 style={style} className={className} color={color}>
      {children}
    </TypeH2>
  );
};

const TypeH3 = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: ${(props) =>
    props.color === "text"
      ? props.theme.colors.text
      : props.color === "link"
      ? props.theme.colors.link
      : props.theme.colors.textSecondary};
  letter-spacing: 2px;
  font-family: ${(props) => props.theme.font.heading};
`;

export const H3 = ({ children, className, color, style }) => {
  return (
    <TypeH3 style={style} className={className} color={color}>
      {children}
    </TypeH3>
  );
};
