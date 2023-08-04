import React, { useState } from "react";
import Popup from "../components/Popup";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useLoginStore } from "../store/LoginStore";
import { usePopupStore } from "../store/PopupStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [showFaEye, setShowFaEye] = useState(false);

  const { setIsLogged } = useLoginStore();
  const { isPopupOpen, setIsPopupOpen } = usePopupStore();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("https://todoapi-uxe5.onrender.com/api/v2/login", {
      method: "POST",
      credentials: "include", //send with cookie
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      if (res.status === 200) {
        setIsLogged(true);
        navigate("/");
      } else if (res.status === 403) {
        setIsPopupOpen("Account not activated. Please check your email");
      } else {
        setIsPopupOpen("Invalid username or password");
      }
    });
  };
  return (
    <>
      <div className="antialiased py-6 sm:max-w-md mx-auto text-center relative">
        <div className=" bg-white/[.40] rounded-2xl  pb-10 mt-7 text-left">
          <div className="h-4 bg-red-300 bg-opacity-50 rounded-t-2xl"></div>
          <h1 className="text-center text-4xl font-light mt-5">Sign In</h1>
          <form
            className="px-8 py-6 text-sm md:text-base"
            onSubmit={handleSubmit}
          >
            <label htmlFor="username" className="block font-medium">
              Username
            </label>

            <input
              type="text"
              id="username"
              placeholder="Username"
              autoComplete="off"
              onChange={(e) => {
                setUsername(e.target.value.trim());
                if (e.target.value != "") setValidUsername(true);
                else setValidUsername(false);
              }}
              className="border w-full p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300 bg-white bg-opacity-70 "
            />

            <label htmlFor="password" className="font-medium block mt-7">
              Password
            </label>
            <div
              className="relative"
              onBlur={(e) => {
                if (
                  e.relatedTarget == null ||
                  !e.relatedTarget.className.includes("ltp")
                ) {
                  setShowFaEye(false);
                }
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value.trim());
                  if (e.target.value != "") setValidPassword(true);
                  else setValidPassword(false);
                }}
                onFocus={() => setShowFaEye(true)}
                className="border w-full p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300 bg-white bg-opacity-70"
              />
              {showFaEye && (
                <button
                  type="button"
                  className="absolute right-5 top-[1.15rem] ltp"
                  onClick={() => {
                    setShowFaEye(true);
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </button>
              )}
            </div>

            <div className="flex justify-between items-baseline">
              <button
                type="submit"
                disabled={!validUsername || !validPassword}
                className={`px-14 py-2 text-white  rounded-3xl mt-10 
                ${
                  validUsername && validPassword
                    ? "bg-red-300 hover:bg-red-400"
                    : "bg-gray-300"
                }
                `}
              >
                LOGIN
              </button>
              <Link
                to="/forgot-password"
                className="text-sm text-black opacity-70 hover:opacity-100 hover:underline font-medium"
              >
                Forgot Password ?
              </Link>
            </div>
            <div className="flex justify-center mt-5 text-black opacity-70 hover:opacity-100 font-medium ">
              <Link to="/signup">CREATE ACCOUNT</Link>
            </div>
          </form>
        </div>
        {isPopupOpen && <Popup message={isPopupOpen} />}
      </div>
    </>
  );
}
