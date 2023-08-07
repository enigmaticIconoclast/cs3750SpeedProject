import React, {useState, useEffect} from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import "../game.css"

export default function CreateUser(){
    return(
        <div>
            <Container>
                <Row xs={12} md ={4}>
                    <Col xs={12} md={8}>
                        Player 2 Hand
                    </Col>
                    <Col xs={12} md={4}>
                        Player 2 Draw Deck
                    </Col>
                </Row>
                <Row xs={12} md ={4}>
                    <Col xs={12} md={3}>
                        Left Pull Pile
                    </Col>
                    <Col xs={12} md={3}>
                        Left Play Pile
                    </Col>
                    <Col xs={12} md={3}>
                        Right Play Pile
                    </Col>
                    <Col xs={12} md={3}>
                        Right Pull Pile
                    </Col>
                </Row>
                <Row xs={12} md ={4}>
                    <Col xs={12} md={8}>
                        Player 1 Hand
                    </Col>
                    <Col xs={12} md={4}>
                        Player 1 Draw Deck
                    </Col>
                </Row>
            </Container>
        </div>
    );
};