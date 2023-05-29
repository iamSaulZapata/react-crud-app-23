// UserList.js

import React from "react";

const UserList = ({ users, handleEditUser, handleDeleteUser }) => {
	return (
		<ul>
			{users.map((user) => (
				<li key={user.id}>
					{user.name} ({user.email}){" "}
					<button
						className="edit-button"
						onClick={() => handleEditUser(user.id)}>
						Edit
					</button>{" "}
					<button
						className="delete-button"
						onClick={() => handleDeleteUser(user.id)}>
						Delete
					</button>
				</li>
			))}
		</ul>
	);
};

export default UserList;
