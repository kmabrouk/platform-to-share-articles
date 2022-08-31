import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Card } from "react-bootstrap";
import "../MyArticles/styles.css";
import "./ProfileScreen.css";

function ShowProfileScreen({ match, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(
        `/api/users/${match.params.id}/showprofile`
      );

      setName(data.name);
      setEmail(data.email);
      setPic(data.pic);
    };

    fetching();
  }, [match.params.id]);

  return (
    <MainScreen title="Article Details :">
      <div className="container">
        <Card.Img
          className="img-thumbnail d-flex justify-content-center rounded"
          style={{ maxWidth: 500, borderRadius: "15px!important" }}
          variant="top"
          src={pic}
        />
        <Card.Body className="d-inline justify-content-center">
          <Card.Title>name: {name}</Card.Title>
          <Card.Text>email: {email}</Card.Text>
        </Card.Body>
      </div>
    </MainScreen>
  );
}

export default ShowProfileScreen;
