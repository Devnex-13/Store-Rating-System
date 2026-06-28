import { useState } from "react";
import API from "../../api/api";
import { toast } from "react-toastify";

function AddUserModal({ closeModal, loadUsers }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.post("/admin/users", formData);

      toast.success("User Created Successfully");

      loadUsers();

      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create User</h2>

          <button
            type="button"
            onClick={closeModal}
            className="text-gray-500 hover:text-red-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="role"
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="user">User</option>

            <option value="admin">Admin</option>

            <option value="owner">Store Owner</option>
          </select>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="
                px-5
                py-2
                rounded-lg
                border
                hover:bg-gray-100
                transition
                duration-300
                "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                bg-gradient-to-r
              from-blue-600
              to-indigo-600
              hover:from-blue-700
              hover:to-indigo-700
                text-white
                px-6
                py-2
                rounded-lg
                hover:bg-blue-700
                shadow-md
                hover:shadow-lg
                transition-all
                duration-300
                disabled:bg-gray-400
                disabled:cursor-not-allowed
                "
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserModal;
