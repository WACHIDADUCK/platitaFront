export const ContextReducer = (state, action) => {
    switch (action.type) {
        case "AGREGAR_PREGUNTA":
            return { 
                ...state, 
                questions: [...state.questions, {...action.payload, id: state.nextId} ], 
                nextId: state.nextId + 1 
            };
        case "BORRAR_PREGUNTA":
            return { 
                ...state, 
                questions: state.questions.filter(question => question.id !== action.payload) }
        default:
            return state;
    }
}