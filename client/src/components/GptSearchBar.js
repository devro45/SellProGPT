import React from "react";

const GptSearchBar = () => {
  return (
    <div className="p-10 m-6 flex justify-center">
      <form className="">
        <input
          type="text"
          className="p-3 m-4  rounded bg-white text-black"
          placeholder="What do you want to buy today?"
        />
        <button className="py-2 px-4 bg-red-700 rounded text-white">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
