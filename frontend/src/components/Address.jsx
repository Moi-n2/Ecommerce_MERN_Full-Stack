import React, { useState } from "react";
import Title from "./Title";
import InputField from "./InputField";

function Address({ address, setAddress }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 min:h[80vh] ">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl flex justify-start">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <InputField
            onChange={(e) =>
              setAddress({ ...address, firstName: e.target.value })
            }
            type="text"
            value={address.firstName}
            placeholder="First-Name"
            required={true}
          />
          <InputField
            onChange={(e) =>
              setAddress({ ...address, lastName: e.target.value })
            }
            type="text"
            placeholder="Last-Name"
            value={address.lastName}
            required={true}
          />
        </div>

        <InputField
          onChange={(e) => setAddress({ ...address, email: e.target.value })}
          type="email"
          placeholder="Email-address"
          value={address.email}
          required={true}
        />
        <InputField
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          type="text"
          placeholder="Street"
          value={address.street}
          required={true}
        />
        <InputField
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          type="text"
          placeholder="City"
          value={address.city}
          required={true}
        />
        <InputField
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          type="text"
          placeholder="State"
          value={address.state}
          required={true}
        />
        <div className="flex gap-3">
          <InputField
            onChange={(e) =>
              setAddress({ ...address, zipcode: e.target.value })
            }
            type="string"
            placeholder="Zipcode"
            value={address.zipcode}
            required={true}
          />
          <InputField
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
            type="text"
            placeholder="Country"
            value={address.country}
            required={true}
          />
        </div>
        <InputField
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          type="string"
          placeholder="Phone"
          value={address.phone}
          required={true}
        />
      </div>
    </div>
  );
}

export default Address;
