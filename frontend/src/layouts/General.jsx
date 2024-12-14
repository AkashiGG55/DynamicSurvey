import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import Surveys from "../pages/Surveys";
import CreateSurvey from "../pages/CreateSurvey";
import NotFound from "../pages/NotFound";
import Survey from "../pages/Survey";
import Dashboard from "../components/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <NotFound />
    },
    {
        path: '/surveys',
        element: <Surveys />,
        errorElement: <NotFound />
    },
    {
        path: '/createsurvey',
        element: <CreateSurvey />,
        errorElement: <NotFound />
    },
    {
        path: 'surveys/:surveyId',
        element: <Survey />,
        errorElement: <NotFound />
    },
    
    {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <NotFound />
    }
        
    
])
function GeneralLayout() {
    return(
        <div className="box-border m-0 p-0">
            <NavBar />
            <main className="pt-20 min-h-screen bg-gray-50">
                <RouterProvider router={router} />
                



            </main>
            <Footer />

        </div>
    )
}

export default GeneralLayout