import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/slice/authSlice";

export default function PersonalInfo() {
  const user = useSelector(selectUserInfo);
  const [pi, setPi] = useState(false);
  const [ea, setEa] = useState(false);
  const [mn, setMn] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    setName(user.username);
    setEmail(user.email);
  }, [user]);
  return (
    <>
      <section className="mb-3">
        <div className="flex gap-5 items-center">
          <h3 className="font-bold text-lg">Personal Information</h3>
          <span
            className="text-sm text-sky-600 font-semibold cursor-pointer"
            onClick={() => setPi(!pi)}
          >
            {pi ? "Cancel" : "Edit"}
          </span>
        </div>
        <div className="flex gap-5 items-center mt-2">
          <input
            className={`${
              pi ? "" : "bg-gray-100 text-gray-400"
            } block w-3/4 px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`}
            type="text"
            value={name}
            placeholder="enter name"
            disabled={pi ? false : true}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={pi ? "block" : "hidden"}>
            <button className="inline-block bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
              Save
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <label className="block text-gray-700 font-medium text-sm">
            Your gender
          </label>
          <div className="relative">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                className="form-radio"
                disabled={pi ? false : true}
              />
              <span className="ml-2 text-sm">Male</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="gender"
                value="female"
                className="form-radio"
                disabled={pi ? false : true}
              />
              <span className="ml-2 text-sm">Female</span>
            </label>
          </div>
        </div>
      </section>
      <section className="mb-3">
        <div className="flex gap-5 items-center">
          <h3 className="font-bold text-lg">Email Address</h3>
          <span
            className="text-sm text-sky-600 font-semibold cursor-pointer"
            onClick={() => setEa(!ea)}
          >
            {ea ? "Cancel" : "Edit"}
          </span>
        </div>
        <div className="flex gap-5 items-center mt-2">
          <input
            type="text"
            className={`${
              ea ? "" : "bg-gray-100 text-gray-400"
            } block w-3/4 px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`}
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={ea ? false : true}
          />
          <div className={ea ? "block" : "hidden"}>
            <button className="inline-block bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
              Save
            </button>
          </div>
        </div>
      </section>
      <section className="mb-3">
        <div className="flex gap-5 items-center">
          <h3 className="font-bold text-lg">Mobile Number</h3>
          <span
            className="text-sm text-sky-600 font-semibold cursor-pointer"
            onClick={() => setMn(!mn)}
          >
            {mn ? "Cancel" : "Edit"}
          </span>
        </div>
        <div className="flex gap-5 items-center mt-2">
          <input
            className={`${
              mn ? "" : "bg-gray-100 text-gray-400"
            } block w-3/4 px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`}
            type="text"
            placeholder="enter mobile"
            disabled={mn ? false : true}
          />
          <div className={mn ? "block" : "hidden"}>
            <button className="inline-block bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
              Save
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
