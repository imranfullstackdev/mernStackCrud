import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Alluser from "./Component/Alluser";
import Header from "./Component/Header";
import Logout from "./Component/Logout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Header" element={<Header />} />

          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Alluser" element={<Alluser />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/USER" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
