import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo } from "../redux/slice/authSlice";
import axios from "axios";
import {
  addOrderCall,
  isReady,
  orders,
  allOrderCall,
} from "../redux/slice/orderSlice";
import StripeCheckout from "react-stripe-checkout";

export default function Shipping({ cartItems, cartTotal }) {
  const updatedCartItems = cartItems?.map((item) => {
    return {
      productId: item._id,
      name: item.name,
      quantity: item.cartQuantity,
      price: item.price,
      productImg: item.imgUrl,
    };
  });
  console.log(updatedCartItems);
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const publishableKey =
    "pk_test_51MEUkMSH3VfTLwtGHKZanO4HCIbkKb8Ebezel2Rrn9YV9OeQRYeFxgpcjbQBQOR4s5f7iHny48HBcz1UHsqGg9ad00wsc8tonL";
  const [name, setName] = useState("");
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [pcode, setPcode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (pcode) {
      fetch(`https://api.postalpincode.in/pincode/${pcode}`)
        .then((response) => response.json())
        .then((data) => changeStates(data))
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [pcode]);
  const changeStates = (data) => {
    setCity(data[0]?.PostOffice);
    setCountry(data[0]?.PostOffice[0]?.Country);
    console.log(country);
  };
  const cityData = city?.map((item) => (
    <option key={item.Name} value={item.Name}>
      {item.Name}
    </option>
  ));

  const handleSelectChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const order = {
      userId: user?._id,
      items: updatedCartItems,
      bill: cartTotal,
      date_added: new Date(),
      address: {
        recipient_name: name,
        address_line1: add1,
        address_line2: add2,
        state,
        postal_code: pcode,
        city: selectedCity,
        country,
      },
    };
    console.log(order);
    dispatch(addOrderCall(order));
  };

  const handleStripePayment = async (token) => {
    const data = { amount: cartTotal, token };
    try {
      const response = await axios({
        url: "/api/order/payment",
        method: "post",
        data,
      });
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(allOrderCall({ userId: user._id }));
  }, []);
  return (
    <>
      <div className="w-2/4">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleOrderSubmit}
        >
          <h1 className="text-3xl mb-3">Shipping Address</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="recipientname"
            >
              Recipient Name
            </label>
            <input
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="recipientname"
              type="text"
              placeholder="Recipient Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="recipientname"
            >
              Address line 1
            </label>
            <input
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="addressline1"
              type="text"
              placeholder="Address line 1"
              value={add1}
              onChange={(e) => setAdd1(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="recipientname"
            >
              Address line 2
            </label>
            <input
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="addressline2"
              type="text"
              placeholder="Address line 2"
              value={add2}
              onChange={(e) => setAdd2(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="state"
            >
              State
            </label>
            <input
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="state"
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="postalcode"
            >
              Postal code
            </label>
            <input
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="postalcode"
              onChange={(e) => setPcode(e.target.value)}
              type="text"
              placeholder="Postal code"
              value={pcode}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="postalcode"
            >
              City
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => handleSelectChange(e)}
            >
              <option>select</option>
              {cityData}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="country"
            >
              Country
            </label>
            <input
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              defaultValue={country || ""}
              type="text"
              placeholder="Country"
              disabled="disabled"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="btn bg-orange-600 rounded p-2 text-white hover:bg-orange-700">
              Proceed To CheckOut
            </button>
            <StripeCheckout
              stripeKey={publishableKey}
              label="Pay Now"
              name="Pay With Credit Card"
              shippingAddress
              email={user?.email}
              amount={cartTotal}
              description={`Your total is $${cartTotal}`}
              token={handleStripePayment}
            />
          </div>
        </form>
      </div>
    </>
  );
}
