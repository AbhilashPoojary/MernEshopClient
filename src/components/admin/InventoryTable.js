import React from "react";
import { FiEdit, FiTrash2, FiEye, FiDownload } from "react-icons/fi";

export default function InventoryTable({
  setSearch,
  currentProducts,
  customActions,
  handleEdit,
  handleDelete,
  handleDownload,
  search,
}) {
  return (
    <div className="mt-2 mb-2">
      <div className="flex justify-end">
        <div className="pt-2 relative text-gray-600">
          <input
            className="border border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            name="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                Name
              </th>
              <th scope="col" className="px-6 py-4">
                Price
              </th>
              <th scope="col" className="px-6 py-4">
                Category
              </th>
              <th scope="col" className="px-6 py-4">
                Brand
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
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <td scope="col" className="px-6 py-4">
                    {item.name}
                  </td>
                  <td scope="col" className="px-6 py-4">
                    {item.price}
                  </td>
                  <td scope="col" className="px-6 py-4">
                    {item.category}
                  </td>
                  <td scope="col" className="px-6 py-4">
                    {item.brand}
                  </td>
                  <td scope="col" className="px-6 py-4 font-medium flex gap-3">
                    <FiEye
                      className="text-2xl cursor-pointer text-gray-600"
                      onClick={() => customActions(item._id)}
                    />
                    <FiEdit
                      className="text-2xl cursor-pointer text-sky-600"
                      onClick={() => handleEdit(item._id)}
                    />
                    <FiTrash2
                      className="text-2xl cursor-pointer text-red-600"
                      onClick={() => handleDelete(item._id)}
                    />
                    <FiDownload
                      className="text-2xl cursor-pointer text-green-600"
                      onClick={() => handleDownload(item._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
