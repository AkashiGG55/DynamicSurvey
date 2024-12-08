import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import Surveys from "../pages/Surveys";
import CreateSurvey from "../pages/CreateSurvey";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/surveys',
        element: <Surveys />
    },
    {
        path: '/createsurvey',
        element: <CreateSurvey />

    }
])
function GeneralLayout() {
    return(
        <div className="box-border m-0 p-0">
            <NavBar />
            <main>
                <RouterProvider router={router} />
            </main>
            <Footer />

        </div>
    )
}

export default GeneralLayout