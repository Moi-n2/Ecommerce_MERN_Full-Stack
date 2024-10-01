import React, { useState } from "react";
import Title from "./Title";
import InputField from "./InputField";

function Address() {
  const [formDate, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = () => {};

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 min:h[80vh] "
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl flex justify-start">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <InputField
            onChange={onChange}
            type="text"
            value={formDate.firstName}
            placeholder="First-Name"
            required={true}
          />
          <InputField
            onChange={onChange}
            type="text"
            placeholder="Last-Name"
            value={formDate.lastName}
            required={true}
          />
        </div>

        <InputField
          onChange={onChange}
          type="email"
          placeholder="Email-address"
          value={formDate.email}
          required={true}
        />
        <InputField
          onChange={onChange}
          type="text"
          placeholder="Street"
          value={formDate.street}
          required={true}
        />
        <InputField
          onChange={onChange}
          type="text"
          placeholder="City"
          value={formDate.city}
          required={true}
        />
        <InputField
          onChange={onChange}
          type="text"
          placeholder="State"
          value={formDate.state}
          required={true}
        />
        <div className="flex gap-3">
          <InputField
            onChange={onChange}
            type="number"
            placeholder="Zipcode"
            value={formDate.zipcode}
            required={true}
          />
          <InputField
            onChange={onChange}
            type="text"
            placeholder="Country"
            value={formDate.country}
            required={true}
          />
        </div>
        <InputField
          onChange={onChange}
          type="number"
          placeholder="Phone"
          value={formDate.phone}
          required={true}
        />
      </div>
    </form>
  );
}

export default Address;
