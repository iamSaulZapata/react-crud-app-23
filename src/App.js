import React, { useState, useEffect } from "react";

function App() {
	const [users, setUsers] = useState([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		const storedUsers = localStorage.getItem("users");
		if (storedUsers) {
			setUsers(JSON.parse(storedUsers));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("users", JSON.stringify(users));
	}, [users]);

	const handleAddUser = () => {
		const newUser = { id: Date.now(), name, email };
		setUsers([...users, newUser]);
		setName("");
		setEmail("");
	};

	const handleDeleteUser = (id) => {
		const filteredUsers = users.filter((user) => user.id !== id);
		setUsers(filteredUsers);
	};

	return (
		<div>
			<h1>Users</h1>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						{user.name} ({user.email}){" "}
						<button onClick={() => handleDeleteUser(user.id)}>Delete</button>
					</li>
				))}
			</ul>
			<h2>Add User</h2>
			<div>
				<label>Name:</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div>
				<label>Email:</label>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<button onClick={handleAddUser}>Add User</button>
			</div>
		</div>
	);
}

export default App;
