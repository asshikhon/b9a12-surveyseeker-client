import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { MdDeleteForever } from "react-icons/md";
import user from "../../../assets/images/users.png";
import { useState } from "react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRole, setSelectedRole] = useState("all");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleChangeRole = (user, newRole) => {
    axiosSecure
      .patch(`/users/role/${user._id}`, { role: newRole })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top",
            icon: "success",
            title: `${user.name} is now a ${newRole}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${user?.name} has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };

  const filteredUsers = selectedRole === "all" ? users : users.filter(user => user.role === selectedRole);

  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href={user} />
        <title>Manage Users || Dashboard</title>
      </Helmet>
      <h2 className="text-3xl">All Dashboard Users : ({filteredUsers.length})</h2>

      <div className="my-4 bg-[#333333] rounded-xl py-4 text-center text-lg text-orange-500 font-bold">
        <label className="mr-2">Filter by role:</label>
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="p-2 border rounded">
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="surveyor">Surveyor</option>
          <option value="pro-user">Pro-User</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="overflow-x-auto p-4 md:p-10">
        <table className="table table-zebra">
          <thead className="text-white bg-orange-500">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img referrerPolicy="no-referrer" src={user?.photo} alt="User Avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  <div className="badge bg-orange-500 py-4 min-w-[73px]">{user?.role}</div>
                </td>
                <td>
                  <select
                    onChange={(e) => handleChangeRole(user, e.target.value)}
                    defaultValue={user?.role || "Change Role"}
                  >
                    <option value="Change Role" disabled>
                      Change Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="surveyor">Surveyor</option>
                    <option value="pro-user">Pro-User</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn rounded-xl bg-red-600 p-2 text-white"
                  >
                    <MdDeleteForever className="text-2xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
