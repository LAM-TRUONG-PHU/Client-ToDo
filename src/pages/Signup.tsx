import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  faEye,
  faTimes,
  faCheck,
  faEyeSlash,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showFaEye, setShowFaEye] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const [validPassword, setValidPassword] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  // if valid
  const valid = (item: string, v_icon: string, inv_icon: string) => {
    let text = document.getElementById(item) as HTMLInputElement;
    let valid_icon = document.querySelector(
      `#${item} .${v_icon}`
    ) as HTMLElement;
    let invalid_icon = document.querySelector(
      `#${item} .${inv_icon}`
    ) as HTMLElement;

    text.style.color = "green";
    valid_icon.style.borderColor = "green";
    valid_icon.style.opacity = "1";
    invalid_icon.style.opacity = "0";
  };

  const invalid = (item: string, v_icon: string, inv_icon: string) => {
    // let text = document.querySelector(`#${item}`) as HTMLInputElement; // ????

    let text = document.getElementById(item) as HTMLInputElement;
    let valid_icon = document.querySelector(
      `#${item} .${v_icon}`
    ) as HTMLElement;
    let invalid_icon = document.querySelector(
      `#${item} .${inv_icon}`
    ) as HTMLElement;

    text.style.color = "rgb(75, 85, 99)";
    valid_icon.style.borderColor = "rgb(75, 85, 99)";
    valid_icon.style.opacity = "0";
    invalid_icon.style.borderColor = "rgb(75, 85, 99)";
    invalid_icon.style.opacity = "1";
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const length = email.length >= 1;
    const validEmail = email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (length && validEmail) setValidEmail(true);
    else setValidEmail(false);
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const validUsername = document.getElementById(
      "validUsername"
    ) as HTMLElement;

    const usernameInput = document.getElementById(
      "username"
    ) as HTMLInputElement;

    if (!usernameRef.current) return;
    if (
      usernameRef.current.value.length >= 4 &&
      (usernameRef.current.value.match(/^(?=.*[0-9])(?=.*[a-z])([a-z0-9]+)$/) !=
        null ||
        usernameRef.current.value.match(/^(?=.*[a-z])([a-z]+)$/i) != null ||
        usernameRef.current.value.match(/^(?=.*[0-9])([0-9]+)$/i) != null)
    ) {
      validUsername.classList.add("invisible");
      usernameInput?.classList.remove("focus:ring-purple-700");
      usernameInput?.classList.add("focus:ring-red-300");
    } else {
      validUsername.classList.remove("invisible");
      usernameInput?.classList.add("focus:ring-purple-700");
      usernameInput?.classList.remove("focus:ring-red-300");
    }

    const username = e.target.value;
    const length = username.length >= 4;

    const letterAndNum =
      username.match(/^(?=.*[0-9])(?=.*[a-z])([a-z0-9]+)$/) != null ||
      username.match(/^(?=.*[a-z])([a-z]+)$/i) != null ||
      username.match(/^(?=.*[0-9])([0-9]+)$/i) != null;

    if (letterAndNum && length) setValidUsername(true);
    else setValidUsername(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!passwordRef.current || !confirmPasswordRef.current) return;

    const password = e.target.value;
    const letterAndNum =
      password.match(/^(?=.*[0-9])(?=.*[a-z])([a-zA-Z0-9]+)$/) != null;
    const length = password.length >= 8;
    const capital = password.match(/[A-Z]/) != null;
    const avaiPassword =
      passwordRef.current.value === confirmPasswordRef.current.value;

    if (letterAndNum && length && capital && avaiPassword)
      setValidPassword(true);
    else {
      setValidPassword(false);
    }

    if (e.target.id === "confirmPassword") return;

    if (letterAndNum) {
      valid("length", "fa-check", "fa-times");
    } else {
      invalid("length", "fa-check", "fa-times");
    }

    if (length) {
      valid("long", "fa-check", "fa-times");
    } else {
      invalid("long", "fa-check", "fa-times");
    }

    if (capital) {
      valid("capital", "fa-check", "fa-times");
    } else {
      invalid("capital", "fa-check", "fa-times");
    }
  };

  const handleShowHide = () => {
    setShowFaEye(true);
    setShowPassword(!showPassword);
  };

  const handleShowHideFaEye = () => {
    setShowFaEye(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validPassword || !validUsername || !validEmail) {
      alert("Please check your information");
      return;
    } else {
      e.preventDefault();
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }).then((res) => {
        if (res.status == 201) {
          navigate("/successful-signup");
        } else if (res.status == 409) {
          alert("Username or Email already exists");
        } else if (res.status == 500) {
          alert("Something went wrong");
        } else if (res.status == 400) {
          alert("Please check your information");
        }
      });
    }
  };

  return (
    <div className="antialiased py-6 sm:w-fit mx-auto text-center relative">
      <div className="text-color bg-white/[.40] rounded-lg  pb-10 mt-7 text-left">
        <div className="h-4 bg-red-300 bg-opacity-50 rounded-t-md "></div>
        <h1 className="text-center text-4xl font-light mt-4">Create Account</h1>

        <form className="px-8 py-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              handleEmail(e);
            }}
            className="border w-full mb-4 p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300"
          />

          <label htmlFor="username" className="block font-semibold pt-3">
            Username
          </label>
          <div className="relative pb-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="border w-full p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300"
              onChange={(e) => {
                setUsername(e.target.value);
                handleUsername(e);
              }}
              onFocus={() => {
                const validUsername = document.getElementById(
                  "validUsername"
                ) as HTMLElement;
                const usernameInput = document.getElementById("username");

                if (usernameRef.current?.value == "") {
                  validUsername.classList.remove("invisible");
                  usernameInput?.classList.add("focus:ring-purple-700");
                  usernameInput?.classList.remove("focus:ring-red-300");
                }
              }}
              ref={usernameRef}
            />
            <p
              className="absolute top-15 invisible text-purple-700 font-semibold pl-1"
              id="validUsername"
            >
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="aspect-square"
              />

              <span className=""> Only letters and numbers are allowed.</span>
            </p>
          </div>

          <label htmlFor="password" className="font-semibold block mt-3">
            Password
          </label>
          <div
            className="relative pb-4"
            onBlur={(e) => {
              console.log(e.relatedTarget?.className);

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
                setPassword(e.target.value);
                handleInputChange(e);
              }}
              className="border w-full p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300"
              onFocus={handleShowHideFaEye}
              ref={passwordRef}
              // onClick={handleShowHideFaEye}
            />

            {showFaEye && (
              <button
                type="button"
                className="absolute right-5 top-1/4 ltp"
                onClick={handleShowHide}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            )}
          </div>
          {/* Password is at least 8 characters long */}
          <p className="text-gray-600 font-semibold pt-2" id="long">
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-times icon absolute  aspect-square text-center border-2 border-gray-600 rounded-full"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className="fa-check icon absolute  opacity-0 text-center border-2 border-gray-600 rounded-full"
            />
            <span className="ml-6">Password is at least 8 characters long</span>
          </p>
          {/* Password contains at least one letter or number */}
          <p className="text-gray-600 font-semibold pt-2" id="length">
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-times icon absolute aspect-square text-center border-2 border-gray-600 rounded-full"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className="fa-check icon absolute opacity-0 text-center border-2 border-gray-600 rounded-full "
            />
            <span className="ml-6 ">
              Password contains at least one letter or number
            </span>
          </p>
          <p className="text-gray-600 font-semibold pt-2 pb-4" id="capital">
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-times icon absolute aspect-square text-center border-2 border-gray-600 rounded-full"
            />
            <FontAwesomeIcon
              icon={faCheck}
              className="fa-check icon absolute opacity-0 text-center border-2 border-gray-600 rounded-full "
            />
            <span className="ml-6 ">
              Password contains at least one Capital letter
            </span>
          </p>
          <label htmlFor="confirmPassword" className="font-semibold block mt-3">
            Confirm Password
          </label>
          <div
            className="relative"
            onBlur={(e) => {
              if (e.relatedTarget == null) {
                setShowFaEye(false);
              }
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              className="border w-full p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300"
              onFocus={handleShowHideFaEye}
              ref={confirmPasswordRef}
              // onClick={handleShowHideFaEye}
            />

            {showFaEye && (
              <button
                type="button"
                className="absolute right-5 top-1/3"
                onClick={handleShowHide}
                onMouseDown={(e) => {
                  e.stopPropagation();
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
          <div className="flex justify-center items-baseline">
            <button
              type="submit"
              disabled={!validPassword || !validUsername || !validEmail}
              className={`px-8 py-2 text-white  rounded-md mt-10 
              ${
                validPassword && validUsername && validEmail
                  ? "bg-red-300 hover:bg-red-400"
                  : "bg-gray-300"
              }`}
            >
              CREATE ACCOUNT
            </button>
          </div>
          <div className="flex justify-center pt-5 text-red-300 font-semibold hover:text-red-400">
            <a href="/login">ALREADY HAVE AN ACCOUNT?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
