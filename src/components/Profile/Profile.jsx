// ProfilePage.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const googleProfile = JSON.parse(localStorage.getItem("googleProfile"));

  useEffect(() => {
    if (!googleProfile) {
      return navigate("/");
    }
  }, [googleProfile]);

  if (!googleProfile) {
    return navigate("/");
  }

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-2xl lg:text-4xl md:text-3xl font-bold my-2">
        Your Profile Information
      </h1>
      <div className="flex gap-2 flex-col m-4">
        <img
          className="rounded-full w-[150px]"
          src={`${googleProfile.imageUrl}`}
          alt="profileImage"
        />
        <div>
          <p>
            <span className="text-xl font-bold">Name </span>:{" "}
            {googleProfile.name}
          </p>
          <p>
            <span className="text-xl font-bold">FirstName </span>:{" "}
            {googleProfile.givenName}
          </p>
          <p>
            <span className="text-xl font-bold">LastName </span>:{" "}
            {googleProfile.familyName}
          </p>
          <p>
            <span className="text-xl font-bold">Email </span>:{" "}
            {googleProfile.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
