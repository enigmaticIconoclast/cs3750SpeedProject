import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { io } from "socket.io-client"

export default function Room() {
    const socket = io("http://localhost:5050")

}