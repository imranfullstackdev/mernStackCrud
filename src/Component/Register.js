import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    Cpassword: "",
    phone: "",
  });
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const navigate=useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.Cpassword ||
      !data.phone
    ) {
      toast.error("PLEASE ENTER ALL THE DETAILS", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (data.name.length < 3) {
      toast.error("NAME MUST BE GREATER THAN 3", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (data.password.length < 8 || data.Cpassword.length < 8) {
      toast.error("PassWord,Confirm password  MUST BE GREATER THAN 8", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (data.password != data.Cpassword) {
      toast.error("password and Confirmpassword must be same", {
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
        const addUser = await fetch("http://localhost:8000/addUser", {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await addUser.json();
        console.log(res);
        if (addUser.status === 200) {
          toast.success("👨Useer Added Sucessfully!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate('/')
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
      <div className="row d-flex justify-content-center mt-5 border" id="allForm" >
          <h3 className="text-light text-center">
            <u>
              <b >Register</b>
            </u>
          </h3>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>NAME:</Form.Label>
              <Form.Control
                placeholder="Enter Your Name"
                type="text"
                value={data.name}
                name="name"
                onChange={changeHandler}
              />
            </Form.Group>
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
            <Form.Group className="mb-3">
              <Form.Label>CPassword</Form.Label>
              <Form.Control
                type="password"
                placeholder="Please re-enter the Password"
                value={data.Cpassword}
                name="Cpassword"
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>PHONE:</Form.Label>
              <Form.Control
                type="NUMBER"
                placeholder="Please Enter The Number"
                value={data.phone}
                name="phone"
                onChange={changeHandler}
              />
            </Form.Group>

            <div className="mb-3 align-item-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            </div>
          </Form>
          <h5 className="text-light">Already a User <NavLink to='/'>LOGIN</NavLink></h5>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
