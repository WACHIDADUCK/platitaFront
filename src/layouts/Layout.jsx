import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useProvider } from '../providers/ContextProvider';

export default function Layout() {
    const { state, addCampo } = useProvider();
    const url = { data: "https://guillermo.informaticamajada.es" };

    const { data: asociaciones, loading, error } = useFetch(`${url.data}/api/asociacion`);
    const { data: eventos, loading: loadingEventos, error: errorEventos } = useFetch(`${url.data}/api/evento`);

    useEffect(() => {
        if (asociaciones && eventos) {
            addCampo("asociaciones", asociaciones);
            addCampo("eventos", eventos);
            addCampo("url", url); // <----------------- CAMBIAR URL PARA EL SERVIDOR
        }
    }, [asociaciones, eventos]);

    useEffect(() => {
        if (!state.url) {
            addCampo("url", url);
        }
    }, [state.url, addCampo, url]);


    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}