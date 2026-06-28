import { useEffect, useState } from "react";
import API from "../api/api";

import Navbar from "../components/layout/Navbar";
import DashboardCard from "../components/cards/DashboardCard";
import SearchBar from "../components/forms/SearchBar";
import UserTable from "../components/tables/UserTable";
import AddUserModal from "../components/forms/AddUserModal";
import StoreTable from "../components/tables/StoreTable";
import AddStoreModal from "../components/forms/AddStoreModal";
import { FaUsers, FaStore, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import Footer from "../components/layout/Footer";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [stores, setStores] = useState([]);
  const [showStoreModal, setShowStoreModal] = useState(false);

  const loadDashboard = async () => {
    try {
      const response = await API.get("/admin/dashboard");

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await API.get(`/admin/users?search=${search}`);

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadStores = async () => {
    try {
      const response = await API.get("/stores/admin");

      setStores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id) => {

    if (!window.confirm("Are you sure you want to delete this user?")) {
        return;
    }

    try {

        await API.delete(`/admin/users/${id}`);

        toast.success("User deleted successfully");

        loadUsers();
        loadDashboard();

    } catch (error) {

        toast.error(
            error.response?.data?.message || "Failed to delete user"
        );

    }

};

const handleDeleteStore = async (id) => {

    if (!window.confirm("Are you sure you want to delete this store?")) {
        return;
    }

    try {

        await API.delete(`/stores/${id}`);

        toast.success("Store deleted successfully");

        loadStores();
        loadDashboard();

    } catch (error) {

        toast.error(
            error.response?.data?.message || "Failed to delete store"
        );

    }

};

  useEffect(() => {
    loadDashboard();
    loadUsers();
    loadStores();
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Heading */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>

          <p className="text-gray-500 mt-2">
            Manage users, stores and ratings from one place.
          </p>
        </div>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <DashboardCard
            title="Total Users"
            value={dashboard.totalUsers}
            icon={<FaUsers />}
            color="#2563EB"
            description="Registered Users"
          />

          <DashboardCard
            title="Total Stores"
            value={dashboard.totalStores}
            icon={<FaStore />}
            color="#16A34A"
            description="Available Stores"
          />

          <DashboardCard
            title="Total Ratings"
            value={dashboard.totalRatings}
            icon={<FaStar />}
            color="#F59E0B"
            description="Submitted Ratings"
          />
        </div>

        {/* Search + Buttons */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
          <div className="w-full lg:w-1/2">
            <SearchBar
              search={search}
              setSearch={setSearch}
              onSearch={loadUsers}
              placeholder="Search users..."
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md"
            >
              + Add User
            </button>

            <button
              onClick={() => setShowStoreModal(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-md"
            >
              + Add Store
            </button>
          </div>
        </div>

        {/* Users */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Users</h2>

          <UserTable users={users} onDeleteUser={handleDeleteUser} />
        </div>

        {/* Stores */}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Stores</h2>

          <StoreTable stores={stores} onDeleteStore={handleDeleteStore} />
        </div>

        {showModal && (
          <AddUserModal
            closeModal={() => setShowModal(false)}
            loadUsers={loadUsers}
          />
        )}

        {showStoreModal && (
          <AddStoreModal
            closeModal={() => setShowStoreModal(false)}
            loadStores={loadStores}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
