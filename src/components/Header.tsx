import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/LoginStore";
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLogged, setIsLogged } = useLoginStore();

  useEffect(() => {
    fetch("https://todoapi-uxe5.onrender.com/api/v2/verify", {
      credentials: "include",
      method: "POST",
    }).then((res) => {
      res.status === 200 ? setIsLogged(true) : setIsLogged(false);
    });
  }, []);

  return (
    <>
      <header className="flex p-4 md:pl-12 pl-4 bg-gradient-to-r from-black/[.2]  to-red-300/[.2] justify-between ">
        <h1 className="text-center text-4xl text-white ">TODO</h1>

        {location.pathname == "/" && !isLogged && (
          <button
            className="text-xl text-white hover:text-red-300"
            onClick={() => {
              navigate("/login");
            }}
          >
            LOGIN
          </button>
        )}

        {location.pathname == "/" && isLogged && (
          <button
            className="text-xl text-white hover:text-red-300"
            onClick={() => {
              navigate("/login");
              fetch("https://todoapi-uxe5.onrender.com/api/v2/logout", {
                credentials: "include",
                method: "POST",
              }).finally(() => {
                setIsLogged(false);
              });
            }}
          >
            LOGOUT
          </button>
        )}
      </header>
    </>
  );
}
