import ReactDOM from "react-dom/client";
import Home from "./Home.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import Signup from "./pages/Signup.tsx";
import SuccessfulSignup from "./pages/SuccessfulSignup.tsx";
import ActivateAccount from "./pages/ActivateAccount.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";

import Header from "./components/Header.tsx";
import Body from "./components/Body.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Body>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/successful-signup" element={<SuccessfulSignup />} />
          <Route path="/activate" element={<ActivateAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </main>
    </Body>
  </BrowserRouter>
  // </React.StrictMode>,
);
