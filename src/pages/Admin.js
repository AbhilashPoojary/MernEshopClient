import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FiEdit, FiTrash2, FiEye, FiDownload } from "react-icons/fi";
import {
  allProductCall,
  deleteProductCall,
  products,
  loading,
  isReady,
  message,
} from "../redux/slice/allProductSlice";
import ProductModal from "../components/admin/ProductModal";
import ProductEditModal from "../components/admin/ProductEditModal";
import ProductAddModal from "../components/admin/ProductAddModal";
import Pagination from "../components/product/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductModalDelete from "../components/admin/ProductModalDelete";
import {
  FILTER_BY_SEARCH,
  adminProducts,
} from "../redux/slice/adminFilterSlice";
import InventoryTable from "../components/admin/InventoryTable";
import UserTable from "../components/admin/UserTable";

export default function Admin() {
  const dispatch = useDispatch();
  const loadingState = useSelector(loading);
  const loadProducts = useSelector(isReady);
  const productsAdmin = useSelector(adminProducts);
  console.log(productsAdmin);

  // const loadingState = true;
  const allProducts = useSelector(products);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [modalId, setModalId] = useState("");
  const [productsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [download, setDownload] = useState("");
  let indexOfLastProduct = currentPage * productsPerPage;
  let indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = productsAdmin?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log({
    productsAdmin,
    currentProducts,
    indexOfLastProduct,
    indexOfFirstProduct,
  });
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const customActions = (id) => {
    setModalId(id);
    setShowModal(true);
  };
  const handleEdit = (id) => {
    setModalId(id);
    setShowModalEdit(true);
  };
  const handleDelete = (id) => {
    setModalId(id);
    setShowModalDelete(true);
  };
  const handleDownload = (id) => {
    const product = allProducts.filter((item) => item._id === id);
    setDownload(product[0]);
  };
  useEffect(() => {
    console.log(download);
    const json = JSON.stringify(download);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    if (download) {
      link.download = `${download.name}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownload("");
    }
  }, [download]);
  useEffect(() => {
    dispatch(allProductCall());
  }, [showModalAdd]);
  useEffect(() => {
    if (loadProducts) {
      dispatch(allProductCall());
      // dispatch(FILTER_BY_SEARCH({ products: allProducts, search }));
    }
  }, [loadProducts]);
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products: allProducts, search }));
    if (productsAdmin.length < 5) {
      currentProducts = productsAdmin;
    }
  }, [search]);
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products: allProducts, search }));
  }, [allProducts]);
  return (
    <section className="container">
      {loadingState ? (
        <section className="flex justify-center items-center custom-height">
          <Spinner />
        </section>
      ) : (
        <section className="py-5 custom-height">
          <div className="flex justify-between">
            <h1 className="text-3xl text-orange-600 font-bold">
              Inventory Table
            </h1>
            <div>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => setShowModalAdd(true)}
              >
                Add
              </button>
            </div>
          </div>
          <InventoryTable
            setSearch={setSearch}
            currentProducts={currentProducts}
            customActions={customActions}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDownload={handleDownload}
            search={search}
          />
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={productsAdmin?.length}
            paginate={paginate}
            currentPage={currentPage}
            conditionNo={productsPerPage}
          />
          <hr className="mt-3" />
          <UserTable />
          <hr className="mt-3" />
          <div className="mt-3">
            <span className="mr-1">Visit</span>
            <Link
              to="/admin-orders"
              className="font-bold cursor-pointer underline"
            >
              All Orders
            </Link>
            <span className="ml-1">
              {" "}
              page to check the existing orders placed by users
            </span>
          </div>
          <div className="mt-2 mb-10">
            <span className="mr-1">Check</span>
            <Link
              to="/dashboard"
              className="font-bold cursor-pointer underline my-2"
            >
              Dashboard
            </Link>
            <span className="ml-1">page</span>
          </div>
        </section>
      )}
      {showModal && (
        <ProductModal setShowModal={setShowModal} modalId={modalId} />
      )}
      {showModalEdit && (
        <ProductEditModal
          setShowModalEdit={setShowModalEdit}
          modalId={modalId}
          toast={toast}
        />
      )}
      {showModalAdd && (
        <ProductAddModal setShowModalAdd={setShowModalAdd} toast={toast} />
      )}
      {showModalDelete && (
        <ProductModalDelete
          setShowModalDelete={setShowModalDelete}
          modalId={modalId}
        />
      )}
      <ToastContainer />
    </section>
  );
}
