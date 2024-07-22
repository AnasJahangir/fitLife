import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const AdminToken = localStorage.getItem("AdminToken");

 
  console.log(AdminToken);
  const fetchData = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        axios.get("http://localhost:3000/api/products"),
        axios.get("http://localhost:3000/api/categories"),
      ]);

      setProducts(productsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});
  const deleteProduct = async (productId) => {
    console.log(productId);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${AdminToken}`,
          },
        }
      );
      alert("Product deleted successfully");
      fetchData(); // Refresh the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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
            {products.map((item, i) => {
              return (
                <tr
                  className="bg-white border-b  dark:border-gray-700 text-black hover:text-white hover:bg-black transition dark:hover:bg-black"
                  key={i}
                >
                  <td className="px-6 py-4">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="h-8 w-8 rounded-full object-fill"
                    />
                  </td>

                  <th
                    scope="row"
                    className="px-6 py-4 font-medium   whitespace-nowrap"
                  >
                    {item.title}
                  </th>
                  <td className="px-6 py-4">
                    {item.category_id ? categoryMap[item.category_id] : "N/A"}
                  </td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteProduct(item.id)}
                      className="font-medium bg-red-600 text-white p-2 rounded-md"
                    >
                      Delete
                    </button>
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

export default Products;
