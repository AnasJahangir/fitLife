import React from "react";
import { Link } from "react-router-dom";

function Products() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black mb-10 mt-10">Products</h1>
        <div>
          <Link
            to={"/admin/dashboard/add-product"}
            className="text-white bg-black  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2 text-center"
          >
            Add Product
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs text-gray-700 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>

              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b  dark:border-gray-700 text-black hover:text-white hover:bg-gray-950 dark:hover:bg-black">
              <td className="px-6 py-4">
                <img
                  src="https://www.digitaltrends.com/wp-content/uploads/2021/11/macbook-pro-2021-16.jpg?p=1"
                  alt=""
                  className="h-8 w-8 rounded-full object-fill"
                />
              </td>

              <th
                scope="row"
                className="px-6 py-4 font-medium   whitespace-nowrap"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
