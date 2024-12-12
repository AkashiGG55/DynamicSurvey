import { useParams } from "react-router"
import { Link } from "react-router";

function Survey() {
    const surveys = JSON.parse(localStorage.getItem('surveys'));
    const surveyId = useParams().surveyId;
    const currentSurvey = surveys.find((survey) => survey.id == surveyId)
    console.log(currentSurvey)

    const finishSurvey = (event) => {
        event.preventDefault(); // previene que la pagina refresque
        if(!document.getElementById('questionForm').checkValidity()){
            alert('Responde todas las preguntas por favor');
            return;
        }

        // itera sobre todas las preguntas
        currentSurvey.questions.forEach((question, indexQuestion, questionArr) => {
            //obten el valor seleccionado de los radio botones
            const selectedAnswer = document.querySelector(`input[name='question${question.id}']:checked`).value;
            // incremente el valor de esa repuesta para esa pregunta por uno
            questionArr[indexQuestion].responses[selectedAnswer] += 1;
        });

        // obtener el index de esta encuentra en nuesto array de encuentas
        let currentSurveyIndex = surveys.findIndex((survey) => survey.id == surveyId)
        // actualizamos los valores de las repuesta de esta encuesta
        surveys[currentSurveyIndex] = currentSurvey

        // guardamos los valores en surveys
        localStorage.setItem("surveys", JSON.stringify(surveys))
    }
    return (
        <>
        <Link to="/surveys">Ir a pagina de encuentas</Link>
        <h1>{currentSurvey.title}</h1>
            <form id="questionForm">

            {currentSurvey.questions.map(({id, question}) => (
                <div key={id} className="mt-4">
                    <p className="mb-2">{question}</p>
                    <label>
                        <input type="radio" id="1" name={'question'+id} value="1" required/>
                        Totalmente en desacuerdo
                    </label>
                    
                    <label>
                        <input type="radio" id="2" name={'question'+id} value="2" />
                        En Desacuerdo
                    </label>

                    <label>
                    <input type="radio" id="3" name={'question'+id} value="3" />
                    Neutro
                    </label>

                    <label>
                        <input type="radio" id="4" name={'question'+id} value="4" />
                        De acuerdo
                    </label>

                    <label>
                        <input type="radio" id="5" name={'question'+id} value="5" />
                        De acuerdo
                    </label>
                </div>
            ))}
                <input
                className="cursor-pointer p-1 bg-slate-400 rounded-md"
                type="submit"
                value="Completar Encuesta"
                onClick={finishSurvey}
                />
            </form>
            
        </>
    )
  }
  
  export default Survey
  