import axios from "axios";
import React, { useEffect, useState } from "react";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [createCategory, setCreateCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState(null);
  const [addcategory, setAddcategory] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const allCategory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/categories");
      console.log(response);
      setCategory(response.data);
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Failed to create category.");
    }
  };
  useEffect(() => {
    allCategory();
  }, []);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB.");
        return;
      }
      setError("");
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("AdminToken"); // Retrieve the token from localStorage or any other secure storage
    if (!token) {
      setError("You need to be authenticated to create a category.");
      return;
    }
    // Client-side validation
    if (!productName || !price || !selectedCategory) {
      setError("All fields are required.");
      return;
    }

    // Check if price is a valid number
    if (isNaN(price) || price <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    if (!image) {
      setError("Image upload is required.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("category", selectedCategory);
    formData.append("image", image);
    formData.append("featured", featured);
    console.log(productName, price, selectedCategory, image, featured);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/products",
        formData,
        {
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setProductName("");
      setPrice("");
      setCategory("");
      setFeatured(false);
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      setError("Failed to add product. Please try again.");
    }
  };

  const createCatogoryFunc = async () => {
    if (addcategory) {
      setAddcategory(false);
    } else if (createCategory) {
      const token = localStorage.getItem("AdminToken"); // Retrieve the token from localStorage or any other secure storage
      if (!token) {
        setError("You need to be authenticated to create a category.");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:3000/api/categories",
          { name: createCategory },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Error creating category:", error);
        setError("Failed to create category.");
      } finally {
        setAddcategory(true);
      }
    } else {
      setError("Category name is required.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <div>
              <label
                htmlFor="ProductName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Product Name
              </label>
              <input
                type="text"
                id="ProductName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Product Name"
                required
              />
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2 items-center mt-5">
              <div className="mt-4">
                <label
                  htmlFor="Price"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Price
                </label>
                <input
                  type="text"
                  id="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="$"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="Category"
                  className="flex justify-between items-center mb-2 text-sm font-medium text-gray-900 "
                >
                  <span>Category</span>
                  <button
                    type="button"
                    className="bg-black text-white p-2 text-[11px] rounded-lg"
                    onClick={createCatogoryFunc}
                  >
                    {`${addcategory ? "Create" : "Add"} Category`}
                  </button>
                </label>
                {addcategory ? (
                  <select
                    id="Category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
                  >
                    <option value="" disabled>
                      Choose a Category
                    </option>
                    {category.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={createCategory}
                    onChange={(e) => setCreateCategory(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    required
                    placeholder="Enter category name"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="featured"
                className="ms-2 text-sm font-medium text-black"
              >
                Featured
              </label>
            </div>
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              htmlFor="user_avatar"
            >
              Upload image
            </label>
            <input
              className="block w-full text-sm border rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:placeholder-gray-400 p-3"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
              onChange={handleImageUpload}
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-4 w-full h-64 object-cover rounded-lg"
              />
            )}
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
