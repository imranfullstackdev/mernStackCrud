import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import { NavLink,useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate()
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error("PLEASE ENTER ALL THE DETAILS", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        const loginUser = await fetch(`http://localhost:8000/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await loginUser.json();

        if (loginUser.status === 200) {
          toast.success("👨Useer Login   Sucessfully!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          const token = res.token;
          localStorage.setItem("Token", token);
          navigate('/Alluser')
        } else {
          toast.error(res.err, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="row d-flex justify-content-center mt-5 square  rounded border" id="allForm">
        <h3 className="text-light text-center">
          <u>
            <b>LOGIN</b>
          </u>
        </h3>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={data.email}
              name="email"
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Please enter the Password"
              value={data.password}
              name="password"
              onChange={changeHandler}
            />
          </Form.Group>

          <div className="mb-3 align-item-center">
            <Button variant="light" type="submit">
              Submit
            </Button>
          </div>
        </Form>
        <h5 className="text-light">
          New User <NavLink to="/Register">Register</NavLink>
        </h5>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
