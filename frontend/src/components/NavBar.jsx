function NavBar() {
    return(
        <nav className="flex justify-between mt-2 px-3.5">
            <a href="/">Logo</a>
            
            <section className="flex gap-x-3">
                <a href="/surveys">Mostrar Encuestas</a>

                <a href="/createsurvey">Crear Encuesta</a>
            </section>
        </nav>
    )
}

export default NavBar