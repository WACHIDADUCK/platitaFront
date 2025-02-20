import { useState } from 'react';
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default function Logout() {

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            //await axios.get("http://platita.test/sanctum/csrf-cookie", { withCredentials: true });
            const response = await axios.post('http://platita.test/logout');

            // const data = await response.json();
            console.log(response);
            window.location.href = '/';
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div>
            <h1>Logout</h1>
            <form onSubmit={handleLogout}>
                <button type="submit">Logout</button>
            </form>
        </div>
    );
}