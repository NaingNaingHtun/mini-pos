import React, { useContext } from "react";
import { CartContext } from "../pages/Home";
import FadeIn from "./FadeIn";

const SingleProduct = ({ product }) => {
  const { dispatch } = useContext(CartContext);
  //HANDLERS
  //handle clicking on the product
  const handleClick = () => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        ...product,
        quantity: 1,
      },
    });
  };
  return (
    <FadeIn show={Boolean(product)}>
      <div
        className="flex flex-col gap-2 p-2 items-start hover:shadow-2xl hover:rounded-xl cursor-pointer hover:scale-105 transition-transform"
        onClick={handleClick}
      >
        <div className="w-full h-[170px] md:w-[170px] grid place-items-center bg-white cursor-pointer rounded-xl">
          <img
            src={product.image}
            className="w-full h-[170px] rounded-xl object-contain"
            loading="lazy"
            alt={product.title}
          />
        </div>
        <p>{product.title}</p>
        <div className="text-[#2E3EA1] font-bold flex gap-1 items-baseline">
          <span className="text-[14px]">Ks</span>
          <span className="text-[20px]">{product.price}</span>
        </div>
      </div>
    </FadeIn>
  );
};

export default SingleProduct;
