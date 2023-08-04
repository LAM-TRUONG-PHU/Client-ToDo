import { useEffect, useState } from "react";
import Popup from "../components/Popup";
import { usePopupStore } from "../store/PopupStore";

const inputStyle = {
  caretColor: "transparent",
};
export default function ActivateAccount() {
  const [token, setToken] = useState("");
  const { isPopupOpen, setIsPopupOpen } = usePopupStore();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    setToken(token || "");
  });

  return (
    <div
      className="antialiased py-6 sm:w-4/12 mx-auto text-center relative"
      style={inputStyle}
    >
      <div className=" bg-white/[.40] rounded-lg  pb-10 mt-7 text-left">
        <div className="h-4 bg-red-300 bg-opacity-50 rounded-t-md "></div>
        <h1 className="text-center text-4xl mt-4">
          Please Activate Your Account!
        </h1>
        <p className="text-center text-lg mt-4 text-gray-700">
          Before you can login, you must activate your account by button below
        </p>
        <button
          type="submit"
          className={
            "flex mx-auto px-8 py-2 text-white  rounded-3xl mt-5 bg-red-300 hover:bg-red-400 "
          }
          onClick={() => {
            fetch(
              "https://todoapi-uxe5.onrender.com/api/v2/activate?token=" +
                token,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            ).then(async (res) => {
              const json = await res.json();
              if (res.status === 200) {
                setIsPopupOpen("Account activated");
                window.location.href = "/login";
              } else if (res.status >= 400) {
                setIsPopupOpen(json.message);
              }
            });
          }}
        >
          ACTIVATE
        </button>
        {isPopupOpen && <Popup message={isPopupOpen} />}
      </div>
    </div>
  );
}
