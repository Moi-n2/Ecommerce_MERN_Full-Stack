import { useState } from "react";
import { post } from "../lib/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function VerifyCode() {
  const [code, setCode] = useState(["", "", "", ""]);
  const handleInput = (val, index) => {
    const copyCode = code.slice();
    copyCode[index] = val;
    setCode(copyCode);
  };
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (code.join("").length !== 4)
      return toast.warning("Missing verification code");
    try {
      const activation_token = await localStorage.getItem("activation_token");
      const activation_code = code.join("");
      const res = await post("/activate-user", {
        activation_token,
        activation_code,
      });
      if (res.success) {
        toast.success("Your account activated successfully!");
        setCode(["", "", "", ""]);
        localStorage.removeItem("activation_token");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <main className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mt-10">
        <p className="prata-regular text-3xl">Verification Code</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <p className="text-base mb-10 px-2">
        We have sent the verification code to your email address
      </p>

      <div className="flex-row mb-10 flex gap-2 mx-auto">
        {code.map((_, index) => (
          <input
            maxLength={1}
            key={index}
            onChange={(e) => handleInput(e.target.value, index)}
            value={code[index]}
            type="text"
            required={true}
            className="w-12 h-12 rounded-lg border-slate-700 text-center text-xl border"
          />
        ))}
      </div>

      <button
        className="bg-black text-white font-light px-8 py-2 mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </main>
  );
}

export default VerifyCode;
