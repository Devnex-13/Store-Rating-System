import { useState } from "react";
import API from "../../api/api";
import { toast } from "react-toastify";

function RatingModal({ store, closeModal, loadStores }) {
  const [rating, setRating] = useState(store.userRating || 1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (store.userRating) {
        await API.put(`/ratings/${store.id}`, {
          rating,
        });
      } else {
        await API.post("/ratings", {
          storeId: store.id,
          rating,
        });
      }

      toast.success("Rating Saved Successfully");

      loadStores();

      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <h2>{store.name}</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-3 text-4xl my-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`transition-all duration-200 hover:scale-125 ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <p className="text-center text-gray-600 mb-6">
          Selected Rating
          <span className="font-bold text-blue-600 ml-2">{rating} / 5</span>
        </p>

        <br />
        <br />

        <button
    type="submit"
    disabled={loading}
    className="
        bg-blue-600
        hover:bg-blue-700
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
          {loading ? "Saving..." : "Save Rating"}
        </button>

        <button
    type="button"
    onClick={closeModal}
    className="
        border
        px-6
        py-2
        rounded-lg
        hover:bg-gray-100
        transition-all
        duration-300
        ml-4
    "
>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default RatingModal;
