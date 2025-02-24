import { useState } from 'react';
import axios from 'axios';

export default function Logout() {
    const [email, setEmail] = useState('');

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://platita.test/api/logout', {
                email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                withCredentials: true, // Asegúrate de incluir esto
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div>
            <h1>Logout</h1>
            <form onSubmit={handleLogout}>
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
                <button type="submit">Logout</button>
            </form>
        </div>
    );
}