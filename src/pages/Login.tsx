import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showFaEye, setShowFaEye] = useState(false);

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
        navigate("/");
      } else if (res.status === 403) {
        alert("Account not activated. Please check your email");
      } else {
        alert("Invalid username or password");
      }
    });
  };
  return (
    <>
      <div className="antialiased py-6 sm:max-w-md mx-auto text-center relative">
        <div className=" bg-white/[.40] rounded-lg  pb-10 mt-7 text-left">
          <div className="h-4 bg-red-300 bg-opacity-50 rounded-t-md "></div>
          <h1 className="text-center text-4xl font-light mt-4">Login</h1>
          <form className="px-8 py-6" onSubmit={handleSubmit}>
            <label htmlFor="username" className="block font-semibold">
              Username
            </label>

            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value.trim())}
              className="border w-full p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300 bg-white bg-opacity-70"
            />
            <label htmlFor="password" className="font-semibold block mt-3">
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
                onChange={(e) => setPassword(e.target.value.trim())}
                onFocus={() => setShowFaEye(true)}
                className="border w-full p-2 rounded-3xl h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-2 focus:ring-red-300 bg-white bg-opacity-70"
              />
              {showFaEye && (
                <button
                  type="button"
                  className="absolute right-5 top-4 ltp"
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
                className="px-14 py-2 text-white bg-red-300 rounded-3xl mt-10 
                   hover:bg-red-400"
              >
                LOGIN
              </button>
              <a
                href="/forgot-password"
                className="text-sm text-gray-600 hover:underline hover:text-red-300"
              >
                Forgot Password ?
              </a>
            </div>
            <div className="flex justify-center pt-5 text-red-300 font-semibold hover:text-red-400">
              <a href="/signup">CREATE ACCOUNT</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
