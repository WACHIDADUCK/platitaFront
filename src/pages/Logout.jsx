import { useState } from 'react';
import axios from '../hooks/axios';

export default function Logout() {

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/logout');
            console.log(response);
            window.location.href = '/';
            if (response) {
                sessionStorage.removeItem('user');
            }

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