import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	// This will pull exsiting data from Baserow table 164850
	useEffect(() => {
		// Fetch data from Baserow API when the component mounts
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://api.baserow.io/api/database/rows/table/164850/?user_field_names=true",
					{
						headers: {
							Authorization: "Token pO7KBdur62JLIM8PoczVMgfUDJNodELU",
						},
					}
				);
				const data = await response.json();
				setUsers(data.results);
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

	const handleAddUser = async () => {
		try {
			const response = await fetch(
				"https://api.baserow.io/api/database/rows/table/164850/?user_field_names=true",
				{
					method: "POST",
					headers: {
						Authorization: "Token pO7KBdur62JLIM8PoczVMgfUDJNodELU",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, email }),
				}
			);
			if (response.ok) {
				const data = await response.json();
				setUsers([...users, data]);
				setName("");
				setEmail("");
			} else {
				console.error("Failed to add user.");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdateUser = async () => {
		try {
			const userToUpdate = users.find(
				(user) =>
					user.name === selectedUser.name && user.email === selectedUser.email
			);
			if (!userToUpdate) {
				console.error("User not found.");
				return;
			}

			const response = await fetch(
				`https://api.baserow.io/api/database/rows/table/164850/${userToUpdate.id}/?user_field_names=true/`,
				{
					method: "PATCH",
					headers: {
						Authorization: "Token pO7KBdur62JLIM8PoczVMgfUDJNodELU",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, email }),
				}
			);

			if (response.ok) {
				const updatedUsers = users.map((user) => {
					if (user.id === userToUpdate.id) {
						return { ...user, name, email };
					}
					return user;
				});

				setUsers(updatedUsers);
				setName("");
				setEmail("");
			} else {
				console.error("Failed to update user.");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteUser = async (id) => {
		try {
			const userToDelete = users.find((user) => user.id === id);
			if (!userToDelete) {
				console.error("User not found.");
				return;
			}

			const response = await fetch(
				`https://api.baserow.io/api/database/rows/table/164850/${userToDelete.id}/`,
				{
					method: "DELETE",
					headers: {
						Authorization: "Token pO7KBdur62JLIM8PoczVMgfUDJNodELU",
					},
				}
			);

			if (response.ok) {
				const filteredUsers = users.filter(
					(user) => user.id !== userToDelete.id
				);
				setUsers(filteredUsers);
			} else {
				console.error("Failed to delete user.");
			}
		} catch (error) {
			console.error(error);
		}
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
// Notes
