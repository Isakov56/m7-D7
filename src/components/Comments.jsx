import React from "react";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

class Comments extends React.Component {
  state = {
    submitCounter: 0,

    editComment: { comment: {}, editCounter: 0 },
  };
  render() {
    return (
      <>
        {this.props.meProfile && this.props.id && this.props.comments && (
          <>
            <div
              style={{
                display: this.props.comments.includes(this.props.id)
                  ? "block"
                  : "none",
              }}
            >
              <AddComment
                meProfile={this.props.meProfile}
                id={this.props.id}
                editedCm={this.state.editComment}
                clearEditCommentState={() =>
                  this.setState({
                    editComment: {
                      comment: {},
                      editCounter: 0,
                    },
                  })
                }
                onClick={() =>
                  this.setState({
                    submitCounter: this.state.submitCounter + 1,
                  })
                }
              />
            </div>
            <CommentList
              editcomment={(id) => this.props.handleComments(id)}
              id={this.props.id}
              username={this.props.meProfile.username}
              onClick={() =>
                this.setState({
                  submitCounter: this.state.submitCounter + 1,
                })
              }
              submitCounter={this.state.submitCounter}
              editCm={(comment) =>
                this.setState({
                  editComment: {
                    comment: comment,
                    editCounter: this.state.editComment.editCounter + 1,
                  },
                })
              }
            />
          </>
        )}
      </>
    );
  }
}

export default Comments;
