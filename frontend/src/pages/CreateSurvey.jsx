import React, { useState } from "react";
import { useNavigate } from 'react-router';

function CreateSurvey() {
    const [questions, setQuestions] = useState([{ id: 1, text: "" }]);

    const addQuestion = (event) => {
        event.preventDefault(); // previene que la pagina refresque
        setQuestions([...questions, { id: questions.length + 1, text: "" }]);
    };

    const deleteQuestion = (id) => {
        // Elimina la pregunta y actualizar los IDs para mantener la secuencia
        const updatedQuestions = questions
            .filter((question) => question.id !== id)
            .map((question, index) => ({ ...question, id: index + 1 }));
        setQuestions(updatedQuestions);
    };

    const handleInputChange = (id, value) => {
        setQuestions(
            questions.map((question) =>
                question.id === id ? { ...question, text: value } : question
            )
        );
    };

    const createNewSurvey = (event) => {
        event.preventDefault();
        //si el formulario es invalid
        if (!document.getElementById('createSurveyForm').checkValidity()) {
            alert('Llena todos los campos por favor');
            return;
        }

        let surveyQuestions = [];
        for (let question of questions) {
            surveyQuestions.push({
                id: question.id,
                question: question.text,
                responses: {
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 0
                }
            })
        }

        let allSurveys = localStorage.getItem("surveys");

        // en casa de que no haya una encuesta creada
        if (!allSurveys) {
            localStorage.setItem("surveys", JSON.stringify(
                [{
                    id: Date.now(),
                    title: document.getElementById('title').value,
                    questions: surveyQuestions
                }]
            ))
            return;
        }

        // agregar una encuesta a la lista de encuentas
        allSurveys = JSON.parse(allSurveys)
        allSurveys = [...allSurveys,
        {
            id: Date.now(),
            title: document.getElementById('title').value,
            questions: surveyQuestions
        }
        ]
        localStorage.setItem("surveys", JSON.stringify(allSurveys))

        //logicar para abrir el dialog
        let dialogo = document.getElementById('formDialog');
        dialogo.showModal();

    }
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col items-center justify-center mt-16 bg-gray-50">
                <h1 className="p-2 font-bold">Agrega tus preguntas con el rango de respuesta:</h1>
                <h1 className="font-style: italic">1 (Totalmente en desacuerdo) - 5 (Totalmente de acuerdo)</h1>
            </div>
            <form id="createSurveyForm">
                <section className="flex flex-col items-center my-3 gap-x-2 font-semibold">
                    <label htmlFor="title">Titulo </label>
                    <input
                        className="border border-black border-solid rounded-md"
                        type="text"
                        name="title"
                        id="title"
                        required
                    />
                </section>

                <section id="questionsContainer">
                    {questions.map((question) => (
                        <section key={question.id} className="flex flex-col my-3 gap-x-2 items-center font-medium">
                            <label htmlFor={`question${question.id}`}>
                                Question #{question.id}
                            </label>
                            <input
                                className="border border-black border-solid rounded-md"
                                type="text"
                                name={`question${question.id}`}
                                id={`question${question.id}`}
                                value={question.text}
                                onChange={(e) =>
                                    handleInputChange(question.id, e.target.value)
                                }
                                required
                            />

                            <button type="button" className="cursor-pointer p-1 bg-red-400 text-white rounded-md" onClick={() => deleteQuestion(question.id)}>
                                Eliminar
                            </button>
                        </section>
                    ))}
                </section>

                <div className="flex flex-col items-end">
                    <button className="p-1 bg-blue-300 rounded-md hover:bg-yellow-100" onClick={addQuestion}>
                        Agregar Pregunta
                    </button>
                </div>
                <div className="flex flex-col items-center my-3" >
                    <input
                        className=" cursor-pointer p-1 bg-green-300 rounded-md"
                        type="submit"
                        value="Crear Encuesta"
                        onClick={createNewSurvey}
                    />
                </div>
            </form>
            <dialog id="formDialog" className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-gray-800 text-lg font-medium mb-4">Tu encuesta ha sido creada!</p>
                <div className="space-x-4">
                    <button className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300" onClick={() => navigate('/surveys')}>
                        Ir a Encuestas
                    </button>
                    <button className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300" onClick={() => navigate('/dashboard')}>
                        Ir al Dashboard
                    </button>
                </div>
            </dialog>
        </>
    );
}



export default CreateSurvey;
