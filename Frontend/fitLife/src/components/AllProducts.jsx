import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { EcommerceCard } from "./Card";
import { Button } from "@material-tailwind/react";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit] = useState(50);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const initialized = useRef(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      console.log("Initial fetch");
      fetchProducts(0);
      initialized.current = true;
    }
  }, []);

  const fetchProducts = async (currentOffset) => {
    console.log("Fetching products with offset:", currentOffset);
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/products", {
        params: {
          limit,
          offset: currentOffset,
          search,
          // categoryId: "categoryIdExample", // Replace with your actual category ID if needed
        },
      });
      const newProducts = response.data;
      console.log("Fetched products:", newProducts);
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setHasMore(newProducts.length === limit);
      setOffset(currentOffset + limit);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchProducts(offset);
    }
  };
  const searchButton = () => {
    setProducts([]); // Clear current products
    setOffset(0); // Reset offset
    fetchProducts(); 
  };

  return (
    <div className="my-20 px-20">
      <h1 className="text-[60px] font-bold text-center my-10">All Products</h1>
      <div className="flex justify-between">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search products..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        <Button
          onClick={searchButton}
          className="bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Search
        </Button>
      </div>
      <div className="flex justify-between items-center flex-wrap">
        {products.map((product, i) => (
          <div className="w-[30%] mt-10" key={i}>
            <EcommerceCard item={product} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        {loading && <div>Loading...</div>}
        {hasMore && !loading && (
          <Button
            onClick={loadMore}
            className="bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
