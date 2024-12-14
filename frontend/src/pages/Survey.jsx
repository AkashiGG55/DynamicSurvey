import { useParams } from "react-router"
import { Link } from "react-router";
import { useNavigate } from 'react-router';

function Survey() {
    const surveys = JSON.parse(localStorage.getItem('surveys'));
    const surveyId = useParams().surveyId;
    const currentSurvey = surveys.find((survey) => survey.id == surveyId)
    console.log(currentSurvey)

    const finishSurvey = (event) => {
        event.preventDefault(); // previene que la pagina refresque
        if (!document.getElementById('questionForm').checkValidity()) {
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

        let dialogo = document.getElementById('formDialog');
        dialogo.showModal();

    }

    const navigate = useNavigate();

    return (
        <>

            <h1 className="font-bold text-3xl">{currentSurvey.title}</h1>
            <form id="questionForm" className="flex flex-col items-center">

                {currentSurvey.questions.map(({ id, question }) => (
                    <div key={id} className="mt-4 my-3">
                        <p className="mb-2 uppercase font-style: italic">{question}</p>
                        <section className="flex flex-col items-center font border-b border-b-orange-500">
                            <label>
                                <input type="radio" id="1" name={'question' + id} value="1" required />
                                ★
                            </label>

                            <label>
                                <input type="radio" id="2" name={'question' + id} value="2" />
                                ★★
                            </label>

                            <label>
                                <input type="radio" id="3" name={'question' + id} value="3" />
                                ★★★
                            </label>

                            <label>
                                <input type="radio" id="4" name={'question' + id} value="4" />
                                ★★★★
                            </label>

                            <label>
                                <input type="radio" id="5" name={'question' + id} value="5" />
                                ★★★★★
                            </label>
                        </section>
                    </div>
                ))}
                <input
                    className="cursor-pointer p-1 bg-slate-400 rounded-md"
                    type="submit"
                    value="Completar Encuesta"
                    onClick={finishSurvey}
                />
            </form>
            <dialog id="formDialog" className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-gray-800 text-lg font-medium mb-4">Gracias por tu contribución!</p>
                <div className="space-x-4">
                    <button className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300" onClick={() => navigate('/surveys')}>
                        Volver a Encuestas
                    </button>
                    <button className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300" onClick={() => navigate('/dashboard')}>
                        Ir al Dashboard
                    </button>
                </div>
            </dialog>
        </>
    )
}

export default Survey
