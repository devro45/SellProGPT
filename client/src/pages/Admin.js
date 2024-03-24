import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminTab from "../components/Admin/AdminTab";
import { isAuthenticated } from "../apiCalls/auth";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = isAuthenticated().user;
    if (!(isAuthenticated() && user && user.role === 1)) {
      navigate("/products");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen mt-20">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex justify-center mb-4">
            <div className="flex flex-col">
              <button
                className="px-4 py-2 bg-red-700 text-white rounded-lg focus:outline-none focus:bg-green-100 focus:text-green-800"
                disabled
              >
                Verified Products
              </button>
              <div className="bg-gray-800 rounded-lg p-4">
                <AdminTab verified={true} />
              </div>
              <button
                className="px-4 py-2 bg-green-700 text-white rounded-lg mt-4 focus:outline-none focus:bg-green-100 focus:text-green-800"
                disabled
              >
                Unverified Products
              </button>
              <div className="bg-gray-800 rounded-lg p-4 ">
                <AdminTab verified={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
