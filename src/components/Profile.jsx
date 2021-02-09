import React from "react";
import { Alert, Col, Spinner } from "react-bootstrap";
import backend from "../utils/backend";
import AboutBio from "./AboutBio";
import Activity from "./Activity";
import BoxInfo from "./BoxInfo";
import Dashboard from "./Dashboard";
import ELC from "./ELC";
import Interests from "./Interests";
import ModalExperience from "./ModalExperience";
import ModalForm from "./ModalForm";
import ProfileStrength from "./ProfileStrength";
import Sidebar from "./Sidebar";
import SkillsAndEndorsement from "./SkillsAndEndorsement";
class Profile extends React.Component {
  state = {
    myProfile: {},
    show: false,
    submitCounter: 0,
    showModalExperience: false,
    MyExperience: [],
    editExperience: { experience: {} },
    submitExpCounter: 0,
    loading: true,
    loadingExp: true,
  };

  fetchProfile = async () => {
    this.setState({ loading: true });
    try {
      const {
        match: {
          params: { id },
        },
      } = this.props;

      const { data } = await backend.get(`/profile/${id}`);
      const [metod, base64] = process.env.REACT_APP_TOKEN.split(" ");
      const decoded = atob(base64);
      const [username, password] = decoded.split(":");
      this.setState({ myProfile: data, loading: false });
      this.fetchExperience(data._id);
      if (data.username === username || id === "me") {
        this.props.changeMe();
      } else {
        this.props.changeNotMe();
      }
      //console.log(data);
    } catch (e) {
      //console.log(e);
    }
  };
  fetchExperience = async (id) => {
    this.setState({ loadingExp: true });
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/experience/${id}`,
        {
          headers: {
            Authorization: process.env.REACT_APP_USERID,
          },
        }
      );
      let MyExperience = await response.json();
      //console.log("here experience", MyExperience);
      MyExperience = MyExperience.reverse();

      if (response.ok) {
        this.setState({ MyExperience, loadingExp: false });
      } else {
        this.setState({ loadingExp: false });
        <Alert variant="danger">Something went wrong</Alert>;
      }
    } catch (err) {
      //console.log(err);
    }
  };

  componentDidMount = () => {
    // if (this.props.match.params.id === "me") {
    //   this.props.changeMe();
    // } else {
    //   this.props.changeNotMe();
    // }
    this.fetchProfile();
  };

  componentDidUpdate = (previousProps, previousState) => {
    if (previousState.submitCounter !== this.state.submitCounter) {
      this.fetchProfile();
    }

    if (previousState.submitExpCounter !== this.state.submitExpCounter) {
      this.fetchExperience(this.state.myProfile._id);
    }
    if (previousProps.match.params.id !== this.props.match.params.id) {
      // if (this.props.match.params.id === process.env.REACT_APP_USERID) {
      //   this.props.changeMe();
      // } else {
      //   this.props.changeNotMe();
      // }
      this.fetchProfile();
    }
  };

  render() {
    //console.log("profile props:", this.props.location.pathname);
    return (
      <>
        {this.state.show && (
          <ModalForm
            show={this.state.show}
            hide={() =>
              this.setState({
                show: false,
              })
            }
            myProfile={this.state.myProfile}
            submitCounter={() =>
              this.setState({ submitCounter: this.state.submitCounter + 1 })
            }
          />
        )}

        <Col md={8}>
          {this.state.loading ? (
            <Spinner
              animation="border"
              variant="success"
              style={{ marginLeft: "45%" }}
            />
          ) : (
            <>
              <BoxInfo
                id={this.state.myProfile._id}
                me={this.props.me}
                myProfile={this.state.myProfile}
                onClicked={() => {
                  this.setState({ show: true });
                }}
                submitCounter={() =>
                  this.setState({ submitCounter: this.state.submitCounter + 1 })
                }
              />
              <AboutBio text={this.state.myProfile.bio} />
            </>
          )}
          {this.props.me && (
            <>
              <ProfileStrength exp={this.state.MyExperience} />

              <Dashboard />
            </>
          )}
          <>
            <Activity myProfile={this.state.myProfile} />

            {this.state.showModalExperience && (
              <ModalExperience
                id={this.state.myProfile._id}
                showModalExperience={this.state.showModalExperience}
                hide={() =>
                  this.setState({
                    showModalExperience: false,
                    editExperience: { experience: {} },
                  })
                }
                submitExpCounter={() =>
                  this.setState({
                    submitExpCounter: this.state.submitExpCounter + 1,
                  })
                }
                editExp={this.state.editExperience}
              />
            )}

            {this.state.loadingExp ? (
              <Spinner
                animation="border"
                variant="success"
                style={{ marginLeft: "45%" }}
              />
            ) : (
              <ELC
                me={this.props.me}
                onClicked={() => {
                  this.setState({ showModalExperience: true });
                }}
                MyExperience={this.state.MyExperience}
                editExp={(experience) =>
                  this.setState({
                    editExperience: {
                      experience: experience,
                    },
                  })
                }
                submitExpCounter={() =>
                  this.setState({
                    submitExpCounter: this.state.submitExpCounter + 1,
                  })
                }
              />
            )}

            <SkillsAndEndorsement me={this.props.me} />
            <Interests />
          </>
        </Col>
        <Col md={4} className="px-5">
          <Sidebar me={this.props.me} />
        </Col>
      </>
    );
  }
}
export default Profile;
