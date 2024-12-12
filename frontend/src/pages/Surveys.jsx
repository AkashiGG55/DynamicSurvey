import React, { useState } from "react";
import { Link } from "react-router-dom"; // Cambié de "react-router" a "react-router-dom"

function Surveys() {
  const [surveys, setSurveys] = useState(JSON.parse(localStorage.getItem("surveys")) || []);

  // Manejar la eliminación de una encuesta
  const handleSurveyDelete = (id) => {
    const updatedSurveys = surveys.filter((survey) => survey.id !== id); // Filtra las encuestas que no tienen el ID especificado
    setSurveys(updatedSurveys); // Actualiza el estado con las encuestas restantes
    localStorage.setItem("surveys", JSON.stringify(updatedSurveys)); // Guarda el cambio en localStorage
  };

  return (
    <>
      {!surveys.length && <span>No se ha creado ninguna encuesta todavía</span>} {/* Mensaje si no hay encuestas */}
      <h1>Encuestas:</h1>
      <section id="surveysContainer">
        {surveys.map((survey) => (
          <section key={survey.id}>
            <h2>{survey.title}</h2>
            <Link to={`/surveys/${survey.id}`} className="cursor-pointer p-1 bg-slate-200 rounded-md">
              Responder encuesta
            </Link>
            <button
              className="bg-red-500 text-white p-2 rounded-md"
              onClick={() => handleSurveyDelete(survey.id)} // Llama a la función de eliminación
            >
              Eliminar
            </button>
          </section>
        ))}
      </section>
    </>
  );
}

export default Surveys;
