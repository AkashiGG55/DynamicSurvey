function NavBar() {
    return(
        <nav className="flex justify-between mt-2 px-3.5">
            <a href="/">
            <img class="h-10 w-10 rounded-full" src="logo.png" alt="logo" />
            </a>
            
            <section className="flex gap-x-3">
                <a href="/surveys">Mostrar Encuestas</a>

                <a href="/createsurvey">Crear Encuesta</a>

                <a href="/Dashboard">Dashboard</a>
            </section>
        </nav>
    )
}

export default NavBar