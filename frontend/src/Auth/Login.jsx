import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    const data = await response.json();
      if (response.ok) {
        // in a full production app, you would save a JWT token here
        alert('Login successful!');
        navigate('/dashboard'); // sends them to the protected pages
        } else {
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error("failed to connect to the server:", error);
        alert("could not connect to the server. make sure your Node Backend is running.");
      }
    };
    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
           <h2>Welcome to Hope for Her</h2>
           <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: '0 auto', gap: '15px' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '10px',  borderRadius: '5px', border: '1px solid #ccc', }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '10px',  borderRadius: '5px', border: '1px solid #ccc', }} 
                />
                <button type="submit" style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#10b981', color: 'white',
                     border: 'none', borderRadius:'5px', fontWeight: 'bold'}}>Login</button>
            </form>
            <p style={{ marginTop: '20px' }}>
                Don't have an account? <a href="/register" style={{ color: '#1d4ed8' }}>Register here</a>
            </p>
        </div>
    );
}