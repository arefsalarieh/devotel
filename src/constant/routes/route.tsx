import Home from "../../pages/home";
import List from "../../pages/list";
import Layout from "../../component/Layout";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "list",
                element: <List />,
            },
        ]
    },
]

export default routes;
