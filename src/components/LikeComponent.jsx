import React from "react";

class LikeComponent extends React.Component {
  state = {
    reactions: { reaction: null },
    reactionNumber: 0,
    post: {},
    postReactionCounter: 0,
  };

  fetchPost = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/${this.props.postId}`
      );
      let post = await response.json();

      let reactionNumber = post.reactions
        .filter((p) => p.user._id === this.props.userId)
        .map((rea) => rea.reaction);

      if (response.ok) {
        this.setState({ post });
        if (reactionNumber.length > 0) {
          this.setState({ reactionNumber: reactionNumber[0] });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this.fetchPost();
  };

  componentDidUpdate = (previousProps, prevState) => {
    if (prevState.postReactionCounter !== this.state.postReactionCounter) {
      this.fetchPost();
    }
  };

  likeLayout = () => {
    let reaction = this.state.reactionNumber;
    let component = "";
    let styleComponent = "";
    let text = "";
    let font = "20px";
    if (reaction === 1) {
      component = "fas fa-thumbs-up ";
      styleComponent = "#1485bd";
      text = "Like";
    } else if (reaction === 2) {
      component = "fas fa-sign-language ";
      styleComponent = "#6dae4f";
      text = "Celebrate";
    } else if (reaction === 3) {
      component = "fas fa-heart ";
      styleComponent = "#df704d";
      text = "Love";
    } else if (reaction === 4) {
      component = "fas fa-lightbulb ";
      styleComponent = "#f5bb5c";
      text = "Insightful";
    } else if (reaction === 5) {
      component = "fas fa-surprise ";
      styleComponent = "#b392b1";
      text = "Curious";
    } else {
      component = "far fa-thumbs-up ";
      styleComponent = "#6c6c6c";
      text = "Like";
    }

    return { component, styleComponent, text, font };
  };

  deletefetch = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/${this.props.postId}/${this.props.userId}/removeReaction`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        this.setState({
          reactionNumber: 0,
          postReactionCounter: this.state.postReactionCounter + 1,
        });
        // this.props.addLinks();
      } else {
        //console.log(this.state.POSTModel.text);
        alert("Something went wrong");
        //console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  deleteReaction = () => {
    this.props.handleLikes(this.props.postId);
    if (this.state.reactionNumber > 0) {
      this.deletefetch();
    }
  };
  postReaction = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/posts/${this.props.postId}/${this.props.userId}/addReaction`,
        {
          method: "POST",
          body: JSON.stringify(this.state.reactions),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        this.setState({
          reactions: { reaction: null },
          postReactionCounter: this.state.postReactionCounter + 1,
        });
        // this.props.addLinks();
      } else {
        //console.log(this.state.POSTModel.text);
        alert("Something went wrong");
        //console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  submitReaction = (number) => {
    this.setState({
      reactions: {
        reaction: number,
      },
    });
    this.props.handleLikes(this.props.postId);
    setTimeout(() => {
      this.postReaction();
    }, 2000);
  };

  render() {
    return (
      <>
        <div
          className="d-flex  mt-3 posts "
          style={{ color: "#6c6c6c", position: "relative" }}
        >
          <span
            className="px-3"
            style={{
              color: this.likeLayout().styleComponent,
              fontSize: this.likeLayout().font,
            }}
            onClick={() => this.deleteReaction()}
            onMouseEnter={() => this.props.handleLikes(this.props.postId)}
            // onMouseLeave={() => this.props.handleLikes(this.props.postId)}
          >
            <i
              className={this.likeLayout().component}
              style={{ color: this.likeLayout().styleComponent }}
            ></i>{" "}
            {this.likeLayout().text}
          </span>

          <span
            className="px-3"
            style={{ fontSize: this.likeLayout().font }}
            onClick={() => this.handleComments(this.props.postId)}
          >
            <i className="far fa-comment-dots"></i> Comment
          </span>
          <span className="px-3" style={{ fontSize: this.likeLayout().font }}>
            <i className="fas fa-share-square"></i> Share
          </span>
          <span className="px-3" style={{ fontSize: this.likeLayout().font }}>
            <i className="fas fa-paper-plane"></i> Send
          </span>
          <div
            className="reactionBox justify-content-between bg-light shadow-lg rounded-pill  p-3"
            style={{
              position: "absolute",
              zIndex: 9999,
              top: -60,
              left: -50,
              display: this.props.like.includes(this.props.postId)
                ? "flex"
                : "none",
            }}
          >
            <i
              onClick={() => this.submitReaction(1)}
              className="fas fa-thumbs-up mx-3"
              style={{ color: "#1485bd", fontSize: "30px" }}
            ></i>
            <i
              onClick={() => this.submitReaction(2)}
              className="fas fa-sign-language mr-3"
              style={{ color: "#6dae4f", fontSize: "30px" }}
            ></i>
            <i
              onClick={() => this.submitReaction(3)}
              className="fas fa-heart mr-3"
              style={{ color: "#df704d", fontSize: "30px" }}
            ></i>
            <i
              onClick={() => this.submitReaction(4)}
              className="fas fa-lightbulb mr-3"
              style={{ color: "#f5bb5c", fontSize: "30px" }}
            ></i>
            <i
              onClick={() => this.submitReaction(5)}
              className="fas fa-surprise mr-3"
              style={{ color: "#b392b1", fontSize: "30px" }}
            ></i>
          </div>
        </div>
      </>
    );
  }
}

export default LikeComponent;
