
import { useQuestions } from "../providers/QuestionsProvider";

export default function Pregunta({pregunta, borrarPregunta , dispatch}) {

    const { deleteQuestion } = useQuestions();


    return (
        <div className="card border" style={{width: "18rem"}}  >
            <button type="button" className="align-baseline btn-close " aria-label="Close" 
            onClick={() => deleteQuestion(pregunta.id)}
            >Borrar</button>
            <div className="card-body ">              
                <h5 className="card-title">Pregunta nº{pregunta.id}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{pregunta.enunciado}</h6>
                <div className="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
                <input type="radio" className="btn-check" name="btn-respuesta" id={`${pregunta.id}vbtn-radio1"`} autoComplete="off"></input>
                <label className="btn btn-outline-danger" htmlFor={`${pregunta.id}vbtn-radio1"`}>{pregunta.respuesta1}</label>
                <input type="radio" className="btn-check" name="btn-respuesta" id={`${pregunta.id}vbtn-radio2"`} autoComplete="off"></input>
                <label className="btn btn-outline-danger" htmlFor={`${pregunta.id}vbtn-radio2"`}>{pregunta.respuesta2}</label>
                <input type="radio" className="btn-check" name="btn-respuesta" id={`${pregunta.id}vbtn-radio3"`} autoComplete="off"></input>
                <label className="btn btn-outline-danger" htmlFor={`${pregunta.id}vbtn-radio3"`}>{pregunta.respuesta3}</label>
                <input type="radio" className="btn-check" name="btn-respuesta" id={`${pregunta.id}vbtn-radio4"`} autoComplete="off"></input>
                <label className="btn btn-outline-danger" htmlFor={`${pregunta.id}vbtn-radio4"`}>{pregunta.respuesta4}</label>
                </div>
            </div>
        </div>
    )

}