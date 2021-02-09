import React from "react";
import { Button, Card } from "react-bootstrap";
import BoxInfoButton from "./BoxInfoButton";
import OpenToWork from "./OpenToWork";
import PencilEdit from "./PencilEdit";
import ModalProfilePicture from "./ModalProfilePicture";

class BoxInfo extends React.Component {
  state = {
    showPictureModal: false,
    showMore: false,
  };

  render() {
    return (
      <Card>
        <Card.Img
          variant="top"
          src="https://coverfiles.alphacoders.com/372/37275.jpg"
          style={{ objectFit: "cover" }}
          alt="placeholderr"
        />
        <Card.Body>
          <div
            className="d-flex justify-content-between"
            style={{ position: "relative" }}
          >
            <div style={{ marginTop: "-130px" }}>
              <img
                src={this.props.myProfile.image}
                alt="placeholder"
                height="160px"
                width="160px"
                style={{
                  borderRadius: "50%",
                  border: "4px solid white",
                  objectFit: "cover",
                }}
                onClick={() => {
                  this.setState({ showPictureModal: true });
                }}
              />

              {this.state.showPictureModal && this.props.me && (
                <ModalProfilePicture
                  showPictureModal={this.state.showPictureModal}
                  hidePictureModal={() =>
                    this.setState({ showPictureModal: false })
                  }
                  submitCounter={this.props.submitCounter}
                  id={this.props.id}
                />
              )}
            </div>
            <div>
              <BoxInfoButton me={this.props.me} />
              <Button
                variant="outline-secondary"
                className="rounded-pill p-1 px-4"
                onClick={() => {
                  this.setState({ showMore: !this.state.showMore });
                }}
              >
                More...
              </Button>
              <PencilEdit
                color="#666666"
                me={this.props.me}
                onClicked={this.props.onClicked}
              />
            </div>
            <div
              className="downloadpdfcsv bg-light shadow-lg rounded p-0"
              onMouseLeave={() => {
                this.setState({ showMore: false });
              }}
              style={{
                position: "absolute",
                top: 50,
                right: -110,
                borderTopLeftRadius: 0,
                zIndex: 9999,
                display: this.state.showMore ? "block" : "none",
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                }}
              >
                <a
                  href={`${process.env.REACT_APP_BE_URL}/profile/${this.props.id}/CV`}
                  style={{ color: "#616160" }}
                >
                  <li className=" mt-2 mb-3 px-2 py-1">
                    <i className="fas fa-file-pdf fa-2x px-2"></i> Save to PDF
                  </li>
                </a>
                <a
                  href={`${process.env.REACT_APP_BE_URL}/experience/${this.props.id}/csv`}
                  style={{ color: "#616160" }}
                >
                  <li className="px-2 py-1">
                    <i className="fas fa-file-csv fa-2x px-2 "></i> Save
                    experiences to CSV
                  </li>
                </a>
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <div>
              <h3 className="text-dark" style={{ fontWeight: "normal" }}>
                {this.props.myProfile.name} {this.props.myProfile.surname}
              </h3>
              <h5 className="text-secondary" style={{ fontWeight: "normal" }}>
                {this.props.myProfile.title}
              </h5>
              <ul className="d-flex pl-0 ">
                <li style={{ listStyle: "none" }}>
                  {this.props.myProfile.area}
                </li>
                <li
                  className="mx-4 text-primary"
                  style={{ fontWeight: "bold" }}
                >
                  72 connections
                </li>
                <li
                  className="mx-3 text-primary"
                  style={{ fontWeight: "bold" }}
                >
                  Contact info
                </li>
              </ul>
            </div>
            <div className="ml-0 pl-0 mr-5 pr-5">
              <div className="d-flex align-items-center">
                <img
                  src="https://strive.school/favicon.ico"
                  height="40px"
                  className="mr-2"
                  alt="strive"
                />
                <a
                  href="https://www.linkedin.com/school/strive-school/"
                  style={{ color: "#666666" }}
                >
                  Strive School
                </a>
              </div>
            </div>
          </div>
          {this.props.me && <OpenToWork me={this.props.me} />}
        </Card.Body>
      </Card>
    );
  }
}

export default BoxInfo;
