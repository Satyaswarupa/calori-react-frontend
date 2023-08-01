import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);

  return loading ? (
    <Loader />
  ) : (
    <div className="me">
      <h1>Hello</h1>
      <h2>{user?.name}</h2>
      <p>The calorie calculator app allows users to create accounts, track their daily food intake, and monitor your calorie consumption. It helps users maintain a healthy routine by providing valuable insights into their diet choices.</p>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
