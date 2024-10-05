import { useContext, useState } from "react";
import InputField from "../components/InputField";
import { post } from "../lib/axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

function Login() {
  const [currentState, setCurrentState] = useState("login");
  const { navigate, setToken } = useContext(ShopContext);
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "sign-up") {
        const res = await post("/api/user/signup", loginData);
        console.log(res);
        toast.success(res.message);
        localStorage.setItem("token", JSON.stringify(res.token));
        setToken(res.token);
        navigate("/");
      }

      if (currentState === "login") {
        const res = await post("/api/user/login", loginData);
        toast.success(res.message);
        localStorage.setItem("token", JSON.stringify(res.token));
        setToken(res.token);
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const toggleState = (state) => {
    setCurrentState(state);
    setLoginData({
      name: "",
      email: "",
      password: "",
    });
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

      {currentState === "sign-up" && (
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
              onClick={() => toggleState("sign-up")}
              className="cursor-pointer"
            >
              Create account
            </p>
          </>
        ) : (
          <p onClick={() => toggleState("login")} className="cursor-pointer">
            Login Here
          </p>
        )}
      </div>

      <button
        className="bg-black text-white font-light px-8 py-2 mt-4"
        onClick={onSubmit}
      >
        {currentState === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
