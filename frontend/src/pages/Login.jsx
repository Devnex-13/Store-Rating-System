import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import { toast } from "react-toastify";

function Login() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await API.post("/login", {
        email,
        password,
      });

      login(response.data.user, response.data.token);

      toast.success("Login Successful");

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else if (response.data.user.role === "user") {
        navigate("/user");
      } else {
        navigate("/owner");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      // This always runs
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-[420px]">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Store Rating
        </h1>

        <p className="text-center text-gray-500 mt-2">Welcome Back</p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="font-semibold">Email</label>

            <input
              type="email"
              className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>

            <input
              type="password"
              className="w-full border rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-lg
            hover:bg-blue-700
            disabled:bg-gray-400
            disabled:cursor-not-allowed
            transition
            duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-5">
          Don't have an account?
          <Link to="/register" className="text-blue-600 ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
