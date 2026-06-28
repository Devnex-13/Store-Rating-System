import { useEffect, useState } from "react";
import API from "../../api/api";
import { toast } from "react-toastify";

function AddStoreModal({ closeModal, loadStores }) {
  const [owners, setOwners] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOwners();
  }, []);

  const loadOwners = async () => {
    try {
      const response = await API.get("/admin/owners");

      setOwners(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      await API.post("/stores", formData);

      toast.success("Store Added Successfully");

      loadStores();

      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add Store</h2>

          <button
            type="button"
            onClick={closeModal}
            className="text-2xl text-gray-500 hover:text-red-600 transition"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold">Store Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Store Name"
              className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold">Store Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Store Email"
              className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold">Address</label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Store Address"
              className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold">Owner</label>

            <select
              name="owner_id"
              value={formData.owner_id}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Owner</option>

              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="
              px-5
              py-2
              border
              rounded-lg
              hover:bg-gray-100
              transition-all
              duration-300
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-2
            rounded-lg
            shadow-md
            hover:shadow-lg
            transition-all
            duration-300
            disabled:bg-gray-400
            disabled:cursor-not-allowed
            "
            >
              {loading ? "Creating..." : "Create Store"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStoreModal;
