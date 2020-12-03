import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Test() {

    const [users, setUsers] = useState(null);

	const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  
	useEffect(() => {
		axios
			.get("/api/users")
			.then((users) =>{
        console.log("Users from api: ", users.data)
        setUsers(users.data)
      })
			.catch((err) => console.log(err));
	}, []);

	function submitForm(event) {
    // event.preventDefault();
    console.log("Name: ", username, " --- ", "Email: ", email)
		if (username === "") {
			alert("Please fill the username field");
			return;
		}
		if (email === "") {
			alert("Please fill the email field");
			return;
		}
		axios
			.post("/api/users", {
				name: username,
				email: email,
			})
			.then(function () {
				alert("Account created successfully");
				// window.location.reload();
			})
			.catch(function() {
				alert("Could not creat account. Please try again");
      });
	}
	return (
		<>
			<h1>Fly-Line</h1>
			{users === null ? (
        <>
        {console.log("users before loading: ", users)}
				<p>Loading...</p>
        </>
			) : (users.length === 0 ? (
        <>
        <p>No user available</p>
        {console.log("users in userlength: ", users)}
        </>
			) : (
				<>
					<h2>Available Users</h2>
          {console.log("users before map: ", users)}
					<ol>
						{users.map((user, index) => (
							<li key={index}>
								Name: {user.name} - Email: {user.email}
							</li>
						))}
					</ol>
				</>
			))}

			<form onSubmit={submitForm}>
				<input
					onChange={(e) => {
            console.log("Username event: ", e.target.value)
            setUsername(e.target.value)}
          }
					type="text"
					placeholder="Enter your username"
				/>
				<input
					onChange={(e) => {
            console.log("Email event: ", e.target.value)
            setEmail(e.target.value)}}
					type="text"
					placeholder="Enter your email address"
				/>
				<input type="submit" />
			</form>
		</>
	);
}