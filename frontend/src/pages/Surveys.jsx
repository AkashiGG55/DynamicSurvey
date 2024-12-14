import React, { useState } from "react";
import { Link } from "react-router-dom"; // "react-router-dom"

function Surveys() {
  const [surveys, setSurveys] = useState(JSON.parse(localStorage.getItem("surveys")) || []);

  // Manejar la eliminación de una encuesta
  const handleSurveyDelete = (id) => {
    //metodo para confirmar en caso de error
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar esta encuesta?");
    if (!isConfirmed) return; // Do nothing if the user cancels

    const updatedSurveys = surveys.filter((survey) => survey.id !== id); // Filtra las encuestas que no tienen el ID especificado
    setSurveys(updatedSurveys); // Actualiza el estado con las encuestas restantes
    localStorage.setItem("surveys", JSON.stringify(updatedSurveys)); // Guarda el cambio en localStorage
  };

  return (
    <>
      {!surveys.length && <span>No se ha creado ninguna encuesta todavía</span>} {/* Mensaje si no hay encuestas */}
      <h1 className="flex flex-col items-center font-bold text-3xl bg-blue-100 border-b-2 rounded-md">Encuestas:</h1>
      <section id="surveysContainer" className=" flex flex-col my-3 items-center">
        {surveys.map((survey) => (
          <section key={survey.id} className=" flex flex-row my-3">
            <h2 className="p-3 border-b rounded-md bg-yellow-50">{survey.title}</h2>
            <Link to={`/surveys/${survey.id}`} className="cursor-pointer p-3 bg-green-200 rounded-md">
              Responder encuesta
            </Link>
            <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => handleSurveyDelete(survey.id)}> 
              Eliminar
            </button> 
          </section>
        ))}
      </section>
    </>
  );
}

export default Surveys;
