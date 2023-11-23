import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);

  const showPass = (e) => {
    setShow(!show);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response);
        localStorage.setItem("userId", response.data.user._id);
        console.log(localStorage.getItem("userId"));
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
      setErrors(error);
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
                onSubmit={handleLogin}
              >
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                  Sign In
                </h3>
                <p className="mb-4 text-grey-700">
                  Enter your email and password
                </p>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                  <hr className="h-0 border-b border-solid border-grey-500 grow" />
                </div>
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
                  <p className="text-danger"> {errors.email.message}</p>
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
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password ? (
                  <p className="text-danger"> {errors.password.message}</p>
                ) : (
                  ""
                )}
                <Link href="/forgot-password">
                  <div className="flex flex-row justify-between mb-8">
                    <p className="mr-4 text-sm font-medium text-purple-blue-500 cursor-pointer">
                      Forget password?
                    </p>
                  </div>
                </Link>
                <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500">
                  Sign In
                </button>
                <Link href="/register">
                  <p className="text-sm leading-relaxed text-grey-900">
                    Not registered yet?{" "}
                  </p>
                  <p className="font-bold text-grey-700 cursor-pointer">
                    Create an Account
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
