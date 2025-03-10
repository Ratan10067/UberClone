import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
          navigate("/home");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default UserProtectedWrapper;
