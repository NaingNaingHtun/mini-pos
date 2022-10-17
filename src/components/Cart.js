import React, { useContext } from "react";

import { CartContext } from "../pages/Home";
import OrderItem from "./OrderItem";

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);
  let subtotal = 0;
  //summing up the total
  cart.forEach((item) => {
    subtotal += item.quantity * item.price;
  });
  const tax_percent = 0.05; //tax_percentage = 5%
  const tax = Math.round(subtotal * tax_percent); //125.5 => 126
  const total = subtotal + tax;

  //HANDLERS
  //handle pay now click
  const handlePayNow = () => {
    dispatch({ type: "EMPTY_CART" });
  };

  return (
    <div className="h-[100vh] border-2 md:border-l-2 flex-1 flex flex-col bg-[#F5F5F5]">
      <h1 className="px-5 py-3 text-[24px] leading-[32px] font-bold">
        Order Details
      </h1>
      {cart.length > 0 ? (
        <div className="flex-1 p-5 overflow-y-scroll flex flex-col gap-4">
          {cart.map((item, index) => (
            <OrderItem item={item} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center text-gray-500">
          Your cart is Empty
        </div>
      )}

      <div className="flex flex-col gap-2 py-5 px-8 text-[#475467] bg-[#e4e6fc]">
        <div className="flex justify-between ">
          <span>Subtotal</span>
          <span className="text-[#2E3EA1]">Ks {subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span className="text-[#2E3EA1]">Ks {tax}</span>
        </div>
        <div className="border-b-[1px] border-dashed border-gray-500"></div>
        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-bold text-[#2E3EA1]">Ks {total}</span>
        </div>
        <button
          className="w-full text-white bg-[#2E3EA1] p-[10px_18px] rounded-lg disabled:bg-gray-300"
          onClick={handlePayNow}
          disabled={cart.length === 0}
          style={{ cursor: cart.length === 0 ? "not-allowed" : "pointer" }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
