import React from "react";

function Subscribe() {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
        officia excepturi obcaecati
      </p>

      <form
        onSubmit={onSubmit}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-10 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter Your Email"
          className="w-full sm:flex-1 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}

export default Subscribe;
