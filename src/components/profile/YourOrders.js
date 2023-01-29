import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userOrderCall,
  loading,
  userOrders,
  isReady,
} from "../../redux/slice/userOrderSlice";
import { selectUserInfo } from "../../redux/slice/authSlice";
import moment from "moment";
import OrderBox from "../order/OrderBox";

export default function YourOrders() {
  const user = useSelector(selectUserInfo);
  const orders = useSelector(userOrders);
  console.log(orders);
  const readyState = useSelector(isReady);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userOrderCall({ userId: user?._id }));
  }, []);
  return (
    <section>
      <h1 className="text-3xl text-orange-600 font-bold pb-2">My orders</h1>
      <div>
        <span>
          {user.username} you have placed {orders?.length} orders
        </span>
        <div>
          <OrderBox orders={orders} user={user} moment={moment} />
        </div>
      </div>
    </section>
  );
}
