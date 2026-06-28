import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
    FaStore,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        if (!window.confirm("Are you sure you want to logout?"))
            return;

        logout();

        navigate("/login");

    };

    const getRoleColor = () => {

        switch (user?.role) {

            case "admin":
                return "bg-red-100 text-red-700";

            case "owner":
                return "bg-green-100 text-green-700";

            default:
                return "bg-blue-100 text-blue-700";

        }

    };

    return (

        <nav className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 shadow-lg">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

                {/* Left */}

                <div className="flex items-center gap-4">

                    <div className="bg-white p-3 rounded-full shadow">

                        <FaStore
                            size={26}
                            className="text-blue-700"
                        />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-white">

                            Store Rating System

                        </h1>

                        <p className="text-blue-100 text-sm">

                            Dashboard

                        </p>

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-6">

                    <div className="flex items-center gap-3">

                        <FaUserCircle
                            size={42}
                            className="text-white"
                        />

                        <div>

                            <p className="text-white font-semibold">

                                {user?.name}

                            </p>

                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getRoleColor()}`}>

                                {user?.role?.toUpperCase()}

                            </span>

                        </div>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-white text-red-600 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition duration-300 shadow-md"
                    >

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;