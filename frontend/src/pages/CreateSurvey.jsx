import React, { useState } from "react";

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
    if(!document.getElementById('createSurveyForm').checkValidity()){
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
    if(!allSurveys){
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
  }

  return (
    <>
      <h1>
        Agrega tus preguntas con el rango de respuesta: 1 (Totalmente en
        desacuerdo) - 5 (Totalmente de acuerdo)
      </h1>
      <form id="createSurveyForm">
        <section className="flex flex-row gap-x-2">
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
            <section
              key={question.id}
              className="flex flex-row my-3 gap-x-2 items-center"
            >
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
              <button
                type="button"
                className="cursor-pointer p-1 bg-red-400 text-white rounded-md"
                onClick={() => deleteQuestion(question.id)}
              >
                Eliminar
              </button>
            </section>
          ))}
        </section>

        <button
          className="cursor-pointer p-1 bg-slate-200 rounded-md"
          onClick={addQuestion}
        >
          Agregar Pregunta
        </button>

        <hr className="my-3" />
        <input
          className="cursor-pointer p-1 bg-slate-400 rounded-md"
          type="submit"
          value="Crear Encuesta"
          onClick={createNewSurvey}
        />
      </form>
    </>
  );
}

export default CreateSurvey;
