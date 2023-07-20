import { useEffect, useState } from "react";

export default function ActivateAccount() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    setToken(token || "");
  });

  return (
    <div className="antialiased py-6 sm:w-96 mx-auto text-center relative">
      <div className=" bg-white/[.40] rounded-lg  pb-10 mt-7 text-left">
        <div className="h-4 bg-red-300 bg-opacity-50 rounded-t-md "></div>
        <h1 className="text-center text-4xl font-light mt-4">Sign Up</h1>

        <button
          type="submit"
          className={
            "px-8 py-2 text-white  rounded-md mt-10 bg-red-300 hover:bg-red-400 "
          }
          onClick={() => {
            fetch("/api/activate?token=" + token, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }).then((res) => {
              if (res.status === 200) {
                alert("Account activated");
                window.location.href = "/login";
              } else {
                alert("Invalid token");
              }
            });
          }}
        >
          ACTIVATE
        </button>
      </div>
    </div>
  );
}
