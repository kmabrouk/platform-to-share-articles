import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { commentArticle } from "../../actions/articlesActions";
import "./comments.css";
import "../MyArticles/styles.css";

function DisplayArticle({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const [pic, setPic] = useState();
  const [comments, setComments] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [value, setValue] = useState("");
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/articles/${match.params.id}`);
      // console.log(data);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
      setPic(data.pic);
      setComments(data.comments);
    };

    fetching();
  }, [match.params.id, date]);

  return (
    <MainScreen title="Article Details :">
      <div className="container">
        <div className="row">
          <div className="col-sm-5 col-md-6 col-12 pb-4">
            <Card.Body>
              <Card.Title>Title: {title}</Card.Title>
              <Card.Text>Content: {content}</Card.Text>
            </Card.Body>
            <br />
            <div className="container">
              <h3
                style={{
                  textDecoration: "underline",
                  textDecorationStyle: "double",
                }}
              >
                Comments :
              </h3>
              {comments.map((record, i) => {
                return (
                  <div
                    className="comment mt-4 text-justify float-left"
                    style={{ display: "block" }}
                    key={i}
                  >
                    <img
                      src={record.postedBy?.pic}
                      alt=""
                      className="rounded-circle"
                      width="40"
                      height="40"
                    />
                    <h6>{record.postedBy?.name}</h6>
                    <span>{record.postedBy?.createdAt.format}</span>
                    <br />
                    <p>{record.text}</p>
                    <hr style={{ border: "1px solid black" }} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
            <form>
              <Card.Header>Category : {category}</Card.Header>
              <Card.Img variant="top" src={pic} />
            </form>
          </div>
        </div>
      </div>

      <input
        type="text"
        placeholder="add a comment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <input
        type="submit"
        onClick={() => {
          commentArticle(value, match.params.id, userInfo._id);
        }}
      />
    </MainScreen>
  );
}

export default DisplayArticle;
