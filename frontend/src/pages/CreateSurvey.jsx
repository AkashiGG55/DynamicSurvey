import React, { useState } from "react";

function CreateSurvey() {
    
    // contador de pregruntas
    const [counter, setCounter] = useState(1);


    
    //TODO: agregar button para eliminar la pregunta
    let addQuestion = () => {
        setCounter(counter + 1);
        const questionsContainer = document.getElementById("questionsContainer");
        
        const questionWrapper = document.createElement('section');
        questionWrapper.className = 'flex flex-row my-3 gap-x-2'

        const questionLabel = document.createElement('label');
        questionLabel.htmlFor = `question${counter}`
        questionLabel.innerText = `Question # ${counter + 1}`

        const input = document.createElement('input')
        input.className = "border border-black border-solid rounded-md"
        input.type = "text"
        input.name = `question${counter}`
        input.id = `question${counter}`
        input.required = true

        questionWrapper.append(questionLabel)
        questionWrapper.append(input)
        questionsContainer.append(questionWrapper)
    }
  return (
    <>
        <h1>Agrega tus preguntas con el rango de respuesta: 1 (Totalmente en desacuerdo) - 5 (Totalmente de acuerdo)</h1>
        <form>
            <section className="flex flex-row gap-x-2">
                <label htmlFor="title">Titulo </label>
                <input className="border border-black border-solid rounded-md" type="text" name="title" id="title" required />
            </section>

            <section id="questionsContainer">

                <section className="flex flex-row my-3 gap-x-2">
                    <label htmlFor="question1">Question #1</label>
                    <input className="border border-black border-solid rounded-md" type="text" 
                    name="question1" id="question1" required />
                </section>

            </section>

            <button className="cursor-pointer p-1 bg-slate-200 rounded-md" onClick={addQuestion}>Agregar Pregunta</button>

            <hr className="my-3"></hr>
            <input className="cursor-pointer p-1 bg-slate-400 rounded-md" type="submit" value="Crear Encuesta" />
        </form>
    </>
  )
}

export default CreateSurvey
