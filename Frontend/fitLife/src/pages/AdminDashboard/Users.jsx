import axios from "axios";
import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const AdminToken = localStorage.getItem("AdminToken");
  const getAllUsers = async () => {
    try {
      const users = await axios.get(
        "http://localhost:3000/api/user/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${AdminToken}`,
          },
        }
      );
      setUsers(users.data);
      console.log(users.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${AdminToken}`,
          },
        }
      );
      getAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black mb-10 mt-10">Users</h1>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs text-gray-700 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>

              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone No
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, i) => {
              return (
                <tr
                  className="bg-white border-b  dark:border-gray-700 text-black hover:text-white hover:bg-black transition dark:hover:bg-black"
                  key={i}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium   whitespace-nowrap"
                  >
                    {item.Name}
                  </th>
                  <td className="px-6 py-4">{item.Email}</td>
                  <td className="px-6 py-4">{item.PhoneNumber}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteUser(item.UserID)}
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

export default Users;
