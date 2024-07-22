import React, { useContext, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import Logo from "../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../config/Context/UserContext";
import { useCart } from "../config/Context/CartContext";
function Navbar() {
  const [profile, setProfile] = useState(false);
  const [cart, setCart] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { state, dispatch } = useCart();

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };
  const { user, logout } = useContext(UserContext);
  const location = useLocation();

  const getLinkClass = (path) => {
    return `block py-2 px-3 rounded ${
      location.pathname === path
        ? "bg-black text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700"
    }`;
  };
  return (
    <div>
      <nav className="bg-gray-300 border-gray-200 relative w-[100%]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="w-14" alt="Flowbite Logo" />
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="md:me-5">
              <div className="flex  justify-center">
                <div className="">
                  <div
                    className="flex flex-row cursor-pointer truncate p-2  rounded"
                    onClick={() => {
                      setCart(!cart);
                      setProfile(false);
                    }}
                  >
                    <div />
                    <div className="flex flex-row-reverse ml-2 w-full">
                      <div slot="icon" className="relative">
                        <div className="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white">
                          {state.cart.length}
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-shopping-cart w-6 h-6 mt-2"
                        >
                          <circle cx={9} cy={21} r={1} />
                          <circle cx={20} cy={21} r={1} />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${
                      !cart && "hidden"
                    } absolute h-64 w-64 right-1 rounded-b  border-t-0 z-10 top-[100%]`}
                  >
                    <div className="shadow-xl ">
                      {state.cart.length === 0 ? (
                        <p className="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100 text-center">No items in cart</p>
                      ) : (
                        <div>
                          {state.cart.map((item,i) => (
                            <div
                              className="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                              key={i}
                            >
                              <div className="p-2 w-12">
                                <img src={item.imageUrl} alt="img product" />
                              </div>
                              <div className="flex-auto text-sm w-32">
                                <div className="font-bold">{item.title}</div>
                                <div className="truncate">
                                  {item.description}
                                </div>
                                <div className="text-gray-400">Qt: {item.quantity}</div>
                              </div>
                              <div className="flex flex-col w-18 font-medium items-end">
                                <div
                                  className="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    height="100%"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-trash-2 "
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    <line x1={10} y1={11} x2={10} y2={17} />
                                    <line x1={14} y1={11} x2={14} y2={17} />
                                  </svg>
                                </div>
                                ${item.price}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>

            {user && (
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-300 rounded-full md:me-0 "
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                  onClick={() => {
                    setProfile(!profile);
                    setCart(false);
                  }}
                >
                  <span className="sr-only">Open user menu</span>

                  <IoPersonCircle className="w-8 h-8 rounded-full " />
                </button>
                {/* Dropdown menu */}
                <div
                  className={`z-50 ${
                    !profile && "hidden"
                  } absolute  top-16 right-1 my-4 text-base bg-white list-none  divide-y divide-gray-100 rounded-lg shadow-lg `}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-black">
                      {user.Name}
                    </span>

                    <span className="block text-sm   truncate text-gray-700">
                      {user.Email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        onClick={() => {
                          logout();
                          setProfile(false);
                        }}
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {!user && (
              <div>
                <Link
                  to={"/register"}
                  className="bg-black text-white text-[10px]  md:text-[16px] font-bold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Register Now
                </Link>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              onClick={() => setMobile(!mobile)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              !mobile && "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col md:flex-row font-medium p-4 md:p-0  rounded-lg md:space-x-8 rtl:space-x-reverse">
              <li>
                <Link
                  to="/"
                  className={getLinkClass("/")}
                  aria-current={location.pathname === "/" ? "page" : undefined}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className={getLinkClass("/about-us")}
                  aria-current={
                    location.pathname === "/about-us" ? "page" : undefined
                  }
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact-us"
                  className={getLinkClass("/contact-us")}
                  aria-current={
                    location.pathname === "/contact-us" ? "page" : undefined
                  }
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
