import React, { useEffect, useState } from "react";
import { productData } from "../dummyProducts";
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  selectFilteredProducts,
} from "../../redux/slice/filterSlice";
import { selectProducts } from "../../redux/slice/productSlice";
import {
  allProductCall,
  products,
  loading,
  success,
} from "../../redux/slice/allProductSlice";

export default function ProductFilter({ setCurrentPage }) {
  const dispatch = useDispatch();
  //const productData = useSelector(products);
  const productData = useSelector(products);
  const readyState = useSelector(success);
  console.log(readyState);

  const catergories = [
    "All",
    ...new Set(productData?.map((prouct) => prouct?.category)),
  ];
  console.log(catergories);
  const brand = [
    "All",
    ...new Set(productData?.map((product) => product?.brand)),
  ];
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [rangeValue, setRangeValue] = useState(0);

  const [category, setCategory] = useState("All");
  const [branding, setBranding] = useState("All");

  useEffect(() => {
    dispatch(allProductCall());
  }, []);
  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products: productData, category: cat }));
    setCurrentPage(1);
  };
  useEffect(() => {
    setRangeValue(maxPrice);
  }, [maxPrice]);
  const handleSelectChange = (e) => {
    setBranding(e.target.value);
  };
  useEffect(() => {
    if (readyState) {
      dispatch(FILTER_BY_BRAND({ products: productData, brand: branding }));
      setCurrentPage(1);
    }
  }, [branding, readyState]);
  useEffect(() => {
    if (readyState) {
      dispatch(FILTER_BY_PRICE({ products: productData, price: rangeValue }));
    }
    setCurrentPage(1);
  }, [rangeValue, readyState]);
  useEffect(() => {
    if (readyState) {
      dispatch(FILTER_BY_CATEGORY({ products: productData, category: "All" }));
      setMinPrice(Math.min(...productData?.map((product) => product.price)));
      setMaxPrice(Math.max(...productData?.map((product) => product.price)));
    }
  }, [readyState]);

  return (
    <div className="w-1/5">
      <div className="catergories">
        <h3 className="font-bold mb-2 mt-2 text-2xl">Categories</h3>
        {catergories?.map((cat, index) => {
          return (
            <div key={index}>
              <div
                className={`${
                  category === cat ? "border-l-2 border-l-orange-600" : ""
                } border-b border-b-indigo-900 cursor-pointer p-1 flex`}
                onClick={() => filterProducts(cat)}
              >
                › {cat}
              </div>
            </div>
          );
        })}
      </div>
      <div className="brand mt-3">
        <h3 className="font-bold mb-2 mt-2 text-2xl">Brand</h3>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-600 dark:focus:border-orange-600 active:border-orange-600 focus-visible focus-within:outline-none"
          onChange={handleSelectChange}
        >
          {brand?.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </select>
      </div>
      <div className="price mt-3">
        <h3 className="font-bold mb-1 mt-2 text-2xl">Price</h3>
        <span className="block">{rangeValue}</span>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
      </div>
    </div>
  );
}
