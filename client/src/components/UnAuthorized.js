import React from "react";
import { Alert } from "reactstrap";

const UnAuthorized = () => {
  return (
    <Alert
      color="danger"
      style={{ marginTop: "40vh", marginRight: 10, marginLeft: 10 }}
    >
      Sorry, You are unauthorized to perform this action
    </Alert>
  );
};

export default UnAuthorized;
