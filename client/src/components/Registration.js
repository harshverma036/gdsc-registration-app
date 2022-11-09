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
  const [email, setEmail] = useState("");
  const [roll, setRoll] = useState("");
  const [clg, setClg] = useState(null);
  const [department, setdepartment] = useState(null);

  const [othersclg, setothersClg] = useState(null);
  const [othersdepartment, setothersdepartment] = useState(null);

  useEffect(() => {
    const userdata = JSON.parse(
      localStorage.getItem("gdsc_student_token_github_session")
    );
    console.log(userdata);
    if (!localStorage.getItem("gdsc_student_token_github_session")) {
      console.log("adsfhjhasdf");
      navigate(`/unauthorized`);
    } else if (
      userdata &&
      (userdata.token !== token || userdata.isRegistered)
    ) {
      console.log("this one");
      navigate(`/unauthorized`);
    }
  }, []);

  const onClickHandle = async () => {
    try {
      setLoading(true);
      const url = `${URL}/registration`;
      console.log(url);
      const localStorageItem = JSON.parse(
        localStorage.getItem("gdsc_student_token_github_session")
      );
      const { data } = await axios.post(
        url,

        {
          name,
          roll,
          department: department === "OTHERS" ? othersdepartment : department,
          college: clg === "OTHERS" ? othersclg : clg,
          email,
          token: JSON.parse(localStorage.getItem("gdsc_student_token_github_session"))
            .token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      localStorageItem.isRegistered = true;
      localStorage.setItem(
        "gdsc_student_token_github_session",
        JSON.stringify(localStorageItem)
      );
      setLoading(false);
      navigate(`/success`);
    } catch (error) {
      console.log(error);
      navigate(`/unauthorized`);
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
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="select_clg_dprt">Select Department</Label>
          <Input
            id="select_clg_dprt"
            name="select"
            type="select"
            value={department}
            onChange={(e) => setdepartment(e.target.value)}
          >
            <option disabled selected value={null}>
              Select Department
            </option>
            <option value={"IT"}>IT</option>
            <option value={"CSE"}>CSE</option>
            <option value={"ME"}>ME</option>
            <option value={"ECE"}>ECE</option>
            <option value={"OTHERS"}>Others</option>
          </Input>
        </FormGroup>

        {department === "OTHERS" && (
          <FormGroup>
            <Label for="department">Department</Label>
            <Input
              id="department"
              name="text"
              placeholder="Department"
              type="text"
              required
              value={othersdepartment}
              onChange={(e) => setothersdepartment(e.target.value)}
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label for="select_clg_dprt">Select College</Label>
          <Input
            id="select_clg_dprt"
            name="select"
            type="select"
            value={clg}
            onChange={(e) => setClg(e.target.value)}
          >
            <option disabled selected value={null}>
              Select College
            </option>
            <option value={"CEC"}>CEC {"(2nd Year onwards)"}</option>
            <option value={"Applied Science"}>
              Applied Science {"(1st Year)"}
            </option>
            <option value={"OTHERS"}>Others</option>
          </Input>
        </FormGroup>

        {clg === "OTHERS" && (
          <FormGroup>
            <Label for="college">College</Label>
            <Input
              id="college"
              name="text"
              placeholder="College"
              type="text"
              required
              value={othersclg}
              onChange={(e) => setothersClg(e.target.value)}
            />
          </FormGroup>
        )}

        <Button
          color="danger"
          block
          disabled={!name || !roll || !clg || loading || (department === "OTHERS" && !othersdepartment) || (clg === "OTHERS" && !othersclg)}
          onClick={() => onClickHandle()}
        >
          {loading && <Spinner size="sm">Loading...</Spinner>} Register
        </Button>
      </Col>
    </Row>
  );
};

export default Registration;
