import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { registerCall, loading, message } from "../redux/slice/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import Util from "../components/Util";

export default function Registration() {
  const dispatch = useDispatch();
  const loadState = useSelector(loading);
  const messageState = useSelector(message);
  const [isVisible, setIsVisible] = useState({ pass: true, cpass: true });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT token: " + res.credential);
    let userObject = jwt_decode(res.credential);
    console.log(userObject);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Passwords should match");
      return;
    }
    if (!name || !email || !password) {
      toast.error("All fields mandatory");
      return;
    }
    const userData = {
      username: name,
      email,
      password,
      profilePicture,
    };
    dispatch(registerCall(userData));
  };

  const picDetails = (file) => {
    Util.uploadImage(file, setPicLoading, toast, setProfilePicture);
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "312520590495-eshhn2o4re426p6s1qog3qpsnc12ok9f.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <h3 className="text-3xl font-semibold text-center text-purple-700 uppercase">
              Sign Up
            </h3>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2 relative">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type={isVisible.pass ? "password" : "text"}
                name="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isVisible.pass ? (
                <AiFillEye
                  className="absolute right-1 bottom-2 text-2xl z-10 cursor-pointer"
                  onClick={() =>
                    setIsVisible({ ...isVisible, pass: !isVisible.pass })
                  }
                />
              ) : (
                <AiFillEyeInvisible
                  className="absolute right-1 bottom-2 text-2xl z-10 cursor-pointer text-gray-400"
                  onClick={() =>
                    setIsVisible({ ...isVisible, pass: !isVisible.pass })
                  }
                />
              )}
            </div>
            <div className="mb-2 relative">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-semibold text-gray-800"
              >
                Confirm Password
              </label>

              <input
                type={isVisible.cpass ? "password" : "text"}
                name="password_confirmation"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {isVisible.cpass ? (
                <AiFillEye
                  className="absolute right-1 bottom-2 text-2xl z-10 cursor-pointer"
                  onClick={() =>
                    setIsVisible({ ...isVisible, cpass: !isVisible.cpass })
                  }
                />
              ) : (
                <AiFillEyeInvisible
                  className="absolute right-1 bottom-2 text-2xl z-10 cursor-pointer text-gray-400"
                  onClick={() =>
                    setIsVisible({ ...isVisible, cpass: !isVisible.cpass })
                  }
                />
              )}
            </div>
            <div className="mb-2">
              <label
                className="form-label mb-2 text-gray-700 flex gap-2 items-center"
                htmlFor="small_size"
              >
                Profile pic{" "}
                {picLoading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </label>
              <input
                className="form-control
                block
                w-full
                px-3
                py-1.5
                text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                id="small_size"
                type="file"
                onChange={(e) => picDetails(e.target.files[0])}
              />
            </div>
            <a href="#" className="text-xs text-purple-600 hover:underline">
              Forget Password?
            </a>
            <div className="flex items-center mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <Link
                className="font-medium text-purple-600 hover:underline"
                to="/login"
              >
                Login
              </Link>
            </span>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 ">OR</p>
            <hr className="w-full" />
          </div>
          <div className="flex gap-2 items-center">
            <div id="signInDiv"></div>
            <button
              aria-label="Login with GitHub"
              role="button"
              data-tooltip-target="tooltip-top"
              data-tooltip-placement="top"
              type="button"
              className="custom-style-btn flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
              <p>Login with GitHub</p>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
