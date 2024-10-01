import React, { useState } from "react";
import { assets } from "../assets/assets";

function InputField({ onChange, placeholder, value, type, required }) {
  const [show, setShow] = useState(false);
  return (
    <div className="border border-gray-300 rounded py-1.5 px-3.5 w-full flex justify-between">
      <input
        onChange={onChange}
        name="street"
        value={value}
        type={type !== "password" ? type : show ? "text" : "password"}
        placeholder={placeholder}
        required={required}
        className="outline-none"
      />
      {type === "password" && (
        <div className="size-5 pt-1" onClick={() => setShow(!show)}>
          {!show ? (
            <img src={assets.eyeoff_icon} alt="hidepassword" />
          ) : (
            <img src={assets.eyeon_icon} alt="showpassword" />
          )}
        </div>
      )}
    </div>
  );
}

export default InputField;
