import React, { useContext } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import { CartContext } from "../pages/Home";
import FadeIn from "./FadeIn";
const OrderItem = ({ item }) => {
  const { dispatch } = useContext(CartContext);

  //HANDLERS
  const updateQuantity = (e) => {
    //if the user type empty string and the quantity is zero
    if (Number(e.target.value) === 0 && Number(e.target.value) === NaN) {
      dispatch({
        type: "SET_QUANTITY",
        payload: { id: item.id, quantity: 1 },
      });
    } else {
      dispatch({
        type: "SET_QUANTITY",
        payload: { id: item.id, quantity: Number(e.target.value) },
      });
    }
  };
  const increaseQuantity = () => {
    dispatch({ type: "INCREASE_QUANTITY", payload: item.id });
  };
  const decreaseQuantity = () => {
    dispatch({ type: "DECREASE_QUANTITY", payload: item.id });
  };
  const removeItem = () => {
    dispatch({ type: "REMOVE_PRODUCT", payload: item.id });
  };
  return (
    <FadeIn show={Boolean(item)}>
      <div className="flex justify-start gap-2 items-start">
        <img
          src={item.image}
          alt={item.title}
          className="w-[100px] h-[100px] rounded-lg shadow-lg object-contain"
        />
        <div className="flex-1">
          <p>{item.title}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex">
              <div
                className="w-[35px] h-[35px] border-[1px] rounded-l-lg flex justify-center items-center hover:border-[1px] hover:border-[#2E3EA1] cursor-pointer"
                title="Decrease quantity"
                onClick={decreaseQuantity}
              >
                <BiMinus className="text-lg" />
              </div>
              <input
                type="text"
                value={item.quantity}
                className="w-[40px] h-[35px] border-[1px] text-lg text-center outline-[#2E3EA1]"
                onChange={updateQuantity}
              />

              <div
                className="w-[35px] h-[35px] border-[1px] rounded-r-lg flex justify-center items-center hover:border-[1px] hover:border-[#2E3EA1] cursor-pointer"
                title="Increase quantity"
                onClick={increaseQuantity}
              >
                <BiPlus className="text-lg" />
              </div>
            </div>
            <div className="text-[#2E3EA1]">
              <span className="text-sm">Ks</span>{" "}
              <span className="text-[20px]">{item.price}</span>
            </div>
          </div>
        </div>
        <div className="pl-5 text-xl">
          <VscClose
            className="cursor-pointer text-gray-600 hover:text-red-500"
            title="Remove item"
            onClick={removeItem}
          />
        </div>
      </div>
    </FadeIn>
  );
};

export default OrderItem;
