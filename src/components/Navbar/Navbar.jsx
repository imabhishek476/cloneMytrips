import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import { GoogleLogout } from "react-google-login";
import logo from "../../logo.svg";
import { Alert, Snackbar } from "@mui/material";

 export const MainMenuList = [
  {
    id: "/",
    title : "Home",
  },
  {
    id: "/about",
    title : "About",
  },
  {
    id: "/services",
    title : "Services",
  },
  {
    id: "/contact",
    title : "Contact",
  }
]

function Navbar() {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState({
    message: "Something went wrong",
    severity: "error",
  });
  const googleProfile = JSON.parse(localStorage.getItem("googleProfile"));
  const navigate = useNavigate();

  const onClose = () => {
    setIsModalOpen(false);
  };

  const toggleMainMenu = () => {
    setIsMainMenuOpen(!isMainMenuOpen);
    setIsProfileMenuOpen(false);
  };
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsMainMenuOpen(false);
  };

  const handleClick = (msg, severity) => {
    console.log(openSnack)
    setSnackMsg({
      message: msg || snackMsg.message,
      severity: severity || snackMsg.severity,
    })
    setOpenSnack(true);
  };

  const handleClose = () => {
    setOpenSnack(false);
  };

  return (
    <>
      <LoginModal isOpen={isModalOpen} onClose={onClose}  handleClose={handleClose} handleClick={handleClick}/>
      
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 pl-1">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CloneMyTrips
            </span>
          </Link>
          <Snackbar anchorOrigin={{vertical:"top", horizontal:"center"}} open={openSnack} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={snackMsg.severity}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {snackMsg.message}
            </Alert>
          </Snackbar>

          <ul className="lg:flex md:flex text-white font-semibold gap-10 hidden md:block lg:block">
            {MainMenuList.map((item, index)=>{
              return (
                <li key={item?.id} className="hover:text-red-500 cursor-pointer">
                  <Link to={item?.id==="/"? item?.id : "#"}>
                    {item?.title}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {googleProfile ? (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded={isProfileMenuOpen ? "true" : "false"}
                  onClick={toggleProfileMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={`${googleProfile.imageUrl}`}
                    alt="user photo"
                  />
                </button>
                <div
                  className={`${
                    isProfileMenuOpen ? "block" : "hidden"
                  } z-50 my-4 text-base list-none absolute top-14 right-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {googleProfile.name}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {googleProfile.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to={"/profile"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Settings
                        <span className="text-green-500">(coming soon)</span>
                      </Link>
                    </li>
                    <li className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      <GoogleLogout
                        clientId="644455505524-dvjaek3p2c6lt1jtd283aj2mcllj7o1s.apps.googleusercontent.com"
                        buttonText="Logout from Google"
                        render={(renderProps) => (
                          <button
                            className="block px-4 py-2 text-sm text-red-400"
                            onClick={renderProps.onClick}
                          >
                            Logout
                          </button>
                        )}
                        onLogoutSuccess={() => {
                          localStorage.removeItem("googleProfile");
                          navigate("/");
                        }}
                      />
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <button
                className="text-green-500 font-bold text-lg"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Login
              </button>
            )}
            <button
              type="button"
              className="inline-flex items-center p-2 pr-0 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded={isMainMenuOpen ? "true" : "false"}
              onClick={toggleMainMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMainMenuOpen
                      ? "M1 1h15M1 7h15M1 13h15"
                      : "M1 1h15M1 7h15M1 13h15"
                  }
                />
              </svg>
            </button>
          </div>

          <div
            className={`${
              isMainMenuOpen ? "block absolute top-14 left-0" : "hidden"
            } items-center justify-between absolute top-14 left-0 w-full md:flex md:w-auto md:order-1 md:hidden`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100  bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to={"/"}
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
