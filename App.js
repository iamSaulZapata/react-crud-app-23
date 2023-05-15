import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [users, setUsers] = useState([]);

	const [selectedUser, setSelectedUser] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		// Fetch data from Baserow API
		// axios
		// 	.get("https://baserow.io/database/63040/table/164850/rows/", {
		// 		headers: {
		// 			Authorization: "Token qBPLIRiewtp4409iD654Ggbt1UIXbSAA",
		// 		},
		// 	})
		axios({
			url: "https://api.baserow.io",
			headers: {
				Authorization: "Token qBPLIRiewtp4409iD654Ggbt1UIXbSAA",
			},
		})
			.then((response) => {
				setUsers(
					response.data.map((user) => ({
						id: user.id,
						name: user.fields.name,
						email: user.fields.email,
					}))
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleAddUser = () => {
		// Create a new row in the Baserow table
		axios
			.post(
				"https://baserow.io/database/63040/table/164850/rows/",
				{
					name,
					email,
				},
				{
					headers: {
						Authorization: "Token qBPLIRiewtp4409iD654Ggbt1UIXbSAA",
					},
				}
			)
			.then((response) => {
				const newUser = { id: response.data.id, name, email };
				setUsers([...users, newUser]);
				setName("");
				setEmail("");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleUpdateUser = () => {
		// Update an existing row in the Baserow table
		axios
			.put(
				`https://baserow.io/database/63040/table/164850/rows/${selectedUser.id}/`,
				{
					name,
					email,
				},
				{
					headers: {
						Authorization: "Token qBPLIRiewtp4409iD654Ggbt1UIXbSAA",
					},
				}
			)
			.then((response) => {
				const updatedUser = { ...selectedUser, name, email };
				const updatedUsers = users.map((user) =>
					user.id === selectedUser.id ? updatedUser : user
				);
				setUsers(updatedUsers);
				setSelectedUser(null);
				setName("");
				setEmail("");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleDeleteUser = (id) => {
		// Delete a row from the Baserow table
		axios
			.delete(`https://baserow.io/database/63040/table/164850/rows/${id}/`, {
				headers: {
					Authorization: "Token qBPLIRiewtp4409iD654Ggbt1UIXbSAA",
				},
			})
			.then((response) => {
				const filteredUsers = users.filter((user) => user.id !== id);
				setUsers(filteredUsers);
			})
			.catch((error) => {
				console.error(error);
			});
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
