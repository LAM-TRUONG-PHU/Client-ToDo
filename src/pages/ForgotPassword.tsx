import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { usePopupStore } from "../store/PopupStore";
import {
  faEye,
  faTimes,
  faCheck,
  faEyeSlash,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showFaEye, setShowFaEye] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  // const [validPassword, setValidPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailWarning, setEmailWarning] = useState("");

  const [enableGetOtp, setEnableGetOtp] = useState(false);

  const [validOtp, setValidOtp] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const { isPopupOpen, setIsPopupOpen } = usePopupStore();
  const navigate = useNavigate();
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

  const handleShowHide = () => {
    setShowFaEye(true);
    setShowPassword(!showPassword);
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

  const handleShowHideFaEye = () => {
    setShowFaEye(true);
  };

  function EmailWarning({ message }: { message: string }) {
    return (
      <p
        className="absolute  text-purple-700 font-medium pl-1"
        id="emailWarning"
      >
        <FontAwesomeIcon icon={faCircleExclamation} className="aspect-square" />

        <span className=""> {message}</span>
      </p>
    );
  }

  return (
    <div className="antialiased py-6 sm:max-w-lg mx-auto text-center relative">
      <div className=" bg-white/[.40] rounded-2xl  pb-10 mt-7 text-left">
        <div className="h-4 bg-red-300 bg-opacity-50 rounded-t-2xl "></div>
        <h1 className="text-center text-4xl font-light mt-4">
          Forgot Password
        </h1>
        <form className="px-8 py-6 text-sm md:text-base" onSubmit={() => {}}>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value.trim());
              if (e.target.value !== "") {
                setEnableGetOtp(true);
                setValidEmail(true);
              } else {
                setEnableGetOtp(false);
                setValidEmail(false);
              }
            }}
            className="border w-full  p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300 flex justify-stretch"
          />

          {emailWarning && <EmailWarning message={emailWarning} />}

          <label className="block font-medium mt-7">OTP Code</label>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="OTP Code"
              onChange={(e) => {
                setOtp(e.target.value.trim());
                setValidOtp(e.target.value.trim().length === 6);
              }}
              className="border w-2/3 mb-4 p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <button
              type="button"
              disabled={!enableGetOtp}
              className={`rounded-3xl h-11 px-4 md:px-6 mt-2 text-white
              ${enableGetOtp ? "bg-red-300 hover:bg-red-400" : "bg-gray-300"} `}
              onClick={() => {
                fetch(
                  "https://todoapi-uxe5.onrender.com/api/v2/forgot-password",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                  }
                ).then(async (res) => {
                  const json = await res.json();

                  if (res.status === 200) {
                    setIsPopupOpen("OTP sent to your email");
                    // <Popup/>;
                  } else {
                    setEmailWarning(json.message);
                  }
                });
              }}
            >
              GET OTP
            </button>
          </div>

          <label htmlFor="password" className="font-medium block mt-3">
            Password
          </label>
          <div
            className="relative pb-4"
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
                setPassword(e.target.value);
                handleInputChange(e);
              }}
              className="border w-full p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300"
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
                className="absolute right-5 top-[1.15rem] ltp"
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
          <p className="text-gray-600 font-medium pt-2" id="long">
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
          <p className="text-gray-600 font-medium pt-2" id="length">
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
          <p className="text-gray-600 font-medium pt-2 pb-4" id="capital">
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
          <label htmlFor="confirmPassword" className="font-medium block mt-3">
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
              onChange={(e) => {
                handleInputChange(e);
              }}
              className="border w-full p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300"
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
                className="absolute right-5 top-[1.15rem]"
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
          <div className="w-full">
            <button
              type="button"
              disabled={!validEmail || !validPassword || !validOtp}
              className={`px-8 py-2 text-white rounded-3xl mt-10 flex mx-auto
              ${
                validEmail && validPassword && validOtp
                  ? "bg-red-300 hover:bg-red-400"
                  : "bg-gray-300"
              } `}
              onClick={() => {
                fetch(
                  "https://todoapi-uxe5.onrender.com/api/v2/reset-password",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password, otp }),
                  }
                ).then((res) => {
                  if (res.status === 200) {
                    navigate("/login");
                    setIsPopupOpen("Password reset successful");
                  } else {
                    setIsPopupOpen("Invalid email or otp");
                  }
                });
              }}
            >
              CONTINUE
            </button>
          </div>
          <div className="flex justify-center mt-5 text-black opacity-70 hover:opacity-100 font-medium ">
            <Link to="/login">BACK TO LOGIN</Link>
          </div>
        </form>
      </div>

      {isPopupOpen && <Popup message={isPopupOpen} />}
    </div>
  );
}
