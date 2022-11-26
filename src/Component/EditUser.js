import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";

const EditUser = ({user}) => {
    console.log(user.name)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [data, setData] = useState(user);
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const EditHandler = async (e,id) => {
    e.preventDefault()
    console.log(id)
    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.Cpassword ||
      !user.phone
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
    } else if (user.name.length < 3) {
      toast.error("NAME MUST BE GREATER THAN 3", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (user.password.length < 8 || user.Cpassword.length < 8) {
      toast.error("PassWord,Confirm password  MUST BE GREATER THAN 8", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (user.password != user.Cpassword) {
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
        const addUser = await fetch(`http://localhost:8000/edit/${id}`, {
          method: "put",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await addUser.json();
        console.log(res);
        if (addUser.status === 200) {
          toast.success(res.mess, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(res.err, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        EDIT 
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <div  id="allForm" >
          <h3 className="text-dark text-center">
            <u>
              <b >EDIT USER</b>
            </u>
          </h3>
          <Form onSubmit={((e)=>{EditHandler(e,user._id)})}>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark text-bold" >NAME:</Form.Label>
              <Form.Control
                placeholder="Enter Your Name"
                type="text"
                defaultValue={user.name}
                name="name"
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark text-bold" >Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue={user.email}
                name="email"
                onChange={changeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-dark text-bold" >Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Please enter the Password"
                defaultValue={user.password}
                name="password"
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark text-bold" >CPassword</Form.Label>
              <Form.Control
                type="password"
                placeholder="Please re-enter the Password"
                defaultValue={user.Cpassword}
                name="Cpassword"
                onChange={changeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-dark text-bold" >PHONE:</Form.Label>
              <Form.Control
                type="NUMBER"
                placeholder="Please Enter The Number"
                defaultValue={user.phone}
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
        <ToastContainer />
      </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUser;
