import { useContext, useState } from "react";
import InputField from "../components/InputField";
import { post } from "../lib/axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

function Login() {
  const [currentState, setCurrentState] = useState("login");
  const { navigate, setAccessToken, setRefreshToken } = useContext(ShopContext);
  const [loginData, setLoginData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const isInvalid = ["firstName", "lastName", "email", "password"].some(
      (item) => {
        if (!loginData[item]) {
          toast.warning(`Please enter ${item}`);
          return true;
        }
        return false;
      }
    );
    if (isInvalid) {
      return false;
    }
    if (!emailRegex.test(loginData.email)) {
      toast.warning(`Invalid email address`);

      return false;
    }

    if (!passwordRegex.test(loginData.password)) {
      toast.warning(
        `Password must be at least 6 characters long. It contains both uppercase and lowercase letters.`
      );
      return false;
    }

    return true;
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "sign-up") {
        const test = validateForm();
        if (!test) return;
        setIsSubmiting(true);
        const res = await post("/sign-up", loginData);
        console.log("res:", res);

        if (res.success) {
          toast.success(res.message);
          localStorage.setItem("activation_token", res.data.activationToken);
          navigate("/verify-code");
        }
      }

      if (currentState === "login") {
        setIsSubmiting(true);
        const res = await post("/login", loginData);
        toast.success(res.message);
        localStorage.setItem(
          "access_token",
          JSON.stringify(res.data.access_token)
        );
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(res.data.refresh_token)
        );
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        navigate("/");
      }

      setIsSubmiting(false);
    } catch (error) {
      toast.error(error);
      setIsSubmiting(false);
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
        <div className="flex flex-row gap-2 w-full">
          <input
            className={`border border-gray-300 rounded py-1.5 px-3.5 w-full flex justify-between flex-1`}
            onChange={(e) =>
              setLoginData({ ...loginData, firstName: e.target.value })
            }
            value={loginData.firstName}
            type="text"
            placeholder="FirstName"
            required={true}
          />
          <input
            className={`border border-gray-300 rounded py-1.5 px-3.5 w-full flex justify-between flex-1`}
            onChange={(e) =>
              setLoginData({ ...loginData, lastName: e.target.value })
            }
            value={loginData.lastName}
            type="text"
            placeholder="LastName"
            required={true}
          />
        </div>
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
        disabled={isSubmiting}
      >
        {currentState === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
