import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { io } from "socket.io-client";
import "../foyer.css";

export default function Foyer() {
  const socket = io("http://localhost:5050");
  //console.log("Socket connected from foyer.js:", socket.connected)

  const [name, setName] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [hasEnteredChat, setHasEnteredChat] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [rooms, setRooms] = useState([]);
  const emojis = [
    "🎮",
    "❓",
    "🃏",
    "😀",
    "😢",
    "💩",
    "🤡",
    "👋",
    "👍",
    "🌴",
    "✔️",
    "💀",
    "🤬",
    "🤯",
    "🧠",
    "🥳",
  ];
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    //stop repeated messages
    return () => {
      socket.off("message");
    };
  }, []);

  const addEmojiToMessage = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  useEffect(() => {
    // Scroll to the bottom of the messages container whenever new messages are added
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  //handles the regular messages
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with name:", name, "and message:", message);

    if (name && message) {
      console.log("name: " + name + " message: " + message);
      socket.emit("sendMessage", { name, message });
      setMessage("");

      if (!hasEnteredChat) {
        setMessages((messages) => [
          ...messages,
          { message: `${name} has entered the chat`, isInfoMessage: true },
        ]);
        setHasEnteredChat(true);
      }
    }
  };

  // Effect to handle room-related actions
  useEffect(() => {
    // Emit "getRooms" event to fetch the room list when the component mounts
    socket.emit("getRooms");

    // Listen for "roomList" event and update rooms state
    socket.on("roomList", (roomList) => {
      setRooms(roomList);
    });

    // Clean up socket listeners when the component unmounts
    return () => {
      socket.off("roomList");
    };
  }, []);

  const handleCreateRoom = () => {
    if (roomNumber === "") {
      socket.emit("createRoom");
      socket.on("roomCreated", (roomID) => {
        console.log("roomCreated event received with roomID:", roomID);
        setRoomNumber(roomID);
      });
      socket.on("roomList", (roomList) => {
        setRooms(roomList);
      });
    }
  };

  const handleJoinRoom = (roomID) => {
    socket.emit("joinRoom", roomID);
    socket.on("roomJoined", (roomID) => {
      console.log("roomJoined event received with roomID:", roomID);
      setRoomNumber(roomID);
    });
  };

  const handleEmitRoom = () => {
    socket.emit("emitRoom", roomNumber);
  };

  useEffect(() => {
    socket.on("roomEmitted", (roomID) => {
      console.log("roomEmitted event received with roomID:", roomID);
    });
  }, []);

  // Retrieve the username from local storage
  useEffect(() => {
    const createdUsername = localStorage.getItem("userName");
    if (createdUsername) {
      setName(createdUsername);
    }
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <div className="room-all">
              <h2>Foyer Room</h2>
              <h4>Global Room</h4>
            </div>
            {rooms.map((room) => (
              <div className="room-info" key={room}>
                <h5>{room.slice(-6)}</h5>
                {/* <p>Amount of Users: {room.users.length}/2</p> */}
                <Button variant="primary" onClick={() => handleJoinRoom(room)}>
                  Join Foyer
                </Button>
              </div>
            ))}

            <br />
            <br />

            <h6>Created Rooms</h6>
            <button onClick={() => handleCreateRoom()}>Classic</button>
            <button>California</button>
            <button onClick={() => handleEmitRoom()}>Emit Room</button>
          </Col>

          <Col xs={12} md={4} className="chat-box">
            <form onSubmit={handleSubmit}>
              {!hasEnteredChat && (
                <input
                  type="text"
                  disabled={true}
                  value={name}
                  placeholder="Enter User Name"
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%" }}
                />
              )}
              {hasEnteredChat && (
                <p>
                  Username:<strong> {name}</strong>
                </p>
              )}
              <input
                type="text"
                value={message}
                placeholder="Your message"
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: "100%" }}
              />
              <div className="emoji-buttons-container">
                {emojis.map((emoji, index) => (
                  <Button
                    style={{
                      fontSize: "20px",
                      background: "none",
                      border: "none",
                    }}
                    key={index}
                    variant="primary"
                    className="emoji-button"
                    onClick={() => addEmojiToMessage(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
              <button className="sendButton" type="submit">
                Send
              </button>
              <br />
            </form>
            <div>
              <br />
              <div className="messages-container" ref={messagesContainerRef}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.isInfoMessage
                        ? "message-left"
                        : message.name === name
                        ? "message-left"
                        : "message-right"
                    }
                  >
                    <span className="username">{message.name}</span>{" "}
                    <span className="message-content">: {message.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
