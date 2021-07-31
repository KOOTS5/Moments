import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/navbar-icon.png";
import AuthContext from "../context/AuthContext";
import LogOutBtn from "./LogOutBtn";
import EditProfileBtn from "./EditProfileBtn";
import axios from "axios";
import Success from "./Success";

function NavBar() {
  const { loggedIn } = useContext(AuthContext);
  const [name, setName] = useState("Name Here");
  const [profilePic, setprofilePic] = useState("");
  const [teleCode, setTeleCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  async function renderUserProfile() {
    try {
      // axios.get("http://localhost:5000/userProfile/")
      axios
        .get("https://moments-personal.herokuapp.com//userProfile")
        .then((response) => {
          const { name, profilePic, teleCode } = response.data;
          setName(name);
          setprofilePic(profilePic);
          setTeleCode(teleCode);
          setIsFetching(false);
        });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      renderUserProfile();
    }
  }, [loggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <nav id="navbar">
      {loggedIn === false && (
        <>
          <Link className="navbar-routes" to="/">
            <div id="navbar-img-div">
              <img src={logo} alt="icon" />
            </div>
          </Link>
          <ul className="navbar-links">
            <Link className="navbar-routes" to="/login">
              <li id="login-bt">Login</li>
            </Link>
            <Link className="navbar-routes" to="/sign-up">
              <li id="signup-bt">Sign-Up</li>
            </Link>
          </ul>
        </>
      )}
      {loggedIn === true && (
        <>
          <Success
            id="edit-profile-success"
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
          <div id="navbar-login-img-div">
            <img src={logo} alt="icon" />
          </div>
          <a
            href={`https://telegram.me/MomentsOrbBot?start=${teleCode}`}
            target="_blank"
            rel="noopener noreferrer"
            id="telegram-bot-bt"
          >
            <i class="fab fa-telegram-plane"></i>
            <span>Link to Telegram Bot</span>
          </a>
          <div id="user-nav-container">
            <h5 key={name} id="navbar-profile-name">
              Welcome back, {name}
            </h5>
            <img
              // src={`http://localhost:5000/images/${profilePic}`}
              src={`https://moments-personal.herokuapp.com//images/${profilePic}`}
              alt="profile-pic"
            />
            <div id="settings-menu">
              <LogOutBtn setSuccessMessage={setSuccessMessage} />
              {isFetching ? (
                <div></div>
              ) : (
                <EditProfileBtn
                  profilePic={profilePic}
                  renderUserProfile={renderUserProfile}
                  name={name}
                  setSuccessMessage={setSuccessMessage}
                  teleCode={teleCode}
                />
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;
