import React, { useState } from "react";
import InputField from "../components/InputField";

function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "signup" && (
        <InputField
          onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
          value={loginData.name}
          type="text"
          placeholder="Name"
          required={true}
        />
      )}

      <InputField
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        value={loginData.email}
        type="email"
        placeholder="Email"
        required={true}
      />
      <InputField
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
        value={loginData.password}
        type="password"
        placeholder="Password"
        required={true}
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "login" ? (
          <>
            <p className="cursor-pointer">Forgot password?</p>
            <p
              onClick={() => setCurrentState("signup")}
              className="cursor-pointer"
            >
              Create account
            </p>
          </>
        ) : (
          <p
            onClick={() => setCurrentState("login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
