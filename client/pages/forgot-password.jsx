import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/forgot-password", { email })
      .then((res) => {
        console.log("res", res.data);
        if (res.data.Status === "Success") {
          router.push("/");
        } else {
          setErrors([res.data.Status]);
        }
      })
      .catch((err) => {
        console.log("eerror", err);
        setErrors([err.message]);
      });
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css"
      />
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form
                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                onSubmit={handleSubmit}
              >
                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Enter your email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="mail@loopple.com"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.length > 0 &&
                  errors.map((error, index) => (
                    <p
                      key={index}
                      className="text-danger"
                      style={{ fontSize: "medium" }}
                    >
                      {error}
                    </p>
                  ))}
                <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
