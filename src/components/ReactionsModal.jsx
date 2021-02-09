import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import "./ReactionsModal.css";
import { Link } from "react-router-dom";

class ReactionsModalBranch extends Component {
  state = {
    post: this.props.reactions.filter((post) => post._id === this.props.postId),
  };
  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={() => this.props.reactionModalShowHandler()}
        >
          <Modal.Header closeButton className="modal-header">
            <div className="d-flex flex-column">
              <Modal.Title>Reactions</Modal.Title>
              <div className="d-flex">
                <Button className="reactionsNav bg-transparent text-secondary shadow-none">
                  All 65
                </Button>
                <Button className="reactionsNav bg-transparent text-secondary shadow-none">
                  <img
                    src="https://static-exp1.licdn.com/sc/h/cl3whaxvghi8p07u3hntnbfph"
                    alt=""
                  />
                </Button>
                <Button className="reactionsNav bg-transparent text-secondary shadow-none">
                  <img
                    src="https://static-exp1.licdn.com/sc/h/42bnvk00rrfjybzfrm3fb4jul"
                    alt=""
                  />
                </Button>
                <Button className="reactionsNav bg-transparent text-secondary shadow-none">
                  <img
                    src="https://static-exp1.licdn.com/sc/h/33nd4mvilhuci25n6hieyiajt"
                    alt=""
                  />
                </Button>
                <Button className="reactionsNav bg-transparent text-secondary shadow-none">
                  <img
                    src="https://static-exp1.licdn.com/sc/h/36zyzxysf2uf7pfyamn2myj7y"
                    alt=""
                  />
                </Button>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body className="modal-body">
            {this.state.post.reactions &&
              this.state.post.reactions.map((reaction, index) => (
                <div className="d-flex mb-3" key={index}>
                  <img src={reaction.user.image} alt="" className="p-img" />
                  <Link
                    to={"/profile/" + reaction.user._id}
                    className="d-flex flex-column border-bottom p-1"
                  >
                    <h6 className="font-weight-bold">
                      {reaction.user.name} {reaction.user.surname}
                    </h6>
                    <span className="job">{reaction.user.title}</span>
                  </Link>
                </div>
              ))}

            {/* <div className="d-flex mb-3">
              <img
                src="https://media-exp1.licdn.com/dms/image/C4D03AQFcEwVHxUGnZA/profile-displayphoto-shrink_100_100/0/1600361623590?e=1617235200&v=beta&t=0p385omz3FSGfXluRhbBifC8obG3EzbbRzwbIz5dKD0"
                alt=""
                className="p-img"
              />
              <Link className="d-flex flex-column border-bottom p-1">
                <h6 className="font-weight-bold">
                  Luis Antonio Canettoli Ordonez
                </h6>
                <span className="job">
                  MERN Full Stack Developer | Technical Lead @ Clispo | Teaching
                  Assistant @ Strive School
                </span>
              </Link>
            </div>
            <div className="d-flex mb-3">
              <img
                src="https://media-exp1.licdn.com/dms/image/C4D03AQFcEwVHxUGnZA/profile-displayphoto-shrink_100_100/0/1600361623590?e=1617235200&v=beta&t=0p385omz3FSGfXluRhbBifC8obG3EzbbRzwbIz5dKD0"
                alt=""
                className="p-img"
              />
              <Link className="d-flex flex-column border-bottom p-1">
                <h6 className="font-weight-bold">
                  Luis Antonio Canettoli Ordonez
                </h6>
                <span className="job">
                  MERN Full Stack Developer | Technical Lead @ Clispo | Teaching
                  Assistant @ Strive School
                </span>
              </Link>
            </div>
            <div className="d-flex mb-3">
              <img
                src="https://media-exp1.licdn.com/dms/image/C4D03AQFcEwVHxUGnZA/profile-displayphoto-shrink_100_100/0/1600361623590?e=1617235200&v=beta&t=0p385omz3FSGfXluRhbBifC8obG3EzbbRzwbIz5dKD0"
                alt=""
                className="p-img"
              />
              <Link className="d-flex flex-column border-bottom p-1">
                <h6 className="font-weight-bold">
                  Luis Antonio Canettoli Ordonez
                </h6>
                <span className="job">
                  MERN Full Stack Developer | Technical Lead @ Clispo | Teaching
                  Assistant @ Strive School
                </span>
              </Link>
            </div> */}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ReactionsModalBranch;
