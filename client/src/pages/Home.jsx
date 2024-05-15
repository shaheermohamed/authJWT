import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "https://authjwt-backend.onrender.com/auth/",
        // "http://localhost:4000/auth",
        {},
        { withCredentials: true }
      );
      const { success, message: message1, user } = data;
      console.log("data:", data);
      setUsername(user);
      return success
        ? message.success(`Hello ${user}`)
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <div className="home_page">
      <h4>
        {" "}
        Welcome <span>{username}</span>
      </h4>
      <button onClick={() => Logout()}>LOGOUT</button>
    </div>
  );
};

export default Home;
