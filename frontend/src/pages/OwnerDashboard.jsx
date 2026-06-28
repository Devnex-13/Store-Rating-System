import { useEffect, useState } from "react";
import API from "../api/api";
import Footer from "../components/layout/Footer";

import Navbar from "../components/layout/Navbar";

function OwnerDashboard() {
  const [dashboard, setDashboard] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await API.get("/owner/dashboard");

      setDashboard(response.data.dashboard);

      setRatings(response.data.ratings);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Store Owner Dashboard</h1>

          <p className="text-gray-500 mt-2">
            Monitor your store's performance and customer reviews.
          </p>
        </div>

        {dashboard.map((store) => (
          <div key={store.id} className="grid md:grid-cols-3 gap-6 mt-8">
            <div
              className="bg-white
              rounded-2xl
              shadow-xl
              hover:shadow-2xl
              hover:-translate-y-1
              transition-all 
              rounded-xl 
              shadow-md 
              p-6"
            >
              <h3 className="text-gray-500">Store Name</h3>

              <h2 className="text-2xl font-bold mt-2">{store.storeName}</h2>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500">Average Rating</h3>

              <h2 className="text-4xl font-bold text-yellow-500 mt-2">
                ⭐ {Number(store.averageRating).toFixed(1)}
              </h2>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500">Total Ratings</h3>

              <h2 className="text-4xl font-bold text-blue-600 mt-2">
                {store.totalRatings}
              </h2>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-xl shadow-md mt-10 overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">Customer Ratings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <tr>
                  <th className="text-left px-6 py-4">Customer</th>

                  <th className="text-left px-6 py-4">Email</th>

                  <th className="text-left px-6 py-4">Rating</th>
                </tr>
              </thead>

              <tbody>
                {ratings.length > 0 ? (
                  ratings.map((rating, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{rating.name}</td>

                      <td className="px-6 py-4">{rating.email}</td>

                      <td className="px-6 py-4">⭐ {rating.rating}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-6xl">⭐</span>

                        <h3 className="text-xl font-bold mt-3">
                          No Ratings Found
                        </h3>

                        <p className="text-gray-500 mt-2">
                          Try another search keyword.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default OwnerDashboard;
