import { createContext, useReducer, useContext } from "react";
import { ContextReducer } from './ContextReducer';

const QuestionsContext = createContext();
export const useQuestions = () => useContext(QuestionsContext);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ContextReducer, { questions: [], nextId: 1 });

    const addQuestion = nuevaPregunta => {
        dispatch({ type: "AGREGAR_PREGUNTA", payload: nuevaPregunta });
    };

    const deleteQuestion = id => {
        dispatch({ type: "BORRAR_PREGUNTA", payload: id });
    };

    return (
        <QuestionsContext.Provider value={{ questions: state.questions, addQuestion, deleteQuestion }}>
            {children}
        </QuestionsContext.Provider>
    );
};