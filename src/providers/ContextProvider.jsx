import { createContext, useReducer, useContext } from "react";
import { ContextReducer } from './ContextReducer';

const Context = createContext();
export const useProvider = () => useContext(Context);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ContextReducer, {});


    const addCampo = (campo, array) => {
        dispatch({ type: "AGREGAR_CAMPO", campo: campo, payload: array });
    };

    const filtrarEventosAcreditados = () => {
        if (state.eventos) {
            return state.eventos.filter(evento => evento.asociacions.every(asociacion => asociacion.acreditado));
        }
    };

    return (
        <Context.Provider value={{ state, addCampo, filtrarEventosAcreditados }}>
            {children}
        </Context.Provider>
    );
};