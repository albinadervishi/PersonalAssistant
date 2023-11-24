import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const Welcome = () => {
  return (
    <div className="banner text-center flex justify-center flex-col">
      <h1 className="text-white">Welcome to your Personal Assistant!</h1>
      <div className="my-5 mx-auto">
        <Link href={"/login"}>
          <button className="btn btn-secondary ml-3">Log in</button>
        </Link>
        <Link href={"/register"}>
          <button
            className="btn btn-secondary ml-3 "
            style={{ marginLeft: "30px" }}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
