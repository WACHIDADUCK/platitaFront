
export const ContextReducer = (state, action) => {
    switch (action.type) {

        case "AGREGAR_CAMPO":
            return {
                ...state,
                [action.campo]: action.payload.data,
            };

        case "AGREGAR_EVENTOS":
            return {
                ...state,
                eventos: [action.payload],
            };

        case "AGREGAR_ASOCIACIONES":
            return {
                ...state,
                asociaciones: [action.payload],
            };

        case "EJEMPLO_BORRAR_PREGUNTA":
            return {
                ...state,
                questions: state.questions.filter(question => question.id !== action.payload)
            }
        case "EJEMPLO":
            return {
                ...state,
                questions: [...state.questions, { ...action.payload, id: state.nextId }],
                nextId: state.nextId + 1
            };
        default:
            return state;
    }
}