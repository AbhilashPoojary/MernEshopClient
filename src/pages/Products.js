import React, { useState, useEffect } from "react";
import ProductFilter from "../components/product/ProductFilter";
import ProductsView from "../components/product/ProductsView";
import TopFilter from "../components/product/TopFilter";
import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const [gridView, setGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="container flex p-4 gap-7 custom-height">
      <ProductFilter
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="right-section w-full">
        <TopFilter
          gridView={gridView}
          setGridView={setGridView}
          setCurrentPage={setCurrentPage}
        />
        <ProductsView
          gridView={gridView}
          setGridView={setGridView}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
}
