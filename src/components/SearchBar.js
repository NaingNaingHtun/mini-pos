import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BeatLoader } from "react-spinners";
import api from "../api";
import FadeInOut from "./FadeInOut";
const SearchBar = ({ setSearchInput }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  //HANDLERS
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSearchResult(false);
    setSearchInput(searchQuery);
  };

  //if we have query in the search bar, we need to show the result panel
  useEffect(() => {
    setOpenSearchResult(searchQuery ? true : false);
  }, [searchQuery]);

  //SIDE EFFECTS
  //everytime search query changes, fetch the category names which includes the search query
  useEffect(() => {
    const fetchCategories = async () => {
      const searchQueryParameters = new URLSearchParams({ searchQuery });
      setLoading(true); //show loading indicator
      await api
        .get(`/products/category_names/?${searchQueryParameters}`)
        .then((res) => {
          setCategories(res.data);
          setLoading(false); //hide the loading indicator when completed fetching
        })
        .catch((err) => {
          console.log(err);
          setLoading(false); //hide the loading indicator when we have an error
        });
    };

    //I am gonna dealy the time of fetching category names which will reduce traffic to the backend
    //meaning we will only fetch the categories when the user paused their typing, we won't fetch constantly everytime user type
    const timeout = setTimeout(() => {
      fetchCategories();
    }, 300);

    //cleaning the previous timeout that existed when the components re-render so that we don't have lots of timeout references
    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  return (
    <div className="relative flex-1">
      <form
        className="w-full flex gap-1 py-[4px] px-[14px] rounded-lg border-[1px] border-gray-300 hover:shadow-lg"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          className="flex-1 outline-none bg-transparent"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#2E3EA1] px-5 py-3 rounded-[20px] active:scale-90 transition-transform"
          onClick={handleSubmit}
        >
          <BsSearch className="text-white " />
        </button>
      </form>

      {openSearchResult ? (
        !loading ? (
          categories.length > 0 && (
            <FadeInOut show={openSearchResult}>
              <div className="w-full max-h-[40vh] overflow-y-scroll rounded-xl p-2 absolute top-[105%] bg-[#F5F5F5] border-[1px] drop-shadow-xl z-[100]">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="cursor-pointer p-1 truncate capitalize hover:text-[#2E3EA1]"
                    onClick={() => {
                      setSearchInput(category.toLowerCase());
                      setOpenSearchResult(false);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: category.replaceAll(
                        searchQuery,
                        `<b>${searchQuery}</b>`
                      ),
                    }}
                  ></div>
                ))}
              </div>
            </FadeInOut>
          )
        ) : (
          <div className="w-full p-2 absolute top-[100%] bg-[#F5F5F5] border-[1px] drop-shadow-xl rounded-xl text-center">
            <BeatLoader color="#2E3EA1" size={10} />
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchBar;
