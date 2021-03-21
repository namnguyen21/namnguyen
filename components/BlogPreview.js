import styled from "styled-components";
import LazyLoad from "react-lazyload";

import { H2 } from "./Type";

const Card = styled.article`
  width: 100%;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  margin-bottom: 100px;
  &:last-child() {
    margin-bottom: 0px;
  }
  > *:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const Img = styled.img`
  width: 100%;
`;

const Content = styled.div`
  > *:not(:last-child) {
    margin-bottom: 10px;
  }

  color: ${(props) => props.theme.colors.text};

  font-size: 18px;
  font-weight: 300;

  p {
    line-height: 1.5;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.5px;

    code {
      background-color: #c4c4c4;
      color: ${(props) => props.theme.colors.paper};
      padding: 0 5px;
    }
  }

  ol,
  ul {
    font-size: 18px;
    font-weight: 300;
    list-style-position: inside;

    > *:not(:last-child) {
      margin-bottom: 10px;
    }
    p {
      font-size: 18px;
      font-weight: 300;
    }

    code {
      background-color: #c4c4c4;
      color: ${(props) => props.theme.colors.paper};
      padding: 0 5px;
    }
  }
`;

const Button = styled.a`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 18px;
  display: block;
  text-align: right;
  margin-left: auto;
  span {
    &:hover {
      color: ${(props) => props.theme.colors.link};
    }
  }
`;

const Date = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
`;

export default function BlogPreview({ img, title, date, content }) {
  function parseDate(dateStr) {
    dateStr = dateStr.split(" ").splice(1, 3).join(" ");

    return dateStr;
  }

  return (
    <Card>
      <H2 color="link">{title && title}</H2>
      <Date>{date && parseDate(date)}</Date>
      <LazyLoad>
        <Img src={img ? img : null} alt={title && title} />
      </LazyLoad>
      <Content dangerouslySetInnerHTML={{ __html: content }}></Content>
      <Button>
        <span>{">"} View post</span>
      </Button>
    </Card>
  );
}
