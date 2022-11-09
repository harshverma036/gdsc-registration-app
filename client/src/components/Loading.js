import React, { useEffect } from "react";
import { Row, Col, Spinner } from "reactstrap";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();
  const getToken = async () => {
    try {
      const url = `${URL}/gen-token`;
      console.log(url);
      const { data } = await axios.get(url);
      console.log(data, "data");
      if (data) {
        localStorage.setItem("gdsc_student_token_github_session", JSON.stringify({
            token: data,
            isRegistered: false
        }));
        navigate(`/registration/${data}`);
      }
    } catch (error) {
        console.log(error, "error");
        navigate(`/unauthorized`);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await getToken();
    };
    fetch();
  }, []);

  return (
    <Row xs={2}>
      <Col xs="12" style={{ textAlign: "center" }}>
        <img
          src="https://res.cloudinary.com/cartzet/image/upload/v1661948231/gdsc_logo_astqzo.jpg"
          alt="gdsc_logo"
          width={200}
          height={350}
          style={{ marginTop: 70 }}
        />
      </Col>
      <Col className="mt-2">
        <Spinner color="danger" style={{ marginLeft: 170 }}>
          Loading...
        </Spinner>
      </Col>
    </Row>
  );
};

export default Loading;
