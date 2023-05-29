// api.js

export const fetchData = async () => {
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
		return data.results;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const addhandleAddUser = async (name, email) => {
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
			return data;
		} else {
			console.error("Failed to add user.");
			return null;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
};
