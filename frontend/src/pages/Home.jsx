function Home() {

    return (
        <section className="flex flex-col items-center justify-center mt-16 bg-gray-50">
            <div className="text-center max-w-2xl p-6">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">¡Bienvenido a Stellar Surveys!</h1>
            <p className="text-gray-600 text-lg">
                Explora, crea y analiza encuestas con facilidad. Ayuda a recopilar opiniones y toma decisiones informadas.
            </p>
            <div className="mt-6 flex gap-4 justify-center">
            <a href="/surveys" className="bg-blue-500 text-white py-2 px-6 rounded-md shadow hover:bg-blue-600 transition">
                Ver Encuestas
            </a>
            <a href="/createsurvey" className="bg-green-500 text-white py-2 px-6 rounded-md shadow hover:bg-green-600 transition">
                Crear Encuesta
            </a>
            </div>
            </div>
        </section>
    )
  }
  
  export default Home
  