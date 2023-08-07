import React, {useState, useEffect} from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {sha256} from 'js-sha256';
import { io } from "socket.io-client";

export default function CreateUser(){
    const[form, setForm] = useState({
        userName:"",
        saltScore:"",
        password:"",
        reenter: "",
        email: "",
    });

    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();

        if(form.password === form.reenter){
            if(form.password.length >= 16){
                let saltTemp = Math.floor(Math.random()*1000000000);
                let tempHash = form.password.concat(saltTemp.toString());

                let hash = (sha256(tempHash));
                form.saltScore = saltTemp;
                form.password = hash;
                form.reenter = hash;

                const newUser = {...form};

                await fetch("http://localhost:5050/create-user",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newUser),
                }).catch(error =>{
                    window.alert(error);
                    return;
                });
                localStorage.setItem("userName", form.userName); //setting username to local storage to pass around
                navigate('/Foyer');
            }
            else{
                alert("Password must be at least 16 characters");
            }
        }
        else{
            alert("Passwords Do Not Match please Re-Enter");
        }
    }
    function handleChange(value){
        return setForm((prev)=>{
            return{...prev, ...value};
        })
    }
    return(
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className='px-4'>
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-center text-uppercase">
                                        Speed!
                                    </h2>
                                    <div className="mb-3">
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className='mb-3' controlId='Name'>
                                                <Form.Label className="text-center">
                                                    Username
                                                </Form.Label>
                                                <Form.Control type="text" 
                                                            name="username" 
                                                            id = "username" 
                                                            onChange={(e) => handleChange({ userName: e.target.value })} 
                                                            placeholder="Enter Username"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email Address
                                                </Form.Label>
                                                <Form.Control type="email"
                                                            name="email"
                                                            id="email"
                                                            onChange={(e) => handleChange({ email: e.target.value })}
                                                            placeholder="Enter Email"/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label class="text-center">
                                                    Password
                                                </Form.Label>
                                                <Form.Control type="password" 
                                                            name="password"
                                                            id="password"
                                                            onChange={(e) => handleChange({ password: e.target.value })}
                                                            placeholder="Password" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label class="text-center">
                                                    Re-Enter Password
                                                </Form.Label>
                                                <Form.Control type="password" 
                                                            name="reenter"
                                                            id="reenter"
                                                            onChange={(e) => handleChange({ reenter: e.target.value })}
                                                            placeholder="Password" />
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Create Account
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Already have an account?{' '}
                                                <a href="/" className="text-primary fw-bold">
                                                    Sign In
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}