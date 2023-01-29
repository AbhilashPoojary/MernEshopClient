import React from "react";

export default function OrderBox({ orders, user, moment }) {
  return (
    <section>
      {orders?.map((order) => {
        return (
          <div
            key={order._id}
            className="rounded-lg bg-white shadow-md dark:bg-gray-800 dark:border-gray-700 mb-2 mt-2"
          >
            <div className="flex p-4 bg-gray-100 gap-3 border rounded-lg rounded-b-none border-b-0">
              <div>
                <p className="text-sm font-light">ORDER PLACED</p>
                <p className="text-sm">
                  {moment(order.date_added).format("LL")}
                </p>
              </div>
              <div>
                <p className="text-sm font-light">Total</p>
                <p className="text-sm">{order.bill}</p>
              </div>
              <div>
                <p className="text-sm font-light">Ship to</p>
                <p className="text-sm">{order.address.recipient_name}</p>
              </div>
              <div className="ml-auto">
                <p className="text-sm font-light">ORDER #{order._id}</p>
                <p className="text-sm">View order details | Invoice</p>
              </div>
            </div>
            <div className="flex p-4 border rounded-lg rounded-t-none">
              <div>
                <p>On the way, but it's running late</p>
                <p>Track your package for details</p>
                {order.items.map((item) => {
                  return (
                    <div
                      key={item.productId}
                      className="flex gap-3 items-center"
                    >
                      <div className="mt-2">
                        <img src={item.productImg} className="w-28 h-28" />
                      </div>
                      <div>
                        <span>{item.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
