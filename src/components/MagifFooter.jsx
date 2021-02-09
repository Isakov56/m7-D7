import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
class MagicFooter extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <Link to={"#"}> &nbsp</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}> Information</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}> Community guidelines</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}> Privacy&Policy</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}> Sales Solutions</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}> Security Center</Link>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <Link to={"#"}> &nbsp</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}> Information</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}> Community guidelines</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}> Privacy&Policy</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}> Sales Solutions</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={"#"}> &nbsp</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default MagicFooter;
