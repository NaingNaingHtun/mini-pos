import React, { useEffect, useReducer, useState } from "react";
import SearchBar from "../components/SearchBar";
import api from "../api";
import { BeatLoader } from "react-spinners";
import cardReducer from ".././reducers/cart";
import Cart from "../components/Cart";
import Products from "../components/Products";
const categories = [
  { label: "All", value: "" },
  { label: "Hat", value: "hat" },
  { label: "Glasses", value: "glasses" },
  { label: "Shirt", value: "shirt" },
  { label: "Coat", value: "coat" },
  { label: "Pant", value: "pant" },
  { label: "Shoe", value: "shoe" },
];

const CartContext = React.createContext();
const Home = () => {
  const [cart, dispatch] = useReducer(cardReducer, []);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(""); //all = "", by default
  const [searchInput, setSearchInput] = useState("");
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [query, setQueryParameters] = useState({
    category: category === "all" ? "" : category,
    searchInput,
  });

  console.log(cart);
  //everytime query or title changes, we need to fetch the products again
  useEffect(() => {
    const fetchProducts = async () => {
      const searchQuery = new URLSearchParams(query);

      setFetchingProducts(true); //start showing the loading indicator, and fetch the products
      await api
        .get(`/products/?${searchQuery}`)
        .then((res) => {
          setFetchingProducts(false); //hide the loading indicator when fetching completed
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
          setFetchingProducts(false); //hide the loading indicator when we have an error
        });
    };

    fetchProducts();
  }, [query]);

  //if the user filters the products by category, clear the search query parameter and fetch the products which includes the search fields
  useEffect(() => {
    setQueryParameters({
      category,
      searchInput: "",
    });
  }, [category]);

  //if the user search the products with search input, clear the category query parameter and fetch the products which match noly the search input
  useEffect(() => {
    setQueryParameters({
      searchInput,
      category: "",
    });
  }, [searchInput]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      <div className="flex flex-col md:flex-row w-[100vw] h-[100vh] bg-[#F5F5F5]">
        <div className="flex-[2] flex flex-col">
          <div className="h-[10vh] md:h-[12vh] flex justify-between p-5 items-center">
            <div className="hidden md:block flex-1">
              <img
                src="images/logo2.png"
                className="h-[35px] w-[152px]"
                alt="K-Link Logo"
              />
            </div>
            <SearchBar setSearchInput={setSearchInput} />
          </div>
          <div className="h-[8vh] md:h-[12vh] px-5 flex items-center gap-2 overflow-x-scroll">
            {categories.map((c, index) => (
              <div
                key={index}
                className="p-[4px_12px] text-white rounded-2xl cursor-pointer text-sm"
                onClick={() => setCategory(c.value)}
                style={{
                  backgroundColor: c.value === category ? "#2E3EA1" : "#ebeaea",
                  color: c.value === category ? "white" : "#344054",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
          {fetchingProducts ? (
            <div className="h-[82vh] md:h-[76vh] flex justify-center items-center">
              <BeatLoader color="#2E3EA1" />
            </div>
          ) : (
            <Products products={products} />
          )}
        </div>
        <Cart />
      </div>
    </CartContext.Provider>
  );
};

export { Home, CartContext };
