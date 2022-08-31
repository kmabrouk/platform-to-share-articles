import { Card, CardGroup } from "react-bootstrap";
import { BsHandThumbsUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { likeArticle } from "../../actions/articlesActions";

const ItemsList = ({ articles }) => {
  return (
    <CardGroup className="cards">
      {articles.lenght >= 1 ? (
        articles.map((article, k) => (
          <Card className="CardItem" key={k}>
            <Card.Header className="HeaderItem">
              Category : {article.category}
            </Card.Header>
            <Link to={`/displayarticle/${article._id}`}>
              <Card.Img variant="top" src={article.pic} />
            </Link>
            <Card.Body className="BodyItem">
              <Card.Title className="TitleItem">{article.title}</Card.Title>
              <Card.Text>{article.content}</Card.Text>
              <BsHandThumbsUp
                onClick={() => {
                  likeArticle(article._id);
                }}
              />
            </Card.Body>
          </Card>
        ))
      ) : (
        <h3 className="text-center">No articles of this category </h3>
      )}
    </CardGroup>
  );
};

export default ItemsList;
