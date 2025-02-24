import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



import { useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useProvider } from '../providers/ContextProvider';

export default function Layout({ children }) {

    const { data: asociaciones, loading, error } = useFetch("https://guillermo.informaticamajada.es/api/asociacion");
    const { data: eventos, loading: loadingEventos, error: errorEventos } = useFetch("https://guillermo.informaticamajada.es/api/evento");

    const { addCampo } = useProvider();

    useEffect(() => {
        if (asociaciones && eventos) {
            addCampo("asociaciones", asociaciones)
            addCampo("eventos", eventos)
        }
    }, [asociaciones, eventos]);


    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}