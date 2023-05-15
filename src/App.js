import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// this is conncted to Baserow but it is only displaying it on the console
const BASE_URL = "https://api.baserow.io/api/database/rows/table/164850/"; // Replace with your own Baserow API URL
const TABLE_ID = 164850; // Replace with your own Baserow table ID
const API_KEY = "qBPLIRiewtp4409iD654Ggbt1UIXbSAA"; // Replace with your own Baserow API key

function App() {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		const users = async () => {
			try {
				const response = await axios.get(`${BASE_URL}${TABLE_ID}/rows/`, {
					headers: {
						Authorization: `Token ${API_KEY}`,
					},
				});
				users(response.data.results);
			} catch (error) {
				console.error(error);
			}
		};

		users();
	}, []);

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

	// original code below
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
