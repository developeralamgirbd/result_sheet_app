import {createBrowserRouter} from "react-router-dom";
import MasterLayout from "../components/MasterLayout";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MasterLayout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/create',
                element: <CreatePage/>
            }
        ]
    }
]);

export default router;