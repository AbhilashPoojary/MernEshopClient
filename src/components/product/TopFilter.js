import React, { useState, useEffect } from "react";
import { BsGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BY_SEARCH, SORT_PRODUCTS } from "../../redux/slice/filterSlice";
//import { productData } from "../dummyProducts";
import { allProductCall } from "../../redux/slice/allProductSlice";
import { products, loading } from "../../redux/slice/allProductSlice";

export default function TopFilter({ gridView, setGridView, setCurrentPage }) {
  const dispatch = useDispatch();
  const productData = useSelector(products);
  const [input, setInput] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const setSortChange = (e) => {
    setSortBy(e.target.value);
  };
  useEffect(() => {
    if (input) {
      dispatch(FILTER_BY_SEARCH({ products: productData, search: input }));
      setCurrentPage(1);
    }
  }, [input]);
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products: productData, sort: sortBy }));
  }, [sortBy]);
  useEffect(() => {
    dispatch(allProductCall());
  }, []);

  return (
    <div className="flex justify-between border-b-2">
      <div className="grid-type flex gap-3 items-center ">
        <BsGridFill
          className="cursor-pointer text-xl text-orange-600"
          onClick={() => setGridView(true)}
        />
        <FaThList
          className="cursor-pointer text-xl text-indigo-900"
          onClick={() => setGridView(false)}
        />
        <span>
          <span className="font-bold">{productData?.length}</span> proucts found
        </span>
      </div>
      <div className="search">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="search by product name"
          className="my-2 border rounded-md px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-orange-600 focus:shadow-outline-orange-600 active:border-orange-600"
        />
      </div>
      <div className="sort flex items-center justify-between">
        <span className="w-2/4">Sort by:</span>
        <select
          className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-600 dark:focus:border-orange-600 active:border-orange-600 focus-visible focus-within:outline-none"
          onChange={setSortChange}
        >
          <option value="latest">Latest</option>
          <option value="lowest-price">Lowest Price</option>
          <option value="highest-price">Highest Price</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>
    </div>
  );
}
