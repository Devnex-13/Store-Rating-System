import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {

    setLoading(true);

    try {

        await API.post("/register", data);

        toast.success("Registration Successful");

        navigate("/login");

    } catch (error) {

        toast.error(
            error.response?.data?.message || "Registration Failed"
        );

    } finally {

        setLoading(false);

    }

};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-[450px]">
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Store Rating
        </h1>

        <p className="text-center text-gray-500 mt-2">Create New Account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
          <div>
            <label className="font-semibold">Name</label>

            <input
              placeholder="Full Name"
              {...register("name", {
                required: "Name is required",

                minLength: {
                  value: 3,

                  message: "Minimum 3 characters",
                },
              })}
              className="w-full border rounded-lg p-3 mt-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Email</label>

            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border rounded-lg p-3 mt-2"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid Email",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold">Address</label>

            <input
              type="text"
              placeholder="Enter Address"
              className="w-full border rounded-lg p-3 mt-2"
              {...register("address", {
                required: "Address is required",
              })}
            />

            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold">Password</label>

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border rounded-lg p-3 mt-2"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                  message:
                    "Password must contain 8+ characters, uppercase, lowercase, number and special character",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
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
            transition-all
            duration-300
            "
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
