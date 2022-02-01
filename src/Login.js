import { Form, Button ,Alert} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Doggo from "./doggo.jpg";
import { useState } from "react";
import axios from "axios";
import {GetToken} from './GetToken'
import { useNavigate } from 'react-router-dom'; 
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate();
  

  const userLogin = () => {
    console.log(email, password);
    axios
      .post(process.env.LOGIN_URL || "http://localhost:3200/user/login", {
        email: email,
        password: password,
      })
      .then((e) => {
        console.log("e", e.status);
        if (e.status == 200) {
            if(e && e.data && e.data.token)
            {
              localStorage.setItem('token',e.data.token);
              navigate('/dashboard')
              
            }
        }
      })
      .catch((er) => {
        if (er && er.response && er.response.status) {
         alert("Account not found");
          
        }
      });
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "15%" }}
    >
     
      {/* <Image
        src={Doggo}
        className="mb-1"
        style={{ maxWidth: "12%" }}
        className="img-fluid rounded-circle"
        alt="LOgo Bro"
      /> */}
      <Form style={{marginLeft:'2%'}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            <b style={{ color: "orange", fontWeight: "bolder" }}>
              FOR PERSONAL USE ONLY
            </b>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div className="d-grid gap-1">
          <Button variant="dark" onClick={userLogin} size="lg">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};
