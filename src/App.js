import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [users, setUsers] = useState(
		JSON.parse(localStorage.getItem("users")) || [
			{ id: 1, name: "John", email: "john@example.com" },
			{ id: 2, name: "Jane", email: "jane@example.com" },
			{ id: 3, name: "Bob", email: "bob@example.com" },
		]
	);

	const [selectedUser, setSelectedUser] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		localStorage.setItem("users", JSON.stringify(users));
	}, [users]);

	const handleAddUser = () => {
		const newUser = { id: Date.now(), name, email };
		setUsers([...users, newUser]);
		setName("");
		setEmail("");
	};

	const handleUpdateUser = () => {
		const updatedUser = { ...selectedUser, name, email };
		const updatedUsers = users.map((user) =>
			user.id === selectedUser.id ? updatedUser : user
		);
		setUsers(updatedUsers);
		setSelectedUser(null);
		setName("");
		setEmail("");
	};

	const handleDeleteUser = (id) => {
		const filteredUsers = users.filter((user) => user.id !== id);
		setUsers(filteredUsers);
	};

	const handleEditUser = (id) => {
		const user = users.find((user) => user.id === id);
		setSelectedUser(user);
		setName(user.name);
		setEmail(user.email);
	};

	return (
		<div className="top-div">
			<h1>Users</h1>
			{
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
			}

			<h2>{selectedUser ? "Edit User" : "Add User"}</h2>
			<div className="last-div">
				<label>Name:</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="last-div">
				<label>Email:</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="last-div">
				{selectedUser ? (
					<button onClick={handleUpdateUser}>Update User</button>
				) : (
					<button onClick={handleAddUser}>Add User</button>
				)}
			</div>
		</div>
	);
}

export default App;
