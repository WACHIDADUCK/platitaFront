import { useState } from 'react';

export default function Logout() {
    const [email, setEmail] = useState('');

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://platita.test/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email,
                }),
                credentials: 'include' // Asegúrate de incluir esto
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al cerrar sesión: ${errorText}`);
            }

            const data = await response.json();
            console.log(data);
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