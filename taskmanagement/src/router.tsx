import { createBrowserRouter,Navigate } from "react-router-dom";
import AuthLayout from './Layouts/Auth/AuthLayout'

import HomeLayout from "./Layouts/Home/HomeLayout";
import HomePage from "./Pages/Home/HomePage";
import RegisterPage from "./Pages/Auth/Getstarted/RegisterPage";
import LoginPage from "./Pages/Auth/Login/LoginPage";
import Dash from "./Pages/User/Dash";
import UserLayout from "./Layouts/User/UserLayout";


const router = createBrowserRouter([
    {
        path:"/",
        element:<HomeLayout/>,
        children:[
            {
                path:"/",
                element:<HomePage/>

            }
        ]
    },

    //auth
    {
        path:"/auth",
        element:<AuthLayout/>,
        children:[
            {
                path:"/auth",
                element:<Navigate to={"/auth/login"}/>,
            },
            {
                path:"/auth/login",
                element:<LoginPage/>
            },
            {
                path: "/auth/register",
                element: <RegisterPage />,
              },
        ]
    },


    //user
    {
        path:"/user",
        element:<UserLayout/>,
        children:[
            {
                path: "/user/",
                element: <Dash />,
              },
        ]
    }
])


export default router;