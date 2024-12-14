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

    const chartOptions = {
        plugins: {

            legend: {
                display: true, // Enable legend
                position: "bottom", // Position it at the bottom
                options: {
                    scales: {
                        x: {
                            type: 'category', // Ensure this is set to category for categorical data
                            ticks: {
                                autoskip: true,
                                callback: function (question) {
                                    return question; // Custom label formatting
                                }

                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Responses'
                            }
                        }
                    }
                },
                labels: {
                    color: "#333", // Label color
                    font: { size: 12 }, // Font size for legend labels
                    boxWidth: 10
                    
                },
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const value = tooltipItem.raw;
                        const description = ['Muy Malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];
                        return `Rating: ${description[value - 1]} (${value})`;
                    }
                }
            },
        },
        responsive: true, // Make chart responsive
        maintainAspectRatio: false, // Prevent aspect ratio distortion
    };


    // Prepara los datos para la gráfica
    const getChartData = () => {
        if (!selectedSurvey) return null;

        const labels = selectedSurvey.questions.map((q) => q.question);
        const datasets = [
            {
                label: "1",
                data: selectedSurvey.questions.map((q) => q.responses["1"]),
                backgroundColor: "#ff6384",
            },
            {
                label: "2",
                data: selectedSurvey.questions.map((q) => q.responses["2"]),
                backgroundColor: "#36a2eb",
            },
            {
                label: "3",
                data: selectedSurvey.questions.map((q) => q.responses["3"]),
                backgroundColor: "#ffce56",
            },
            {
                label: "4",
                data: selectedSurvey.questions.map((q) => q.responses["4"]),
                backgroundColor: "#4bc0c0",
            },
            {
                label: "5",
                data: selectedSurvey.questions.map((q) => q.responses["5"]),
                backgroundColor: "#9966ff",
            },

        ];


        return { labels, datasets };
    };

    return (
        <div className="dashboard">
            <div className="flex flex-col items-center justify-center border-b border-amber-800">
                <h1 className=" mt-8 text-3xl font-bold">Dashboard de Encuestas</h1>
            </div>

            {/* Lista de encuestas */}
            <section>
                <h2 className="flex flex-col items-center font-serif mt-8">Resultados de Encuestas Respondidas</h2>

                {/*si no hay encuestas registradas*/}
                {surveys.length === 0 ? (
                    <p className="flex flex-col items-center">No hay encuestas registradas.</p>
                ) : (
                    <ul className="flex flex-col items-center">
                        {surveys.map((survey) => (
                            <li key={survey.id}>
                                <button className="my-3 bg-blue-500 text-white p-2 rounded-md" onClick={() => handleSurveySelect(survey.id)}>
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
                    <div className="chart-wrapper" style={{ height: "400px" }}>
                        <Bar data={getChartData()} options={chartOptions} />
                    </div>
                    <button className="bg-gray-500 text-white p-2 rounded-md mt-4 hover:bg-gray-600 transition" onClick={() => setSelectedSurvey(null)}>
                        Ocultar Gráfica
                    </button>
                </section>
            )}
        </div>
    );
}

export default Dashboard;
