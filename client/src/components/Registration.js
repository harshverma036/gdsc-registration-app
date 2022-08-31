import React, { useState, useEffect } from "react";
import { Row, Col, FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";

const Registration = () => {
  const { token } = useParams();
//   console.log(token, "ttoookkeenn");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [clg, setClg] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("gdsc_student_token")) {
      navigate(`/unauthorized`);
    } else if (
      localStorage.getItem("gdsc_student_token") &&
      localStorage.getItem("gdsc_student_token") !== token
    ) {
      navigate(`/unauthorized`);
    }
  }, []);

  const onClickHandle = async () => {
    try {
      const url = `${URL}/gen-token`;
      console.log(url);
      const { data } = await axios.get(url);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row xs={12} style={{ marginTop: 100, marginRight: 14, marginLeft: 14 }}>
      <Col xs="12" style={{ textAlign: "center" }}>
        <img
          src="https://res.cloudinary.com/cartzet/image/upload/v1661948231/gdsc_logo_astqzo.jpg"
          alt="gdsc_logo"
          width={100}
          height={140}
        />
      </Col>
      <Col>
        <h4 className="text-danger text-center">
          Google Developer Student Clubs
        </h4>
        <h5 className="text-primary text-center">Registration</h5>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            id="name"
            name="text"
            placeholder="Full name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="roll no">Roll No</Label>
          <Input
            id="roll no"
            name="text"
            placeholder="Roll No."
            type="text"
            required
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="select_clg_dprt">Select College/Department</Label>
          <Input
            id="select_clg_dprt"
            name="select"
            type="select"
            value={clg}
            onChange={(e) => setClg(e.target.value)}
          >
            <option disabled selected value={null}>
              Select College/Department
            </option>
            <option value={"CEC - IT/CSE 2nd Year onwards"}>
              CEC - IT/CSE {"(2nd Year onwards)"}
            </option>
            <option value={"CEC - ME/ECE 2nd Year onwards"}>
              CEC - ME/ECE {"(2nd Year onwards)"}
            </option>
            <option value={"Applied Science - IT/CSE 1st Year"}>
              Applied Science - IT/CSE {"(1st Year)"}
            </option>
            <option value={"Applied Science - ME/ECE 1st Year"}>
              Applied Science - ME/ECE {"(1st Year)"}
            </option>
          </Input>
        </FormGroup>
        <Button
          color="danger"
          block
          disabled={!name || !roll || !clg || loading}
          onClick={() => onClickHandle()}
        >
          {loading && <Spinner size="sm">Loading...</Spinner>} Register
        </Button>
      </Col>
    </Row>
  );
};

export default Registration;
