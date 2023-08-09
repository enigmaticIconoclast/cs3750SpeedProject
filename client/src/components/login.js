import React, {useState, useEffect} from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {sha256} from 'js-sha256';

export default function Login(){
    const[form, setForm] =useState({
        userName: "",
        password: "",
    });
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();

        const userResponse = await fetch("http://localhost:5050/login-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: form.userName}),
        }).catch(error => {
            window.alert(error);
            return;
        });
        const salt =await userResponse.json();
        
        if(salt.saltScore)
        {
            let hash = sha256(form.password.concat(salt.saltScore.toString()));
            form.password = hash;
            const credentials = {...form}
            const passResponse = await fetch("http://localhost:5050/login-password",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            }).catch(error => {
                window.alert(error);
                return;
            });

            const loggedIn = await passResponse.json();
            if(loggedIn.signedIn)
            {
              sessionStorage.setItem("userName", form.userName);
                navigate("/foyer");
            }
            else{
                alert("Invalid Password");
            }

        }
        else{
            alert("Invalid Username");
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
            <div className="border border-2 border-primary"></div>
              <Card className="shadow px-4">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-center text-uppercase ">Logo</h2>
                    <div className="mb-3">
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">
                            Username
                          </Form.Label>
                          <Form.Control type="text" 
                            name="userName"
                            id="userName"
                            onChange={(e) => handleChange({ userName: e.target.value })}
                            placeholder="Enter Name" />
                        </Form.Group>
  
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" 
                                        name="password"
                                        id="password"
                                        onChange={(e) => handleChange({ password: e.target.value })}
                                        placeholder="Password" />
                        </Form.Group>
                        
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            Login
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                         <p className="mb-0  text-center">
                            Don't have an account?{' '}
                            <a href="/create-user" className="text-primary fw-bold">
                              Sign Up
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