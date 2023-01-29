import React, { useEffect } from "react";
import BarChart from "../components/admin/BarChart";
import { loading, orders, allOrderCall } from "../redux/slice/orderSlice";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo } from "../redux/slice/authSlice";
import { users, Userloading, allUsersCall } from "../redux/slice/allUserSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const allUsers = useSelector(users);
  const allOrders = useSelector(orders);
  const totalSaleValue = allOrders?.reduce((acc, cur) => acc + cur.bill, 0);
  const average = totalSaleValue / allOrders?.length;
  console.log(totalSaleValue, average);
  const loadState = useSelector(loading);
  const monthwiseSale = [0, 0, 0, 0, 0, 0, 0]; // initialize an array with 12 elements, representing the 12 months
  for (let i = 0; i < allOrders?.length; i++) {
    const order = allOrders[i];
    const date = new Date(order.createdAt);
    const month = date.getMonth();
    monthwiseSale[month] += order.bill;
  }
  console.log(monthwiseSale);
  useEffect(() => {
    dispatch(allOrderCall({ userId: user._id }));
    dispatch(allUsersCall({ userId: user._id }));
  }, []);
  return (
    <section className="container custom-height p-4">
      <h1 className="text-3xl text-orange-600 font-bold">Dashboard</h1>
      <div className="flex justify-between gap-3 mt-3">
        <div className="w-1/3 border p-4 shadow-md">
          <p className="text-gray-400 text-sm">Total sale value</p>
          <h1 className="text-4xl font-bold mt-3">${totalSaleValue}</h1>
        </div>
        <div className="w-1/3 border p-4 shadow-md">
          <p className="text-gray-400 text-sm">Average order value</p>
          <h1 className="text-4xl font-bold mt-3">${average.toFixed(2)}</h1>
        </div>
        <div className="w-1/3 border p-4 shadow-md">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <h1 className="text-4xl font-bold mt-3">{allOrders?.length}</h1>
        </div>
      </div>
      <div className="flex justify-between gap-3 mt-4">
        <div className="w-1/4 border p-4 shadow-md">
          <p className="text-sm font-bold">Total users</p>
          <div className="w-full bg-blue-300 h-20 flex justify-center items-center mt-3">
            <span className="text-4xl font-bold">{allUsers?.length}</span>
          </div>
          <p className="text-sm font-bold mt-4 mb-2">Recently joined users</p>
          {allUsers?.map((user) => {
            return (
              <p key={user._id} className="text-gray-400 text-sm">
                {user.username}
              </p>
            );
          })}
        </div>
        <div className="w-3/4 border p-4 shadow-md">
          <BarChart data={monthwiseSale} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="">
          <p>Recent Orders</p>
        </div>
      </div>
    </section>
  );
}
