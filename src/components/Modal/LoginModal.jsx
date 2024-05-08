import { gapi } from "gapi-script";
import React, { useEffect, useRef } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import google from "../../google.svg"

function Modal({ isOpen, onClose , handleClick}) {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log(response);
    if (response && response.profileObj) {
      
      localStorage.setItem(
        "googleProfile",
        JSON.stringify(response.profileObj)
      );
      navigate("/profile");
    }
  };

  const responseError = (error) => {
    handleClick("Something went wrong", "error")
    console.error("Google login error:", error);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          process.env.REACT_APP_CLIENT_ID || "644455505524-dvjaek3p2c6lt1jtd283aj2mcllj7o1s.apps.googleusercontent.com",
        scope: ""
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg text-center text-xl font-bold my-4">Log in</h2>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID || "644455505524-dvjaek3p2c6lt1jtd283aj2mcllj7o1s.apps.googleusercontent.com"}
            render={(renderProps) => (
              <button
                className="bg-blue-500 flex items-center justify-center gap-2 hover:bg-blue-600 text-white text-lg font-bold px-4 py-2 rounded-full w-full text-center"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img className="w-[23px] mt-[2px]" src={google} alt="Google" />
                Login with Google
              </button>
            )}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseError}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
          />
      </div>
    </div>
  );
}

export default Modal;
