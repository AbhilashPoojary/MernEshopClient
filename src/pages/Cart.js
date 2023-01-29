import React, { useEffect } from "react";
import { productData } from "../components/dummyProducts";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  selectCartItems,
  ADD_TO_CART,
  DECREASE_FROM_CART,
  DELETE_FROM_CART,
  EMPTY_CART,
  selectCartTotalQuantity,
  selectCartTotalAmount,
  TOTAL_CART_ITEMS,
  TOTAL_CART_VALUE,
} from "../redux/slice/cartSlice";
import { BsTrashFill } from "react-icons/bs";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const cartTotal = useSelector(selectCartTotalAmount);
  const navigate = useNavigate();

  const checkOut = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(TOTAL_CART_ITEMS());
    dispatch(TOTAL_CART_VALUE());
  }, [cartItems, dispatch]);
  return (
    <section className="container">
      <div className="custom-height p-3">
        {cartItems?.length > 0 && (
          <h1 className="text-3xl text-orange-600 text-center font-bold mb-3">
            Shopping Cart
          </h1>
        )}
        {cartItems?.length > 0 ? (
          <>
            <table className="w-full mt-3">
              <thead>
                <tr className="border-y-2 border-indigo-900 table-header">
                  <th className="p-4 border">S.no</th>
                  <th className="p-4 border">Product</th>
                  <th className="p-4 border">Price</th>
                  <th className="p-4 border">Quantity</th>
                  <th className="p-4 border">Total</th>
                  <th className="p-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((product, index) => {
                  return (
                    <tr
                      className="text-center m-auto even:bg-gray-100 last:border-b"
                      key={product._id}
                    >
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">
                        <h5 className="font-bold">{product.name}</h5>
                        <img
                          src={product.imgUrl}
                          className="w-24 h-24 m-auto"
                        />
                      </td>
                      <td className="p-2">{product.price}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-2 justify-center">
                          <button
                            className="btn px-2 py-1 bg-indigo-900 text-white hover:-translate-y-1 transition-all delay-250 ease-in-out rounded"
                            onClick={() => dispatch(ADD_TO_CART(product))}
                          >
                            +
                          </button>
                          <span className="font-bold">
                            {product.cartQuantity}
                          </span>
                          <button
                            className="btn px-2 py-1 bg-indigo-900 text-white hover:-translate-y-1 transition-all delay-250 ease-in-out rounded"
                            onClick={() =>
                              dispatch(DECREASE_FROM_CART(product))
                            }
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td className="p-2">
                        {product.cartQuantity * product.price}
                      </td>
                      <td className="p-2">
                        <BsTrashFill
                          className="m-auto text-red-600 text-2xl cursor-pointer hover:-translate-y-1 transition-all delay-250 ease-in-out"
                          onClick={() => dispatch(DELETE_FROM_CART(product))}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex mt-3 justify-between items-center">
              <div>
                <button
                  className="btn bg-red-500 text-white p-2 rounded hover:bg-red-600 hover:-translate-y-1 transition-all delay-150 ease-in-out"
                  onClick={() => dispatch(EMPTY_CART())}
                >
                  Clear Cart
                </button>
              </div>
              <span className="text-indigo-900 cursor-pointer hover:-translate-y-1 transition-all delay-150 ease-in-out">
                <Link to="/products"> ← Continue shopping</Link>
              </span>
            </div>
            <div className="flex justify-end mt-3">
              <div className="card w-1/3 p-3 rounded-sm shadow-xl">
                <h3 className="font-bold text-xl">
                  Cart item(s): {cartQuantity}
                </h3>
                <div className="flex justify-between">
                  <h3 className="font-bold text-2xl">Subtotal:</h3>
                  <span className="text-2xl text-orange-600">{cartTotal}</span>
                </div>
                <p className="mt-2">Tax and shipping calculated at checkout</p>
                <button
                  className="btn w-full p-2 bg-blue-600 text-white rounded-sm mt-2 hover:bg-blue-800 transition-all delay-200 ease-in-out"
                  onClick={checkOut}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-3xl text-orange-600 text-center font-bold">
            Shopping cart is empty
          </h1>
        )}
      </div>
    </section>
  );
}
