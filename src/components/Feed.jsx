// import debounce from "lodash.debounce";
import React from "react";
import { Alert, Card, Col, Media, Row, Spinner } from "react-bootstrap";
import ModalEditPost from "./ModalEditPost";
import Comments from "./Comments";
import LikeComponent from "./LikeComponent";
import ReactionsModal from "./ReactionsModal";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      // links: null,
      // like: localStorage.getItem("likes").split(","),
      like: [],
      comments: [],
      loading: true,
      userName: this.props.meProfile.username,
      show: false,
      post: {},

      addShow: false,
      postId: "",
    };

    // window.onscroll = debounce(() => {
    //   const { loading } = this;

    //   if (loading) return;

    //   if (
    //     window.innerHeight + document.documentElement.scrollTop ===
    //     document.documentElement.offsetHeight
    //   ) {
    //     if (this.props.links !== "") {
    //       this.fetchPosts(this.props.links);
    //     }
    //   }
    // }, 1000);
  }

  reactionModalShowHandler = () => {
    this.setState({ addShow: !this.state.addShow });
  };

  handleLikes = (id) => {
    let likes = [];
    if (this.state.like.includes(id)) {
      likes = this.state.like.filter((el) => el !== id);
      this.setState({
        like: likes,
      });
    } else {
      likes = [...this.state.like, id];
      this.setState({ like: likes });
    }
  };

  handleComments = (id) => {
    if (this.state.comments.includes(id)) {
      this.setState({
        comments: this.state.comments.filter((el) => el !== id),
      });
    } else {
      this.setState({ comments: [...this.state.comments, id] });
    }
  };

  fetchPosts = async (url) => {
    this.setState({ loading: true });
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/posts`, {
        // headers: {
        //   Authorization: process.env.REACT_APP_TOKEN,
        // },
      });
      const data = await response.json();

      //console.log("posts", data);
      if (response.ok) {
        const posts = data.posts;
        this.setState({
          posts,
          loading: false,
          // links: data.links.next,
        });
        this.props.addLinks(data.links.next);
      } else {
        this.setState({ loading: false });
        <Alert variant="danger">Something went wrong!</Alert>;
      }
    } catch (error) {
      //console.log(error);
    }
  };

  componentDidUpdate = (previousProps, prevState) => {
    if (previousProps.feedCounter !== this.props.feedCounter) {
      this.fetchPosts();
    }

    if (previousProps.new_post !== this.props.new_post) {
      this.setState({ posts: this.state.posts.unshift(this.props.new_post) }); //[...]
      console.log("this.props.new_post", this.props.new_post);
      console.log("posts:", this.state.posts);
    }
  };
  componentDidMount = () => {
    this.fetchPosts();
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <Spinner
            animation="border"
            variant="primary"
            style={{ marginLeft: "45%" }}
          />
        ) : (
          <Row>
            {this.state.addShow && (
              <ReactionsModal
                reactionModalShowHandler={() =>
                  this.setState({ addShow: false })
                }
                showModal={() => this.setState({ addShow: true })}
                addShow={this.state.addShow}
                reactions={this.state.posts}
                postId={this.state.postId}
              />
            )}
            {this.state.posts.map((post, index) => (
              <Col md={12} className="my-1" key={index}>
                <Card className="p-4 postProfile">
                  <Row>
                    <Col xs={11}>
                      <Media className="p-1">
                        <img
                          width={64}
                          height={64}
                          className="mr-3"
                          src={post.user.image && post.user.image}
                          alt="user"
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                          onClick={() =>
                            this.props.history.push("/profile/" + post.user._id)
                          }
                        />
                        <Media.Body>
                          <h5
                            onClick={() =>
                              this.props.history.push(
                                "/profile/" + post.user._id
                              )
                            }
                          >
                            {post.user.name} {post.user.surname}
                          </h5>
                          <h6 style={{ color: "#b0b0b0", fontSize: "15px" }}>
                            {post.user.title}
                          </h6>
                          <h6 style={{ color: "#b0b0b0", fontSize: "15px" }}>
                            {post.createdAt}
                            <i
                              className="fas fa-globe-americas ml-1"
                              style={{ color: "#6c6c6c" }}
                            ></i>
                          </h6>
                        </Media.Body>
                      </Media>
                    </Col>
                    <Col xs={1}>
                      <i
                        className="fas fa-ellipsis-h p-1"
                        style={{
                          color: "#404040",
                          display:
                            post.user.username === this.state.userName
                              ? "inline"
                              : "none",
                        }}
                        onClick={() =>
                          this.setState({ post: post, show: true })
                        }
                      ></i>
                    </Col>
                  </Row>
                  <div className="border-bottom pb-4">
                    <p className="pt-3 pb-4 px-1">
                      {post.text}
                      <br />
                    </p>
                    <br />
                    <div className="reactionNumber d-flex">
                      <p
                        onClick={() =>
                          this.setState({ addShow: true, postId: post._id })
                        }
                      >
                        {post.reactions.length} Reactions
                      </p>
                    </div>
                    {post.image && (
                      <img
                        alt="user"
                        src={post.image}
                        className="img-fluid "
                        style={{
                          objectFit: "cover",
                          maxHeight: "300px",
                          width: "100%",
                          borderColor: "#e7e6e5",
                        }}
                      />
                    )}
                  </div>

                  {post && this.props.meProfile._id && (
                    <LikeComponent
                      postId={post._id}
                      handleLikes={(id) => this.handleLikes(id)}
                      like={this.state.like}
                      handleComments={(id) => this.handleComments(id)}
                      userId={this.props.meProfile._id}
                    />
                  )}
                  {/* <div
                    style={{
                      display: this.state.comments.includes(post._id)
                        ? "block"
                        : "none",
                    }}
                  >
                    <AddComment
                      id={post._id}
                      editedCm={this.state.editComment}
                      meProfile={this.props.meProfile}
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
                  <div>
                    <CommentList
                      id={post._id}
                      username={this.state.userName}
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
                  </div> */}
                  <Comments
                    meProfile={this.props.meProfile}
                    id={post._id}
                    comments={this.state.comments}
                    handleComments={(id) => this.handleComments(id)}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <ModalEditPost
          post={this.state.post}
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          feedCounter={this.props.changeCounter}
          // addLinks={(link) => this.props.addLinks(link)}
        />
      </>
    );
  }
}

export default Feed;
