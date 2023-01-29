import React, { useEffect } from "react";
import { loading, orders, allOrderCall } from "../redux/slice/orderSlice";
import { selectUserInfo } from "../redux/slice/authSlice";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import OrderBox from "../components/order/OrderBox";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const allOrders = useSelector(orders);
  const loadState = useSelector(loading);
  useEffect(() => {
    dispatch(allOrderCall({ userId: user._id }));
  }, []);
  return (
    <section className="container">
      <div className="custom-height flex gap-3 py-3">
        <div className="w-1/4 bg-slate-50 h-full">
          <div className="w-full border bg-white border-gray-200 rounded-sm p-3 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-2">
            <h3>Filters</h3>
            <ul>
              <li>Pending</li>
              <li>On the way</li>
              <li>Cancelled</li>
            </ul>
          </div>
        </div>
        <div className="w-3/4 bg-slate-50 h-full">
          <div className="w-full border bg-white border-gray-200 rounded-sm p-3 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-2">
            <div className="flex justify-between">
              <input
                className="block w-3/4 px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                placeholder="Search order"
              />
              <button className="inline-block bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                Save
              </button>
            </div>
          </div>
          <div>
            {loadState ? (
              <p>Loading....</p>
            ) : (
              <OrderBox orders={allOrders} moment={moment} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
