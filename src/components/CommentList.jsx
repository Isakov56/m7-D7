import React from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
class CommentList extends React.Component {
  state = {
    comments: [],
    loading: true,
    showEditForComment: [],
  };

  handleDeleteEdit = (id) => {
    if (this.state.showEditForComment.includes(id)) {
      this.setState({
        showEditForComment: this.state.showEditForComment.filter(
          (el) => el !== id
        ),
      });
    } else {
      this.setState({
        showEditForComment: [...this.state.showEditForComment, id],
      });
    }
  };

  fetchComments = async () => {
    this.setState({ loading: true });
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/comments/${this.props.id}`
      );
      let comments = await response.json();
      comments = comments.reverse();
      //console.log(comments);
      setTimeout(() => {
        this.setState({ comments: comments, loading: false });
      }, 2000);
    } catch (e) {
      //console.log("error: ", e);
    }
  };

  editCommentAndHidebox = (comment, id) => {
    this.props.editcomment(this.props.id);
    this.props.editCm(comment);
    this.handleDeleteEdit(id);
  };

  componentDidMount = () => {
    this.fetchComments();
  };

  componentDidUpdate = (previousProps) => {
    if (previousProps.submitCounter !== this.props.submitCounter) {
      //console.log("ComponentDidUpdate is working...");
      this.fetchComments();
    }
  };

  deleteComment = async (commentID) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/comments/${commentID}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // checking the ok property which stores the successful result of the operation
        alert("Comment deleted successfully");
        this.props.onClick();
        this.props.editcomment(this.props.id);
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      //console.log(err);
    }
  };
  render() {
    return (
      <div className="mb-5">
        {this.state.loading ? (
          <Spinner
            animation="grow"
            variant="primary"
            style={{ marginLeft: "45%" }}
          />
        ) : (
          <>
            {this.state.comments.map((comment, index) => {
              return (
                <div key={index}>
                  {this.state.comments.length > 0 && (
                    <Row className="my-3">
                      <Col md={2}>
                        <img
                          src={comment.user.image}
                          style={{ objectFit: "cover", borderRadius: "50%" }}
                          width="40px"
                          height="40px"
                          onClick={() =>
                            this.props.history.push(
                              "/profile/" + comment.user._id
                            )
                          }
                        />
                      </Col>
                      <Col
                        xs={10}
                        style={{
                          background: "#f2f2f2",
                          borderBottomRightRadius: "8px",
                          borderTopRightRadius: "8px",
                          borderBottomLeftRadius: "8px",
                          position: "relative",
                        }}
                        className="commentDelete text-dark"
                      >
                        <div className="d-flex justify-content-between">
                          <div className="mt-2">
                            <p
                              className="m-0 p-0"
                              style={{ fontSize: "13px", fontWeight: "bold" }}
                            >
                              {comment.user.name} {comment.user.surname}
                            </p>
                            <p className="m-0 p-0" style={{ fontSize: "13px" }}>
                              {comment.user.title}
                            </p>
                          </div>
                          <i
                            className="fas fa-ellipsis-h px-1 mt-2 pt-1"
                            style={{ height: "22px" }}
                            onClick={() => this.handleDeleteEdit(comment._id)}
                          ></i>
                        </div>
                        <div className="my-2">{comment.text}</div>
                        <div
                          className="bg-light shadow-lg rounded"
                          style={{
                            position: "absolute",
                            top: 28,
                            right: 20,
                            color: "#949494",
                            display: this.state.showEditForComment.includes(
                              comment._id
                            )
                              ? "block"
                              : "none",
                            zIndex: 9999,
                          }}
                        >
                          <ul style={{ listStyle: "none", padding: 0 }}>
                            <li
                              className=" p-2 px-4 mt-2 "
                              onClick={() =>
                                this.editCommentAndHidebox(comment, comment._id)
                              }
                            >
                              <i className="fas fa-pencil-alt mr-3"></i> Edit
                              post
                            </li>
                            <li
                              className="p-2 px-4 mb-2"
                              onClick={() => this.deleteComment(comment._id)}
                            >
                              <i className="fas fa-trash-alt mr-3"></i> Delete
                              post
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

export default withRouter(CommentList);
