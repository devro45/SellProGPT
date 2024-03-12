import React from "react";

const Main = () => {
  return (
    <div className="h-screen bg-gray-900  ">
      <p className="font-extrabold text-6xl text-green-500 font-sans pt-36 px-20">
        SELLPROGPT
      </p>

      <p
        className=" text-4xl text-white px-20 "
        style={{
          fontFamily: "Dancing Script",
          fontOpticalSizing: "auto",
          fontWeight: 600,
          fontStyle: "normal",
        }}
      >
        buy and sell products like a pro
      </p>

      <div
        className="p-4 px-20 text-white "
        style={{
          fontFamily: "Madimi One",
          //fontFamily: "sans-serif",
          fontWeight: 400,
          fontStyle: "normal",
        }}
      >
        <p>Online Selling Platform for Small businesses and Artists,</p>
        <p className="">
          Get Started in few easy steps, Sign up for start shopping
        </p>
      </div>
    </div>
  );
};

export default Main;
