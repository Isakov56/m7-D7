import React from "react";
import { Card } from "react-bootstrap";

function AboutBio(props) {
  return (
    <Card className="mt-4 p-4">
      <Card.Title style={{ color: "#323232" }}>About</Card.Title>
      <Card.Body style={{ color: "#323232" }}>{props.text}</Card.Body>
    </Card>
  );
}

export default AboutBio;
