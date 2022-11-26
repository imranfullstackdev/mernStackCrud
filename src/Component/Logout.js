import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const LogOff = async () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    LogOff();
  });
  return <div></div>;
};

export default Logout;
