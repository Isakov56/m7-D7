import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

class AdSense extends React.Component {
  render() {
    return (
      <Card className=" mt-2 p-2">
        <Link to={"#"}>
          <Image
            style={{ width: "1100%" }}
            src="https://picsum.photos/200"
            thumbnail
            className="img"
          />
        </Link>
      </Card>
    );
  }
}
export default AdSense;
