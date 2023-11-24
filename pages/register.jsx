import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);

  const showPass = (e) => {
    setShow(!show);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: { message: "Passwords do not match." },
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        { firstName, email, password, confirmPassword },
        { withCredentials: true }
      );
      console.log(response.data)
      if ( response.data.msg == "success!") {
        // Check for a specific success flag in your response
        router.push("/");
      } else {
        setErrors(
          response.data.errors || {
            general: { message: "Registration failed" },
          }
        );
      }
    } catch (error) {
      setErrors(
        error.response?.data?.errors || {
          general: { message: "An error occurred" },
        }
      );
    }
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
                onSubmit={handleRegister}
              >
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  Sign Up
                </h3>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
                <label
                  htmlFor="firstName"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Full Name*
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Name"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName ? (
                  <p className="text-danger" style={{ fontSize: "small" }}>
                    {" "}
                    {errors.firstName.message}
                  </p>
                ) : (
                  ""
                )}
                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="mail@loopple.com"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email ? (
                  <p className="text-danger" style={{ fontSize: "small" }}>
                    {" "}
                    {errors.email.message}
                  </p>
                ) : (
                  ""
                )}
                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.confirmPassword) {
                      setErrors({ ...errors, confirmPassword: null });
                    }
                  }}
                />
                {errors.password ? (
                  <p className="text-danger" style={{ fontSize: "small" }}>
                    {" "}
                    {errors.password.message}
                  </p>
                ) : (
                  ""
                )}
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 text-sm text-start text-grey-900"
                >
                  Confirm Password*
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Enter confirm password"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword ? (
                  <p className="text-danger" style={{ fontSize: "small" }}>
                    {" "}
                    {errors.confirmPassword.message}
                  </p>
                ) : (
                  ""
                )}
                <button
                  className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
                  onClick={handleRegister}
                >
                  Register
                </button>
                <Link href="/login">
                  <p className="text-sm leading-relaxed text-grey-900">
                    Already have an account?{" "}
                  </p>
                  <a className="font-bold text-grey-700 cursor-pointer">
                    Log in
                  </a>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
