import { useState } from 'react';
import axios from '../hooks/axios';

export default function Logout() {

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const token = await axios.get("/sanctum/csrf-cookie");
            console.log(token)
            const response = await axios.post('/logout');

            // const data = await response.json();
            console.log(response);
            // window.location.href = '/';
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