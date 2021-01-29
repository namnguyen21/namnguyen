import styled from "styled-components";
import LazyLoad from "react-lazyload";

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
    margin-bottom: 5px;
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.link};
  font-size: 30px;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 400;
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
        <Title>{title && title}</Title>
        <Date>{date && parseDate(date)}</Date>
        <Description>{description && description}</Description>
      </Content>
    </Card>
  );
}
