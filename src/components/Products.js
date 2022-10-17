import SingleProduct from "./SingleProduct";
import { BiErrorCircle } from "react-icons/bi";
const Products = ({ products }) => {
  return products.length > 0 ? (
    <div className="h-[80vh] md:h-[76vh] overflow-y-scroll grid grid-cols-1 md:grid-cols-4 px-5 gap-4">
      {products.map((product, index) => (
        <SingleProduct product={product} key={index} />
      ))}
    </div>
  ) : (
    <div className="h-[76vh] px-5 flex flex-col justify-center items-center">
      <BiErrorCircle className="text-red-500 text-3xl" />
      <h1 className="text-lg text-gray-500">No Products Found</h1>
    </div>
  );
};

export default Products;
