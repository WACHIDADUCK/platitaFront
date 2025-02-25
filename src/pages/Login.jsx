import { useState } from 'react';
import axios from '../hooks/axios';
import { useProvider } from '../providers/ContextProvider';


export default function Login() {
    const { state, addCampo } = useProvider();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.get("/sanctum/csrf-cookie");
            const response = await axios.post('/login', { email, password });
            console.log(response);



            const user = await axios.get(`/api/user`);
            // console.log(response.data);
            // Guardar el usuario en el sessionStorage
            sessionStorage.setItem('user', JSON.stringify(user.data));


            window.location.href = '/';
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };


    //ACCEDER A DATOS DEL USUARIO
    const user = JSON.parse(sessionStorage.getItem('user'));
    const idUser = user ? user.id : null;
    console.log(user)  ;

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