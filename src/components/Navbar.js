import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { selectCartItems } from "../redux/slice/cartSlice";
import { selectUserInfo } from "../redux/slice/authSlice";
import { LOG_OUT } from "../redux/slice/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const [active, setActive] = useState("home");
  const [Sticky, setSticky] = useState("");
  const [visible, setVisible] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUserInfo);
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass =
      scrollTop >= 100
        ? "fixed w-full opacity-90 transition-all ease-in-out delay-150 z-10"
        : "";
    setSticky(stickyClass);
  };

  const handleDropdown = () => {
    setActive("profile");
    setVisible(!visible);
  };
  return (
    <div className={`bg-indigo-900 p-4 text-white ${Sticky}`}>
      <div className="container flex justify-between items-center">
        <div className="">
          <h1 className="text-3xl font-bold">
            e<span className="text-orange-600">Shop</span>
          </h1>
        </div>
        <div className="">
          <ul className="flex gap-4 cursor-pointer items-center">
            <li
              className={`${
                active === "home" ? "text-orange-600" : ""
              } text-base transition color delay-150 hover:-translate-y-1 hover:text-orange-600`}
              onClick={() => setActive("home")}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={`${
                active === "product" ? "text-orange-600" : ""
              } text-base transition color delay-150 hover:-translate-y-1 hover:text-orange-600`}
              onClick={() => setActive("product")}
            >
              <Link to="/products">Products</Link>
            </li>
            {user.isAdmin ? (
              <li
                className={`${
                  active === "admin" ? "text-orange-600" : ""
                } text-base transition color delay-150 hover:-translate-y-1 hover:text-orange-600`}
                onClick={() => setActive("admin")}
              >
                <Link to="/admin">Admin</Link>
              </li>
            ) : (
              ""
            )}
            <li
              className={`${
                active === "cart" ? "text-orange-600" : ""
              } text-base transition color delay-150 hover:-translate-y-1 hover:text-orange-600`}
              onClick={() => setActive("cart")}
            >
              <Link to="/cart" className="flex items-center">
                <AiOutlineShoppingCart />
                {cartItems?.length > 0 && (
                  <span className="text-sm text-orange-600 font-bold">
                    {cartItems?.length}
                  </span>
                )}
              </Link>
            </li>
            <li
              className={`${
                active === "profile" ? "text-orange-600" : ""
              } text-base transition color delay-150 hover:text-orange-600`}
              onClick={() => handleDropdown()}
            >
              {/* <Link to="/profile">
                {user.username ? user.username : "Profile"}
              </Link> */}
              <button
                id="dropdownNavbarButton"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium"
              >
                {user.username ? user.username : "Profile"}
                <svg
                  className="w-4 h-4 ml-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                id="dropdownNavbar"
                className={`${
                  visible ? "block" : "hidden"
                } z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute`}
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownNavbarButton"
                >
                  <li>
                    <Link
                      href="#"
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      My Profile
                    </Link>
                  </li>
                </ul>
                <div className="py-1">
                  {!user?.username ? (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      Log In
                    </Link>
                  ) : (
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                      onClick={() => dispatch(LOG_OUT())}
                    >
                      Log out
                    </span>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
