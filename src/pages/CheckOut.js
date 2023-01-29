import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Shipping from "../components/Shipping";
import {
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalAmount,
  TOTAL_CART_ITEMS,
  TOTAL_CART_VALUE,
} from "../redux/slice/cartSlice";

export default function CheckOut() {
  const cartItems = useSelector(selectCartItems);
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const cartTotal = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TOTAL_CART_ITEMS());
    dispatch(TOTAL_CART_VALUE());
  }, [cartItems, dispatch]);
  return (
    <section className="container py-4">
      <h1 className="text-3xl text-orange-600 font-bold mb-3">
        Checkout Details
      </h1>
      <div className="flex gap-2">
        <Shipping cartItems={cartItems} cartTotal={cartTotal} />
        <div className="w-2/4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl mb-3">Checkout Summary</h1>
            <h3 className="font-bold text-xl">Cart item(s): {cartQuantity}</h3>
            <div className="flex justify-between">
              <h3 className="font-bold text-2xl">Subtotal:</h3>
              <span className="text-2xl text-orange-600">{cartTotal}</span>
            </div>
            {cartItems.map((item) => (
              <div
                className="border p-2 my-2 border-orange-600 rounded"
                key={item._id}
              >
                <h1 className="text-2xl mb-3 font-bold">{item.name}</h1>
                <p>Quantity: {item.cartQuantity}</p>
                <p>Price: {item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
