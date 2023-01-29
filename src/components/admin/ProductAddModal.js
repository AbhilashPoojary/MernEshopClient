import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Util from "../Util";
import { addProductCall } from "../../redux/slice/allProductSlice";

export default function ProductAddModal({ toast, setShowModalAdd }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [productPic, setProductPic] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [picLoading, setPicLoading] = useState("");

  const picDetails = (file) => {
    Util.uploadImage(file, setPicLoading, toast, setProductPic);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const data = {
      name,
      price,
      brand,
      category,
      imgUrl: productPic,
      desc: productDesc,
    };
    dispatch(addProductCall(data));
    setShowModalAdd(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-1/2">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-bold text-center">
                Edit product {name} ?
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModalAdd(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="p-6">
              <form onSubmit={handleAddProduct}>
                <div className="flex gap-2">
                  <div className="mb-2 w-1/2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 w-1/2">
                    <label
                      htmlFor="price"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="mb-2 w-1/2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      name="password"
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </div>
                  <div className="mb-2 w-1/2">
                    <label
                      htmlFor="password_confirmation"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Category
                    </label>

                    <input
                      type="text"
                      name="password_confirmation"
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Product Details
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Product detail"
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-2">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={(e) => picDetails(e.target.files[0])}
                    />
                  </label>
                  {picLoading && (
                    <div className="flex justify-center">
                      <div role="status m-auto">
                        <svg
                          aria-hidden="true"
                          className="w-6 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                  {productPic && (
                    <div className="h-28 w-28 flex mt-2 items-center">
                      <img src={productPic} />
                      <div>
                        <AiOutlineCloseCircle
                          className="text-2xl cursor-pointer"
                          onClick={() => setProductPic("")}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="file_url"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Instead uploading use product link feature{" "}
                    <span className="text-red-600 font-bold">
                      !!!Available only for dev mode will be removed later
                    </span>
                  </label>
                  <input
                    type="text"
                    name="file_url"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={productPic}
                    onChange={(e) => setProductPic(e.target.value)}
                  />
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex justify-between p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModalAdd(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                onClick={(e) => handleAddProduct(e)}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
