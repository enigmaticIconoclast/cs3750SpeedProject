import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { io } from "socket.io-client"
import "../foyer.css"

export default function Foyer() {
  const socket = io("http://localhost:5050")
  console.log("Socket connected from foyer.js:", socket.connected)

  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message])
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted with name:", name, "and message:", message)

    if (name && message) {
      console.log("name: " + name + " message: " + message)
      socket.emit("sendMessage", { name, message })
      setName("")
      setMessage("")
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
                <input
                  type="text"
                  value={name}
                  placeholder="Enter User Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <br></br>
                <input
                  type="text"
                  value={message}
                  placeholder="Your message"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            <div>
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
