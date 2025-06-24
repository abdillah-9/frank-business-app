'use client';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState(null);

  // 🟢 GraphQL Mutation
  const createUser = async () => {
    const mutation = `
      mutation CreateUser($name: String!, $email: String!) {
        createUser(name: $name, email: $email) {
          id
          name
          email
        }
      }
    `;

    try {
      const res = await fetch('http://localhost/myAPIs/testingApp/graphql.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation, variables: { name, email } }),
      });
      const data = await res.json();
      setResponse(data.data.createUser);
    } catch (error) {
      setResponse({ error: error.message });
    }
  };

  // 🔵 GraphQL Query with improved error handling
  const sayBye = async () => {
    const query = `
      query SayHello($name: String) {
        bye(name: $name)
      }
    `;

    try {
      const res = await fetch('http://localhost/myAPIs/testingApp/graphql.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { name } }),
      });

      const data = await res.json();
      console.log("GraphQL sayBye response:", data);

      if (data.errors) {
        setResponse({ error: data.errors[0].message });
      } else if (data.data && data.data.bye) {
        setResponse(data.data.bye);
      } else {
        setResponse({ error: "No data received from server" });
      }
    } catch (error) {
      setResponse({ error: error.message });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>GraphQL Demo (PHP + Supabase)</h1>

      <input
        type="text"
        value={name}
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        value={email}
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={createUser}>Create User (Mutation)</button>
        <button onClick={sayBye}>Say Bye (Query)</button>
      </div>

      {response && (
        <div style={{ marginTop: 20 }}>
          <h3>Response:</h3>
          <pre>
            {typeof response === 'string'
              ? response
              : JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
