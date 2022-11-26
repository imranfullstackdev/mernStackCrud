import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import EditUser from "./EditUser";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Alluser = () => {
  const [alluser, SetAlluser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/");
    }
  });

  const allUser = async () => {
    const allUser = await fetch("http://localhost:8000", {
     
    });
    const res = await allUser.json();
    SetAlluser(res);
  };
  useEffect(() => {
    allUser();
  }, []);
  console.log(alluser);

  const DeleteHandler = async (id) => {
    const deleteUser = await fetch(`http://localhost:8000/dlt/${id}`, {
      method: "DELETE",
      headers: {
        autherization: localStorage.getItem("Token"),
      },
    });
    const res = await deleteUser.json();
    if (DeleteHandler.status === 200) {
      toast.success(res.mess, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      allUser();
    } else {
      toast.warn(res.err, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <>
      <div className="text-light border">
        <div>
          <h3 className="text-light w-100">
            <u>
              <b>All User</b>
            </u>
          </h3>
        </div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {alluser.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <EditUser user={user} />
                  </td>

                  <td
                    onClick={() => {
                      DeleteHandler(user._id);
                    }}
                  >
                    DELETE
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <ToastContainer />
      </div>
    </>
  );
};

export default Alluser;
