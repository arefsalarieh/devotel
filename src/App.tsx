import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './constant/routes/route';
import AppProvider from './component/AppProvider';

const router = createBrowserRouter(routes);

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
