import React from "react";
import { Col, Row } from "react-bootstrap";
import FileUnderProfile from "./FileUnderProfile";
import ProfileCard from "./ProfileCard";

class FeedSideLeft extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <ProfileCard meProfile={this.props.meProfile} />
          </Col>
        </Row>
        <Row>
          <Col>
            <FileUnderProfile />
          </Col>
        </Row>
      </div>
    );
  }
}
export default FeedSideLeft;
