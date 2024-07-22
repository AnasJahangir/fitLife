import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const productToEdit = location.state?.product || {};

  const [productName, setProductName] = useState(
    productToEdit.title || ""
  );
  const [price, setPrice] = useState(productToEdit.price || "");
  const [createCategory, setCreateCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    productToEdit.category_id || ""
  );
  const [featured, setFeatured] = useState(productToEdit.featured || false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    productToEdit.imageUrl || null
  );
  const [description, setDescription] = useState(
    productToEdit.description || ""
  );
  const [showCreateCategoryInput, setShowCreateCategoryInput] = useState(false);

  const [error, setError] = useState("");

  const allCategory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/categories");
      setCategory(response.data);
    } catch (error) {
      setError("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    allCategory();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
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
    const token = localStorage.getItem("AdminToken");
    if (!token) {
      setError("You need to be authenticated.");
      return;
    }

    if (!productName || !price || !selectedCategory || !description) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    if (!image && !imagePreview) {
      setError("Image upload is required.");
      return;
    }

    let featuredData = featured ? 1 : 0;

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("category_id", selectedCategory);
    if (image) formData.append("image", image);
    formData.append("featured", featuredData);
    formData.append("description", description);

    try {
      let response;
      if (productToEdit.id) {
        response = await axios.put(
          `http://localhost:3000/api/products/${productToEdit.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/api/products",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log(response);
      setProductName("");
      setPrice("");
      setFeatured(false);
      setImage(null);
      setImagePreview(null);
      setDescription("");
      // navigate("/products"); // Redirect to products list page after successful add/edit
    } catch (error) {
      setError("Failed to save product. Please try again.");
    }
  };

  const createCategoryFunc = async () => {
    if (createCategory) {
      const token = localStorage.getItem("AdminToken");
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
        setCategory([...category, response.data]);
        setCreateCategory("");
        setShowCreateCategoryInput(false); // Hide input field after category creation
      } catch (error) {
        setError("Failed to create category.");
      }
    } else {
      setError("Category name is required.");
    }
  };

  const handleCreateCategoryClick = () => {
    setShowCreateCategoryInput((prev) => !prev);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="ProductName"
              className="block mb-2 text-sm font-medium text-gray-900"
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

            <div className="mt-5">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                id="message"
                rows={4}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2 items-center mt-5">
              <div className="mt-4">
                <label
                  htmlFor="Price"
                  className="block mb-2 text-sm font-medium text-gray-900"
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
                  className="flex justify-between items-center mb-2 text-sm font-medium text-gray-900"
                >
                  <span>Category</span>
                  <button
                    type="button"
                    className="bg-black text-white p-2 text-[11px] rounded-lg"
                    onClick={handleCreateCategoryClick}
                  >
                    {showCreateCategoryInput ? "Cancel" : "Create Category"}
                  </button>
                </label>

                {showCreateCategoryInput && (
                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      value={createCategory}
                      onChange={(e) => setCreateCategory(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="New Category"
                    />
                    <button
                      type="button"
                      className="bg-black text-white p-2 text-sm rounded-lg ml-2"
                      onClick={createCategoryFunc}
                    >
                      Add
                    </button>
                  </div>
                )}

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
                  {category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
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
              className="block mb-2 text-sm font-medium text-gray-900"
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
              required={!imagePreview}
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
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="text-white bg-black focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {productToEdit.id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
