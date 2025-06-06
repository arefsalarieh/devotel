import Home from "../../pages/home";
import List from "../../pages/list";
import Layout from "../../component/Layout";
import Health from "../../pages/health";
import Car from "../../pages/car";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: '/',
                element: <Health />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/car",
                element: <Car />,
            },
            {
                path: "/list",
                element: <List />,
            },
        ]
    },
]

export default routes;
