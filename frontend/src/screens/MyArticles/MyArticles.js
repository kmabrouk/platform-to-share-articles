import React, { useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { BsHandThumbsUp } from "react-icons/bs";

import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import CardGroup from "react-bootstrap/CardGroup";
import HeroSection from "../../components/HeroSection";

import { useDispatch, useSelector } from "react-redux";
import { listArticles, likeArticle } from "../../actions/articlesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import "./styles.css";
function MyArticles({ history, search }) {
  const dispatch = useDispatch();

  const articleList = useSelector((state) => state.articleList);
  const { loading, error, articles } = articleList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const articleDelete = useSelector((state) => state.articleDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = articleDelete;

  const articleCreate = useSelector((state) => state.articleCreate);
  const { success: successCreate } = articleCreate;

  const articleUpdate = useSelector((state) => state.articleUpdate);
  const { success: successUpdate } = articleUpdate;

  useEffect(() => {
    dispatch(listArticles());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const deleteHandler = (id) => async (dispatch, getState) => {
    await axios.delete(`/api/articles/${id}`, config);
    history.push("/myarticles");
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      <HeroSection />
      <Link to="/createarticle">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new Article
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      <CardGroup className="cards">
        {articles &&
          articles
            .filter((filteredArticle) =>
              filteredArticle.title.toLowerCase().includes(search.toLowerCase())
            )
            .reverse()
            .map((article, k) => (
              <div key={k}>
                {article.isApprove && (
                  <Card className="CardItem" key={k}>
                    <Card.Header className="HeaderItem">
                      Category : {article.category}
                    </Card.Header>
                    <Link to={`/displayarticle/${article._id}`}>
                      <Card.Img variant="top" src={article.pic} />
                    </Link>
                    <Card.Body className="BodyItem">
                      <Card.Title className="TitleItem">
                        {article.title}
                      </Card.Title>
                      <Card.Text>
                        {article.content.slice(0, 100) + " ..."}
                      </Card.Text>
                      <Col className="d-flex justify-content-between">
                        <i
                          variant="primary"
                          className="btn mb-0 btnlike"
                          onClick={() => {
                            likeArticle(article._id);
                          }}
                        >
                          <BsHandThumbsUp className=" indigo-text mb-0" />
                          {" " + article.likeCount + " Like"}
                        </i>
                        {userInfo.isAdmin && (
                          <button
                            className="ml-5 mb-0 btndel"
                            onClick={deleteHandler(article._id)}
                          >
                            Delete
                          </button>
                        )}
                      </Col>
                    </Card.Body>
                  </Card>
                )}
              </div>
            ))}
      </CardGroup>
    </MainScreen>
  );
}

export default MyArticles;
