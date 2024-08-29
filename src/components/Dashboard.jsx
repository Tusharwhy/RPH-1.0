import React, { useState } from "react";
import bg from "../assets/png.jpg";
import { Link } from "react-router-dom";

function Dashboard() {
  const backgroundStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const overlayStyle = {
    position: "absolute",
    top: 85,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha (last) value to control opacity
  };
  return (
    <>
      <div className="h-[91vh]" style={backgroundStyle}>
        <div className="h-[91vh]">
          <div className="flex w-full h-full ">
            <div className="w-[33.33%] h-full text-slate-200 hover:text-white  ">
              <Link to="/user">
                <div className=" h-full flex justify-center items-center">
                  <div className="h-52 w-[70%] flex items-center justify-center text-center font-bold text-3xl  bg-black  bg-opacity-50 rounded-lg transform transition-transform hover:scale-105 border border-orange-400 hover:border">
                    FIR Analayzer(OCR + LLM)
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-[33.33%] h-full text-slate-200 hover:text-white  ">
              <Link to="/visionAI">
                <div className=" h-full flex justify-center items-center">
                  <div className="h-52 w-[70%] flex items-center justify-center text-center font-bold text-3xl  bg-black  bg-opacity-50 rounded-lg transform transition-transform hover:scale-105 border border-orange-400 hover:border">
                    FIR Analayzer(Vision-Ai)
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-[33.33%] h-full text-slate-200 hover:text-white  ">
              <Link to="/chatbot">
                <div className=" h-full flex justify-center items-center">
                  <div className="h-52 w-[70%] flex items-center justify-center text-center font-bold text-3xl  bg-black  bg-opacity-50 rounded-lg transform transition-transform hover:scale-105 border border-orange-400 hover:border">
                    Legal Assistant
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
