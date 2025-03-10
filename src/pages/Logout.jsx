import axios from '../hooks/axios';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/logout');
            console.log(response);

            if (response) {
                sessionStorage.removeItem('user');
            }
            navigate('/');
            navigate(0);
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