import { FaTrash, FaUserCircle } from "react-icons/fa";
function UserTable({ users, onDeleteUser }) {
  const badgeColor = (role) => {
    if (role === "admin") {
      return "bg-red-100 text-red-700";
    }

    if (role === "owner") {
      return "bg-green-100 text-green-700";
    }

    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-bold">Users</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4">#</th>

              <th className="text-left px-6 py-4">User</th>

              <th className="text-left px-6 py-4">Email</th>

              <th className="text-left px-6 py-4">Address</th>

              <th className="text-left px-6 py-4">Role</th>

              <th className="text-center px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{index + 1}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FaUserCircle className="text-blue-600" />
                      </div>

                      <div>
                        <p className="font-semibold">{user.name}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">{user.email}</td>

                  <td className="px-6 py-4">{user.address}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(user.role)}`}
                    >
                      {user.role.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => onDeleteUser(user.id)}
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
                      title="Delete User"
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
                    <span className="text-6xl">👥</span>

                    <h3 className="text-xl font-bold mt-3">No Users Found</h3>

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

export default UserTable;
