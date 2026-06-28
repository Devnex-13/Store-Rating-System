import { useEffect, useState } from "react";
import API from "../api/api";
import Footer from "../components/layout/Footer";

import Navbar from "../components/layout/Navbar";
import SearchBar from "../components/forms/SearchBar";
import StoreList from "../components/StoreList";
import RatingModal from "../components/forms/RatingModal";

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const response = await API.get(`/stores/user?search=${search}`);

      setStores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openRating = (store) => {
    setSelectedStore(store);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-4xl font-bold">Welcome Back 👋</h1>

        <p className="mt-2 text-blue-100">
          Browse stores and share your ratings.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 mb-8">
      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={loadStores}
        placeholder="Search stores..."
      />
      </div>

      <StoreList stores={stores} openRating={openRating} />

      {selectedStore && (
        <RatingModal
          store={selectedStore}
          closeModal={() => setSelectedStore(null)}
          loadStores={loadStores}
        />
      )}

      <Footer />
    </div>
  );
}

export default UserDashboard;
