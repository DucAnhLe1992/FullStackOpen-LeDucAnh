import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {[...users]
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
