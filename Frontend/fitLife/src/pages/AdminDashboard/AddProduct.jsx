import React from "react";

function AddProduct() {
  return (
    <div>
      <form>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  "
                placeholder="Product Name"
                required
              />
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2 mt-5">
              <div>
                <label
                  htmlFor="Price"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Price
                </label>
                <input
                  type="text"
                  id="Price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  "
                  required
                />
              </div>

              <div>
                <label
                  for="Category"
                  class="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Category
                </label>
                <select
                  id="Category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 "
                >
                  <option selected disabled>
                    Choose a Category
                  </option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <input
                defaultChecked
                id="checked-checkbox"
                type="checkbox"
                defaultValue
                className="w-4 h-4  bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="checked-checkbox"
                className="ms-2 text-sm font-medium text-black"
              >
                featured
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
              className="block w-full text-sm text-gray-900 border  rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-3"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
            />
          </div>
        </div>
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
