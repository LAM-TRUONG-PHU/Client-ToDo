import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    fetch("/api/verify", { credentials: "include", method: "POST" }).then(
      (res) => {
        res.status === 200 ? setIsLogged(true) : setIsLogged(false);
      }
    );
  });

  return (
    <>
      <header className="flex p-4 pl-12 bg-black/[.09] justify-between ">
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
              fetch("/api/logout", {
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
