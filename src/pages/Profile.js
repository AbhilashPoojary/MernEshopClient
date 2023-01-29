import React, { useState } from "react";
import { selectUserInfo } from "../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiFillShopping, AiOutlineRight } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import PersonalInfo from "../components/profile/PersonalInfo";
import Faq from "../components/profile/Faq";
import YourOrders from "../components/profile/YourOrders";

export default function Profile() {
  const user = useSelector(selectUserInfo);
  const [pageData, setPageData] = useState("Pi");
  return (
    <section className="container">
      <div className="custom-height flex gap-3 py-3">
        <div className="w-1/4 bg-slate-50 h-full">
          <div className="w-full border bg-white border-gray-200 rounded-sm p-3 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-2">
            <div className="flex gap-3 items-center">
              <img
                className="w-14 h-14 rounded-full shadow-lg"
                src={
                  user?.profilePicture ||
                  "https://toppng.com/uploads/preview/donna-picarro-dummy-avatar-115633298255iautrofxa.png"
                }
              />
              <div>
                <span className="text-xs">Hello,</span>
                <p className="text-base font-bold text-indigo-900">
                  {user.username || "User"}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full border bg-white border-gray-200 rounded-sm shadow-md dark:bg-gray-800 dark:border-gray-700 mb-2 h-full">
            <div
              className="flex items-center justify-between cursor-pointer px-7 py-3"
              onClick={() => setPageData("Or")}
            >
              <AiFillShopping className="text-lg text-orange-600" />
              <span className="text-sm font-bold text-indigo-900">
                MY ORDERS
              </span>
              <AiOutlineRight className="text-base text-orange-600" />
            </div>
            <hr />
            <div
              className="flex items-center justify-between cursor-pointer px-7 py-3"
              onClick={() => setPageData("Pi")}
            >
              <MdManageAccounts className="text-2xl text-orange-600" />
              <span className="text-sm font-bold text-indigo-900">
                ACCOUNT SETTINGS
              </span>
            </div>
            <ul className="ml-7 mb-2">
              <li className="text-sm cursor-pointer mb-1 text-slate-500">
                Profile Information
              </li>
              <li className="text-sm cursor-pointer text-slate-500">
                Manage Addresses
              </li>
            </ul>
            <hr />
            <div className="flex items-center justify-between cursor-pointer px-7 py-3">
              <RiLogoutCircleRLine className="text-xl text-orange-600 font-bold" />
              <span className="text-sm font-bold text-indigo-900">Logout</span>
            </div>
          </div>
        </div>
        <div className="w-3/4 bg-slate-50">
          <div className="w-full border bg-white border-gray-200 rounded-sm shadow-md dark:bg-gray-800 dark:border-gray-700 mb-2 h-full px-7 py-3">
            {pageData === "Pi" ? (
              <>
                {" "}
                <PersonalInfo />
                <Faq />
              </>
            ) : pageData === "Or" ? (
              <YourOrders />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
