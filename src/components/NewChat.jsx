import React, { useState, useEffect } from "react";
import { Button, Modal, InputGroup, FormControl, Form } from "react-bootstrap";
import io from "socket.io-client";
import "./NewChat.css";

const connOpt = {
    transports: ["websocket"], // socket connectin options
  };
  
  let socket = io("https://striveschool-api.herokuapp.com", connOpt);

export default function NewChat() {
  const [username, setUsername] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    socket.on("connect", () => console.log("connected to socket"));
    socket.emit("setUsername", {
        username: "Isakov",
    });
    socket.on("list", (users) => {
        let noDuplicateUsers = [...new Set(users)]
        setUsers(
        users
          .concat(noDuplicateUsers)
          .filter((x) => x !== "Isakov")
        )
    })
    
    

 
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();

    if (message !== "") {
      socket.emit("chatmessage", {
        to: "Rita",
        text: message,
      });
      setMessage("");
    }
  };
  
  const toggleModal = () => {
      setShowModal(!showModal);
    };
  return (
    <div>
      <Button id="sticky-button" onClick={toggleModal}>
        message
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={toggleModal}
      >
        <Modal.Header>
          <Modal.Title>message to Abdug'affor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form.Label>To whom</Form.Label>
          <InputGroup className="mb-3">
            <FormControl
              onChange={(e) => setUsername(e.currentTarget.value)}
            ></FormControl>
          </InputGroup> */}
          <div>

          </div>
        </Modal.Body>
        <Modal.Footer>
        <Form.Control type="text" placeholder="message..."  onChange={(e) => setMessage(e.currentTarget.value)}/>
          <Button onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
