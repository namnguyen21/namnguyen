import styled from "styled-components";
import LazyLoad from "react-lazyload";

import { P, H2 } from "./Type";

const Card = styled.article`
  width: 100%;
  display: flex;
`;

const Img = styled.img`
  height: 200px;
  border-radius: 10px;
  margin-right: 20px;
`;

const Content = styled.div`
  > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Date = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
`;

export default function BlogPreview({ url, img, title, description, date }) {
  function parseDate(dateStr) {
    dateStr = dateStr.split(" ").splice(1, 3).join(" ");

    return dateStr;
  }

  return (
    <Card>
      <LazyLoad>
        <Img src={img ? img : null} alt={title && title} />
      </LazyLoad>
      <Content>
        <H2 color="link">{title && title}</H2>
        <Date>{date && parseDate(date)}</Date>
        <P>{description && description}</P>
      </Content>
    </Card>
  );
}
