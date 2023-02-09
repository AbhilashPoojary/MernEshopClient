import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { productData } from "../dummyProducts";
import { STORE_PRODUCTS } from "../../redux/slice/productSlice";
import {
  FILTER_BY_CATEGORY,
  selectFilteredProducts,
} from "../../redux/slice/filterSlice";
import { allProductCall } from "../../redux/slice/allProductSlice";
import { ADD_TO_CART } from "../../redux/slice/cartSlice";
import { products, loading } from "../../redux/slice/allProductSlice";
import Pagination from "./Pagination";
import { selectUserInfo } from "../../redux/slice/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner";

export default function ProductsView({
  gridView,
  currentPage,
  setCurrentPage,
}) {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  console.log(user);
  const filteredProducts = useSelector(selectFilteredProducts);
  const productData = useSelector(products);
  const productLoading = useSelector(loading);
  const [productsPerPage] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  function trimString(input, length) {
    if (input.length > length) {
      return input.substring(0, length).concat("...");
    }
    return input;
  }
  const handleAddCart = (item) => {
    if (!user.username) {
      toast.error("Login to add items to the cart");
      return;
    }
    dispatch(ADD_TO_CART(item));
  };
  useEffect(() => {
    //dispatch(STORE_PRODUCTS(productData));
    dispatch(FILTER_BY_CATEGORY({ products: productData, category: "All" }));
  }, [productData]);
  useEffect(() => {
    dispatch(allProductCall());
  }, []);

  return (
    <>
      <div className={`${gridView ? "flex flex-wrap" : ""} justify-between`}>
        {productLoading ? (
          <Spinner />
        ) : (
          currentProducts?.map((item) => {
            return (
              <div
                key={item._id}
                className={`${
                  gridView ? "w-30" : "w-full flex"
                } bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 my-3`}
              >
                <div
                  className={`${
                    gridView
                      ? "border-b-2 pb-2 flex justify-center"
                      : "border-r-2 pr-2 w-full flex justify-center max-w-xs"
                  }`}
                >
                  <a href="#" className="">
                    <img
                      className={`w-48 h-48 overflow-hidden`}
                      src={item.imgUrl}
                      alt=""
                    />
                  </a>
                </div>
                <div className={`${gridView ? "" : "ml-2"}`}>
                  <h5
                    className={`${
                      gridView ? "text-center" : "mt-2"
                    } mb-2 text-xl text-orange-600 tracking-tight`}
                  >
                    $ {item.price}
                  </h5>
                  <a href="#">
                    <h5
                      className={`${
                        gridView ? "text-center" : ""
                      } mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white`}
                    >
                      {trimString(item.name, 20)}
                    </h5>
                  </a>
                  {!gridView && (
                    <p className="mb-3">{trimString(item.desc, 200)}</p>
                  )}
                  <div className={`${gridView ? "text-center" : ""}`}>
                    <button
                      className={`${
                        gridView ? "w-full" : "rounded mb-3"
                      } bg-orange-600 text-white p-2`}
                      onClick={() => handleAddCart(item)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts?.length}
        paginate={paginate}
        currentPage={currentPage}
        conditionNo={productsPerPage}
      />
      <ToastContainer />
    </>
  );
}
