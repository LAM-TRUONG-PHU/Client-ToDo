import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

import {
  faEye,
  faTimes,
  faCheck,
  faEyeSlash,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const inputStyle = {
  caretColor: "transparent",
};

const inputStyle2 = {
  caretColor: "black",
};

function EmailWarning({ message }: { message: string }) {
  return (
    <p
      className="absolute top-15 text-purple-700 font-semibold pl-1"
      id="emailWarning"
    >
      <FontAwesomeIcon icon={faCircleExclamation} className="aspect-square" />

      <span className=""> {message}</span>
    </p>
  );
}

function UsernameWarning({ message }: { message: string }) {
  return (
    <p
      className="absolute top-15 text-purple-700 font-semibold pl-1"
      id="usernameWarning"
    >
      <FontAwesomeIcon icon={faCircleExclamation} className="aspect-square" />

      <span className="pl-1">{message}</span>
    </p>
  );
}

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showFaEye, setShowFaEye] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const valueUsernameRef = useRef<HTMLInputElement>(null);

  const [validPassword, setValidPassword] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [suggestUsername, setSuggestUsername] = useState<string[]>([]);
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
    const emailInput = e.target as HTMLInputElement;
    const emailValue = e.target.value;
    const emailWarning = document.getElementById("emailWarning") as HTMLElement;

    const length = emailValue.length >= 1;
    const emailValid = emailValue.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (emailValid && length) {
      setValidEmail(true);
      setWarningMessage("");
      emailInput.classList.remove("focus:ring-purple-700");
      emailInput.classList.add("focus:ring-red-300");
      emailInput.classList.add("ring-2", "ring-red-300");
      // emailInput.classList.remove("ring-2", "ring-purple-700");
      emailWarning.classList.add("invisible");
    } else if (emailValue == "") {
      setValidEmail(false);
      setWarningMessage("");
      emailInput.classList.add("focus:ring-purple-700");
      emailInput.classList.remove("focus:ring-red-300");
      emailInput.classList.remove("ring-2", "ring-red-300");
      emailInput.classList.add("ring-2", "ring-purple-700");
      emailWarning.classList.add("invisible");
    } else if (!emailValid) {
      setValidEmail(false);
      setWarningMessage("Email is not valid");
      emailInput.classList.add("focus:ring-purple-700");
      emailInput.classList.remove("focus:ring-red-300");
      emailInput.classList.remove("ring-2", "ring-red-300");
      emailInput.classList.add("ring-2", "ring-purple-700");
      emailWarning.classList.remove("invisible");
    }
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usernameWarning = document.getElementById(
      "usernameWarning"
    ) as HTMLElement;

    const usernameInput = e.target as HTMLInputElement;
    const usernameValue = e.target.value;
    const length = usernameValue.length >= 4;
    const usernameValid =
      usernameValue.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/) !=
        null ||
      usernameValue.match(/^(?=.*[a-z])([a-z]+)$/i) != null ||
      usernameValue.match(/^(?=.*[0-9])([0-9]+)$/i) != null;

    if (usernameValid && length) {
      setValidUsername(true);
      setWarningMessage("");
      usernameInput.classList.remove("focus:ring-purple-700");
      usernameInput.classList.add("focus:ring-red-300");
      usernameInput.classList.remove("ring-2", "ring-purple-700");
      usernameInput.classList.add("ring-2", "ring-red-300");
      usernameWarning?.classList.add("invisible");
      setWarningMessage("");
    } else if (usernameValid && !length) {
      setValidUsername(false);
      // setWarningMessage(" Only letters and numbers are allowed");
      usernameInput.classList.add("focus:ring-purple-700");
      usernameInput.classList.remove("focus:ring-red-300");
      usernameInput.classList.remove("ring-2", "ring-red-300");
      usernameInput.classList.add("ring-2", "ring-purple-700");
      usernameWarning?.classList.add("invisible");
    } else if (!usernameValid) {
      setValidUsername(false);
      setWarningMessage("Only letters and numbers are allowed");
      usernameInput.classList.add("focus:ring-purple-700");
      usernameInput.classList.remove("focus:ring-red-300");
      usernameInput.classList.remove("ring-2", "ring-red-300");
      usernameInput.classList.add("ring-2", "ring-purple-700");
      usernameWarning?.classList.remove("invisible");
      // setWarningMessage("Only letters and numbers are allowed");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!passwordRef.current || !confirmPasswordRef.current) return;

    const password = e.target.value;
    const passwordInput = e.target as HTMLInputElement;
    const letterAndNum =
      password.match(/^(?=.*[0-9])(?=.*[a-z])([a-zA-Z0-9]+)$/) != null;
    const length = password.length >= 8;
    const capital = password.match(/[A-Z]/) != null;
    const avaiPassword =
      passwordRef.current.value === confirmPasswordRef.current.value;
    if (letterAndNum && length && capital && avaiPassword) {
      setValidPassword(true);
    } else {
      passwordInput.classList.add("focus:ring-purple-700");
      passwordInput.classList.remove("focus:ring-green-600");
      passwordInput.classList.remove("ring-2", "ring-red-300");
      passwordInput.classList.add("ring-2", "ring-purple-700");
      setValidPassword(false);
    }
    if (passwordInput.id === "password") {
      if (letterAndNum && length && capital) {
        passwordInput.classList.remove("focus:ring-purple-700");
        passwordInput.classList.add("focus:ring-green-600");
        passwordInput.classList.remove("ring-2", "ring-purple-700");
        passwordInput.classList.add("ring-2", "ring-red-300");
      }
    } else if (passwordInput.id === "confirmPassword") {
      if (passwordInput.value !== "") {
        passwordInput.classList.remove("focus:ring-purple-700");
        passwordInput.classList.add("focus:ring-red-300");
        passwordInput.classList.remove("ring-2", "ring-purple-700");
        passwordInput.classList.add("ring-2", "ring-red-300");
      } else {
        passwordInput.classList.add("focus:ring-purple-700");
        passwordInput.classList.remove("focus:ring-red-300");
        passwordInput.classList.remove("ring-2", "ring-red-300");
        passwordInput.classList.add("ring-2", "ring-purple-700");
      }
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
      fetch("https://todoapi-uxe5.onrender.com/api/v2/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }).then(async (res) => {
        const json = await res.json();

        if (res.status == 201) {
          navigate("/successful-signup");
        } else if (res.status == 409) {
          setWarningMessage(json.message);
          setSuggestUsername(json.data);
        } else if (res.status == 500) {
          alert("Something went wrong");
        } else if (res.status == 400) {
          alert("Please check your information");
        }
      });
    }
  };

  return (
    <div
      className="antialiased py-6 sm:max-w-lg mx-auto text-center relative"
      style={inputStyle}
    >
      <div className="text-color bg-white/[.40] rounded-lg  pb-10 mt-7 text-left ">
        <div className="h-4 bg-red-300 bg-opacity-50 rounded-t-md "></div>
        <h1 className="text-center text-4xl font-light mt-4">Create Account</h1>

        <form className="px-8 py-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block font-semibold">
            Email
          </label>
          <div className="relative pb-4">
            <input
              type="email"
              placeholder="Email"
              style={inputStyle2}
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
                handleEmail(e);
              }}
              className=" w-full border-none box-border p-2 rounded-3xl h-5 px-3 py-5 mt-2 mb-1 hover:outline-none focus:outline-none  focus:ring-2 focus:ring-red-300 bg-white bg-opacity-70"
              onFocus={() => {
                const emailInput = document.getElementById(
                  "email"
                ) as HTMLInputElement;
                if (email == "") {
                  // emailWarning.classList.remove("invisible");
                  emailInput.classList.add("focus:ring-purple-700");
                  emailInput.classList.remove("focus:ring-red-300");
                  emailInput.classList.add("ring-2", "ring-purple-700");
                }
              }}
            />

            {warningMessage == "Email already exists" && (
              <EmailWarning message={warningMessage} />
            )}
            {warningMessage == "Email is not valid" && (
              <EmailWarning message={warningMessage} />
            )}
          </div>

          <label htmlFor="username" className="block font-semibold pt-3">
            Username
          </label>
          <div className="relative pb-4">
            <input
              type="text"
              id="username"
              style={inputStyle2}
              placeholder="Username"
              className="border w-full p-2 rounded-3xl h-5 px-3 py-5 mt-2 mb-1  hover:outline-none focus:outline-none  focus:ring-2 focus:ring-red-300 bg-white bg-opacity-70"
              onChange={(e) => {
                setUsername(e.target.value);
                handleUsername(e);
              }}
              ref={valueUsernameRef}
              onFocus={() => {
                const usernameInput = document.getElementById(
                  "username"
                ) as HTMLInputElement;

                if (username == "") {
                  usernameInput.classList.add("focus:ring-purple-700");
                  usernameInput.classList.remove("focus:ring-red-300");
                  usernameInput.classList.add("ring-2", "ring-purple-700");
                  setWarningMessage("Only letters and numbers are allowed");
                }
              }}
            />
            <div className="relative">
              {warningMessage == "Username already exists" && (
                <UsernameWarning message={warningMessage} />
              )}
              {warningMessage == "Only letters and numbers are allowed" && (
                <UsernameWarning message={warningMessage} />
              )}
              {warningMessage == "Username already exists" && (
                <Menu
                  as="div"
                  className="absolute inline-block text-left right-0"
                >
                  <div className="group inline-flex w-full justify-center gap-x-1 rounded-3xl px-2 font-semibold text-gray-700 hover:text-opacity-100 text-opacity-60 group-hover:bg-gray-100 group-hover:text-black">
                    <Menu.Button>
                      <div className="flex">
                        Suggested Usernames
                        <ChevronDownIcon
                          className="mt-1 h-5 w-5 text-gray-700 group-hover:text-opacity-100 text-opacity-60"
                          aria-hidden="true"
                        />
                      </div>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-3xl bg-white bg-opacity-80  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={() => {
                                valueUsernameRef.current!.value =
                                  suggestUsername[0];
                              }}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm rounded-t-3xl"
                              )}
                            >
                              {suggestUsername[0]}
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => {
                                valueUsernameRef.current!.value =
                                  suggestUsername[1];
                              }}
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {suggestUsername[1]}
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={() => {
                                valueUsernameRef.current!.value =
                                  suggestUsername[2];
                              }}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm rounded-b-3xl"
                              )}
                            >
                              {suggestUsername[2]}
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
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
              style={inputStyle2}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange(e);
              }}
              className="border w-full p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none  focus:ring-2 focus:ring-red-300 bg-white bg-opacity-70"
              onFocus={() => {
                handleShowHideFaEye();
                const passwordInput = document.getElementById(
                  "password"
                ) as HTMLInputElement;
                if (password == "") {
                  passwordInput.classList.add("focus:ring-purple-700");
                  passwordInput.classList.remove("focus:ring-red-300");
                  passwordInput.classList.add("ring-2", "ring-purple-700");
                  // passwordInput.classList.remove("ring-2", "ring-red-300");
                }
              }}
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
              style={inputStyle2}
              placeholder="Confirm Password"
              onChange={(e) => {
                handleInputChange(e);
              }}
              className=" border w-full p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300 bg-white bg-opacity-70"
              onFocus={() => {
                handleShowHideFaEye();

                const confirmPasswordInput = document.getElementById(
                  "confirmPassword"
                ) as HTMLInputElement;

                if (confirmPasswordInput.value == "") {
                  confirmPasswordInput.classList.add("focus:ring-purple-700");
                  confirmPasswordInput.classList.remove("focus:ring-red-300");
                  confirmPasswordInput.classList.add(
                    "ring-2",
                    "ring-purple-700"
                  );
                }
              }}
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
              className={`px-8 py-2 text-white rounded-3xl mt-10 
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
