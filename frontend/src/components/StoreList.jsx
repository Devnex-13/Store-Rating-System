import { FaMapMarkerAlt, FaStar, FaStore } from "react-icons/fa";

function StoreList({ stores, openRating }) {
  if (stores.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 text-center mt-8">
        <h2 className="text-2xl font-semibold text-gray-600">
          No Stores Found
        </h2>

        <p className="text-gray-400 mt-2">Try another search keyword.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      {stores.map((store) => (
        <div
          key={store.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6"
        >
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{store.name}</h2>

              <p className="text-gray-500 flex items-center gap-2 mt-2">
                <FaMapMarkerAlt />

                {store.address}
              </p>
            </div>

            <FaStore size={36} className="text-blue-600" />
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />

              <span className="font-semibold">Average Rating</span>
            </div>

            <h3 className="text-3xl font-bold mt-2">
              {Number(store.averageRating).toFixed(1)}
            </h3>
          </div>

          <div className="mt-6">
            <p className="text-gray-500">Your Rating</p>

            <h3 className="text-xl font-bold">
              {store.userRating ? `${store.userRating} ⭐` : "Not Rated"}
            </h3>
          </div>

          <button
            onClick={() => openRating(store)}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            {store.userRating ? "Update Rating" : "Rate Store"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default StoreList;
