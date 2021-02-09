import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

class SideFooter extends React.Component {
  render() {
    return (
      <Card className=" mt-2 sideFooter">
        <Row>
          <Col className="text-center">
            <Link to={"#"}> Informations</Link>
          </Col>
          <Col className="text-center">
            <Link to={"#"}> Accessibility</Link>
          </Col>
          <Col className="text-center">
            <Link to={"#"}> Service Center</Link>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Link to={"#"}> Privacy&Policy</Link>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Link to={"#"}> Options for advertisements</Link>
          </Col>
          <Col className="text-center">
            <Link to={"#"}> Advertising</Link>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Link to={"#"}> Business services</Link>
          </Col>
          <Col className="text-center">
            <Link to={"#"}> Download the LinkedIN app</Link>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Link to={"#"}> Other</Link>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="text-center">Prova</Col>
        </Row>
      </Card>
    );
  }
}
export default SideFooter;
