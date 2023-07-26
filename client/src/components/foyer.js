import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { io } from "socket.io-client"
import "../foyer.css"

export default function Foyer() {
  const socket = io("http://localhost:5050")
  //console.log("Socket connected from foyer.js:", socket.connected)

  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [hasEnteredChat, setHasEnteredChat] = useState(false)

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message])
    })

    //stop repeated messages
    return () => {
      socket.off("message")
    }
  }, [])

  //handles the presets
  const handleSendId = (id) => {
    if(id) {
      socket.emit("sendMessage", { id })
    }
  }

  //handles the regular messages
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted with name:", name, "and message:", message)

    if (name && message) {
      console.log("name: " + name + " message: " + message)
      socket.emit("sendMessage", { name, message })
      //setName("")
      setMessage("")

      if (!hasEnteredChat) {
        setMessages((messages) => [...messages,
          { message: `${name} has entered the chat` },
        ])
        setHasEnteredChat(true)
      }
    }
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className="room-info">
              <h2>Foyer 1</h2>
              <p>Amount of Users: 0/2</p>
              <Button variant="primary">Join Foyer</Button>
            </div>
            <div className="room-info">
              <h2>Foyer 2</h2>
              <p>Amount of Users: 0/2</p>
              <Button variant="primary">Join Foyer</Button>
            </div>
            <div className="room-info">
              <h2>Foyer 3</h2>
              <p>Amount of Users: 0/2</p>
              <Button variant="primary">Join Foyer</Button>
            </div>
            <div className="room-info">
              <h2>Foyer 4</h2>
              <p>Amount of Users: 0/2</p>
              <Button variant="primary">Join Foyer</Button>
            </div>
          </Col>
          <Col xs={12} md={4} className="chat-box">
            <form onSubmit={handleSubmit}>
              {!hasEnteredChat && (
                <input
                  type="text"
                  value={name}
                  placeholder="Enter User Name"
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              {hasEnteredChat && <p>Username: {name}</p>}
              <input
                type="text"
                value={message}
                placeholder="Your message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
              <div className="buttons-container">
                <Button variant="primary" onClick={() => handleSendId(1)}>
                  ID 1
                </Button>
              </div>
            </form>
            <div>
              <br />
              <ul>
                {messages.map((message, index) => (
                  <li key={index}>
                    {message.name}: {message.message}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
