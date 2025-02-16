

import { useQuestions } from "../providers/QuestionsProvider";
import Pregunta from "./Pregunta";

export default function PreguntasCreadas({ preguntas }) {



    const { addQuestion, questions } = useQuestions();

    console.log(questions)

    return (
        <div className="card border" style={{ width: "18rem" }}  >

            {
                questions.map(pregunta =>
                    <Pregunta key={pregunta.id} pregunta={pregunta}></Pregunta>)
            }
        </div>
    )
}