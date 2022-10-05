import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";

const Success = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("gdsc_student_token_android"));
    if (userdata && !userdata.isRegistered) {
      navigate(`/unauthorized`);
    }
  }, []);

  return (
    <Alert
      color="success"
      style={{ marginTop: "40vh", marginRight: 10, marginLeft: 10 }}
    >
      Yayy, Registered Sucessfully!!!! Thanks
    </Alert>
  );
};

export default Success;
