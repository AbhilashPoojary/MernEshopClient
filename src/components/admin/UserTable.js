import React, { useEffect, useState } from "react";
import {
  FiUserX,
  FiTrash2,
  FiEye,
  FiDownload,
  FiUserCheck,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  users,
  Userloading,
  allUsersCall,
} from "../../redux/slice/allUserSlice";
import { selectUserInfo } from "../../redux/slice/authSlice";
import moment from "moment";
import Pagination from "../product/Pagination";

export default function UserTable() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const allUsers = useSelector(users);
  const [userPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const indexOfLastProduct = currentPage * userPerPage;
  const indexOfFirstProduct = indexOfLastProduct - userPerPage;
  const currentProducts = allUsers?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(user);
  useEffect(() => {
    if (user?._id) {
      dispatch(allUsersCall({ userId: user?._id }));
    }
  }, [user?._id]);
  const customActions = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};
  const handleDownload = () => {};
  return (
    <div className="mt-2 mb-2">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl text-orange-600 font-bold">User Table</h3>
        <div className="pt-2 relative text-gray-600">
          <input
            className="border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            name="search"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                Full Name
              </th>
              <th scope="col" className="px-6 py-4">
                Joined at
              </th>
              <th scope="col" className="px-6 py-4">
                Total Purchase Value
              </th>
              <th scope="col" className="px-6 py-4">
                Active
              </th>
              <th scope="col" className="px-6 py-4">
                Admin
              </th>
              <th scope="col" className="px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts?.map((item) => {
              return (
                <tr
                  key={item?._id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td scope="col" className="px-6 py-4">
                    {item?.username}
                  </td>
                  <td scope="col" className="px-6 py-4">
                    {moment(item?.createdAt).format("MMM Do YY")}
                  </td>
                  <td scope="col" className="px-6 py-4">
                    {`2500`}
                  </td>
                  <td scope="col" className="px-6 py-4">
                    {item?.isActive ? "Yes" : "No"}
                  </td>
                  <td scope="col" className="px-6 py-4">
                    {item?.isAdmin ? "Yes" : "No"}
                  </td>
                  <td scope="col" className="px-6 py-4 font-medium flex gap-3">
                    <FiEye
                      className="text-2xl cursor-pointer text-gray-600"
                      onClick={() => customActions(item._id)}
                    />
                    <FiUserCheck
                      className="text-2xl cursor-pointer text-sky-600"
                      onClick={() => handleEdit(item._id)}
                    />
                    <FiTrash2
                      className="text-2xl cursor-pointer text-red-600"
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        productsPerPage={userPerPage}
        totalProducts={allUsers?.length}
        paginate={paginate}
        currentPage={currentPage}
        conditionNo={userPerPage}
      />
    </div>
  );
}
