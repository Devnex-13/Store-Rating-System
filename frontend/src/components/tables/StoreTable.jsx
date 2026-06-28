import { FaStore } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

function StoreTable({ stores, onDeleteStore }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaStore />
          Stores
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <tr>
              <th className="text-left px-6 py-4">Store</th>

              <th className="text-left px-6 py-4">Email</th>

              <th className="text-left px-6 py-4">Address</th>

              <th className="text-left px-6 py-4">Owner</th>

              <th className="text-left px-6 py-4">Rating</th>

              <th className="text-center px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {stores.length > 0 ? (
              stores.map((store, index) => (
                <tr
                  key={store.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <FaStore className="text-green-600" />
                      </div>

                      <div>
                        <p className="font-semibold">{store.name}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">{store.email}</td>

                  <td className="px-6 py-4">{store.address}</td>

                  <td className="px-6 py-4">{store.ownerName}</td>

                  <td className="px-6 py-4">
                    <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
                      ⭐ {Number(store.averageRating).toFixed(1)}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onDeleteStore(store.id)}
                      className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      p-3
                      rounded-lg
                      shadow
                      transition-all
                      duration-300
                      hover:scale-105
                      "
                      title="Delete Store"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-16 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl">🏪</span>

                    <h3 className="text-xl font-bold mt-3">No Stores Found</h3>

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
  );
}

export default StoreTable;
