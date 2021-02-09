import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AddFeeds from "./AddFeeds";
import AdSense from "./AdSense";
import DownFeed from "./DownFeed";
import SideFooter from "./SideFooter";
import ViewedCourses from "./ViewedCourses";

class FeedSideRight extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <AddFeeds />
          </Col>
        </Row>
        <Row>
          <Col>
            <DownFeed />
          </Col>
        </Row>
        <Row>
          <Col>
            <ViewedCourses />
          </Col>
        </Row>
        <Row>
          <Col>
            <AdSense />
          </Col>
        </Row>
        <Row>
          <Col>
            <SideFooter />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default FeedSideRight;
