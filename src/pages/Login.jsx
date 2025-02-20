import { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.get("http://platita.test/sanctum/csrf-cookie");
            const response = await axios.post('http://platita.test/login', { email, password });
            console.log(response);

            const comprobar = await axios.get("http://platita.test/api/user");
            console.log(comprobar);

            window.location.href = '/';
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}