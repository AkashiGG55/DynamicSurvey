import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale);

function Dashboard() {
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  // Obtener todas las encuestas del localStorage
  const surveys = JSON.parse(localStorage.getItem("surveys")) || [];

  // Maneja el evento de selección de encuesta
  const handleSurveySelect = (id) => {
    const survey = surveys.find((survey) => survey.id === id);
    setSelectedSurvey(survey);
  };

  // Prepara los datos para la gráfica
  const getChartData = () => {
    if (!selectedSurvey) return null;

    const labels = selectedSurvey.questions.map((q) => `Pregunta ${q.id}`);
    const datasets = [
      {
        label: "Totalmente en desacuerdo",
        data: selectedSurvey.questions.map((q) => q.responses["1"]),
        backgroundColor: "#ff6384",
      },
      {
        label: "En desacuerdo",
        data: selectedSurvey.questions.map((q) => q.responses["2"]),
        backgroundColor: "#36a2eb",
      },
      {
        label: "Neutro",
        data: selectedSurvey.questions.map((q) => q.responses["3"]),
        backgroundColor: "#ffce56",
      },
      {
        label: "De acuerdo",
        data: selectedSurvey.questions.map((q) => q.responses["4"]),
        backgroundColor: "#4bc0c0",
      },
      {
        label: "Totalmente de acuerdo",
        data: selectedSurvey.questions.map((q) => q.responses["5"]),
        backgroundColor: "#9966ff",
      },
    ];

    return { labels, datasets };
  };

  return (
    <div className="dashboard">
      <h1>Dashboard de Encuestas</h1>

      {/* Lista de encuestas */}
      <section>
        <h2>Encuestas Respondidas</h2>
        
        {/*si no hay encuestas registradas*/}
        {surveys.length === 0 ? (
          <p>No hay encuestas registradas.</p>
        ) : (
          <ul>
            {surveys.map((survey) => (
              <li key={survey.id}>
                <button
                  className="bg-blue-500 text-white p-2 rounded-md"
                  onClick={() => handleSurveySelect(survey.id)}
                >
                  {survey.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Gráfica de resultados */}
      {selectedSurvey && (
        <section>
          <h2>Resultados de la Encuesta: {selectedSurvey.title}</h2>
          <Bar data={getChartData()} />
        </section>
      )}
    </div>
  );
}

export default Dashboard;
