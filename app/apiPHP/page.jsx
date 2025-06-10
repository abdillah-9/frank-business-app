"use client"
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [response, setResponse] = useState(null);

/* ********************** OPTION 1-WITHOUT GRAPHQL *********************** */
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Stop page reload

//     try {
//       const res = await fetch('http://localhost:7000/api.php', {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json', // Sending JSON
//         },
//         body: JSON.stringify({ name }), // Send name to PHP
//       });

//       const data = await res.json(); // Wait for JSON back
//       setResponse(data.message); // Set message from PHP
//     } catch (error) {
//       console.error('Error:', error);
//       setResponse('Something went wrong');
//     }
//   };

/* ********************** OPTION 2-WITHOUT GRAPHQL *********************** */
    // function handleSubmit(e) {
    // e.preventDefault(); // Don't reload the page

    // fetch("http://localhost:7000/api.php", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ name }),
    // })
    //     .then((res) => res.json())
    //     .then((data) => {
    //     console.log("Response from PHP:", data);
    //     setResponse(data.message); // You still need this in React to update the UI
    //     })
    //     .catch((err) => {
    //     console.error("Error:", err);
    //     setResponse("Something went wrong");
    //     });
    // }

/* ********************** OPTION 3-WITH GRAPHQL *********************** */
    function handleSubmit(e) {
    e.preventDefault();

    const query = `
        query SayHello($name: String) {
        hello(name: $name)
        }
    `;

    fetch("http://localhost:7000/graphql.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        query,
        variables: { name },
        }),
    })
        .then((res) => res.json())
        .then((data) => {
        console.log("GraphQL response:", data);
        setResponse(data.data.hello);
        })
        .catch((err) => {
        console.error("Error:", err);
        setResponse("Something went wrong");
        });
    }


  return (
    <div style={{ padding: 20 }}>
      <h1>PHP API with Fetch in React</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Send to PHP</button>
      </form>

      {response && <p>Response: {response}</p>}
    </div>
  );
}
