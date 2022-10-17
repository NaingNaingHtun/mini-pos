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
      <div className="flex flex-col gap-2 p-2" onClick={handleClick}>
        <div className="w-full md:w-[170px] h-[170px] flex justify-center items-center shadow-lg rounded-xl  bg-white hover:border-[1px] hover:border-[#2E3EA1] cursor-pointer hover:scale-105 transition-transform ">
          <img
            src={product.image}
            className="rounded-xl h-full object-contain"
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
